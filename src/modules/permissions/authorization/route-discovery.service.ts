import { Injectable, Logger } from '@nestjs/common';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { PERMISSION_ROUTE_SKIP_MODULES } from '../constants/permission.constants';
import { DiscoveredRouteAuthorization } from '../interfaces/discovered-route-authorization.interface';

const HTTP_METHODS = ['Get', 'Post', 'Patch', 'Put', 'Delete'] as const;
const CONTROLLER_FILE_SUFFIXES = ['.controller.ts', '.controller.js'] as const;

@Injectable()
export class RouteDiscoveryService {
	private readonly logger = new Logger(RouteDiscoveryService.name);
	private readonly modulesRoot = RouteDiscoveryService.resolveModulesRoot();

	discover(): DiscoveredRouteAuthorization[] {
		const controllerFiles = this.collectControllerFiles(this.modulesRoot);
		const unique = new Map<string, DiscoveredRouteAuthorization>();

		for (const filePath of controllerFiles) {
			const routes = this.parseControllerFile(filePath);

			for (const route of routes) {
				unique.set(route.routeKey, route);
			}
		}

		const discovered = [...unique.values()].sort((a, b) => a.routeKey.localeCompare(b.routeKey));
		const modules = [...new Set(discovered.map((route) => route.module))].sort();
		this.logger.log(
			`Discovered ${discovered.length} route(s) from ${modules.length} module(s): ${modules.join(', ') || 'none'}`,
		);

		return discovered;
	}

	private static resolveModulesRoot(): string {
		const candidates = [
			join(process.cwd(), 'src', 'modules'),
			join(process.cwd(), 'dist', 'modules'),
		];

		for (const root of candidates) {
			if (existsSync(root)) {
				return root;
			}
		}

		throw new Error('Modules directory not found. Expected src/modules or dist/modules.');
	}

	private collectControllerFiles(directory: string): string[] {
		const files: string[] = [];

		for (const entry of readdirSync(directory, { withFileTypes: true })) {
			const fullPath = join(directory, entry.name);

			if (entry.isDirectory()) {
				files.push(...this.collectControllerFiles(fullPath));
				continue;
			}

			if (
				entry.isFile() &&
				CONTROLLER_FILE_SUFFIXES.some((suffix) => entry.name.endsWith(suffix))
			) {
				files.push(fullPath);
			}
		}

		return files;
	}

	private parseControllerFile(filePath: string): DiscoveredRouteAuthorization[] {
		const module = this.extractModuleFromPath(filePath);

		if (!module) {
			throw new Error(
				`Controller "${filePath}" is outside src/modules/<module>/. Move it under a module folder.`,
			);
		}

		if ((PERMISSION_ROUTE_SKIP_MODULES as readonly string[]).includes(module)) {
			return [];
		}

		const content = readFileSync(filePath, 'utf8');
		const controllerMatch = content.match(/@Controller\(\s*['"`]([^'"`]*?)['"`]\s*\)/);

		if (!controllerMatch) {
			throw new Error(`@Controller() not found in ${filePath}`);
		}

		const controllerPath = controllerMatch[1].trim();
		const routes: DiscoveredRouteAuthorization[] = [];

		for (const method of HTTP_METHODS) {
			const regex = new RegExp(`@${method}\\(\\s*(?:['"\`]([^'"\`]*?)['"\`])?\\s*\\)`, 'g');
			let match: RegExpExecArray | null;

			while ((match = regex.exec(content)) !== null) {
				const path = this.joinRoutePath(controllerPath, match[1]);
				const httpMethod = method.toUpperCase();
				const action = this.resolveAction(httpMethod, path);

				routes.push({
					routeKey: `${httpMethod}:${path}`,
					method: httpMethod,
					path,
					module,
					slug: `${module}.${action}`,
				});
			}
		}

		return routes;
	}

	private extractModuleFromPath(filePath: string): string | null {
		const normalized = filePath.replace(/\\/g, '/');
		const match = normalized.match(/\/modules\/([^/]+)\//);

		return match?.[1] ?? null;
	}

	private joinRoutePath(controllerPath: string, handlerPath?: string): string {
		const base = controllerPath.replace(/^\/+|\/+$/g, '');
		const suffix = handlerPath?.replace(/^\/+|\/+$/g, '') ?? '';

		if (!base) {
			return suffix ? `/${suffix}` : '/';
		}

		if (!suffix) {
			return `/${base}`;
		}

		return `/${base}/${suffix}`;
	}

	private resolveAction(method: string, path: string): string {
		if (method === 'POST') {
			return 'create';
		}

		if (method === 'GET') {
			return path.includes('paginated') ? 'list' : 'read';
		}

		if (method === 'PATCH' || method === 'PUT') {
			return 'update';
		}

		if (method === 'DELETE') {
			return 'delete';
		}

		throw new Error(`Unsupported HTTP method "${method}" for path ${path}`);
	}
}
