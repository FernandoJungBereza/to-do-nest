import { RouteManifestService } from '@/modules/permissions/authorization/route-manifest.service';
import { ADMIN_SLUG } from '@/modules/permissions/constants/permission.constants';
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AuthenticatedRequest } from '../interfaces/authenticated-request.interface';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { PermissionsAuthorizationService } from '@/modules/permissions/authorization/permissions-authorization.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly routeManifestService: RouteManifestService,
		private readonly permissionsAuthorizationService: PermissionsAuthorizationService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) {
			return true;
		}

		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
		const routeKey = this.buildRouteKey(request);

		if (!routeKey) {
			throw new ForbiddenException('Route not registered for permissions');
		}

		const userId = request.user?.userId;

		if (!userId) {
			return false;
		}

		const userSlugs = await this.permissionsAuthorizationService.getSlugsByUserId(userId);

		if (userSlugs.includes(ADMIN_SLUG)) {
			return true;
		}

		const requiredSlug = this.routeManifestService.getRequiredSlug(routeKey);

		if (!requiredSlug) {
			throw new ForbiddenException('Route not registered for permissions');
		}

		if (!userSlugs.includes(requiredSlug)) {
			throw new ForbiddenException('Insufficient permissions');
		}

		return true;
	}

	private buildRouteKey(request: AuthenticatedRequest): string | null {
		const path = request.route?.path;

		if (!path) {
			return null;
		}

		return `${request.method}:${path}`;
	}
}
