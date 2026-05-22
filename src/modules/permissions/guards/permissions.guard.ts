import { IS_PUBLIC_KEY } from '@/modules/auth/decorator/public.decorator';
import type { AuthenticatedRequest } from '@/modules/auth/interfaces/authenticated-request.interface';
import { Permission } from '@/modules/permissions/constants/permission.enum';
import { REQUIRE_PERMISSION_KEY } from '@/modules/permissions/decorators/require-permission.decorator';
import { PermissionsAuthorizationService } from '@/modules/permissions/authorization/permissions-authorization.service';
import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
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

		const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(REQUIRE_PERMISSION_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (!requiredPermissions?.length) {
			return true;
		}

		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
		const userId = request.user?.userId;

		if (!userId) {
			return false;
		}

		const userPermissionNames = await this.permissionsAuthorizationService.getPermissionNamesByUserId(userId);

		if (userPermissionNames.includes(Permission.Admin)) {
			return true;
		}

		const hasPermission = requiredPermissions.some((permission) => userPermissionNames.includes(permission));

		if (!hasPermission) {
			throw new ForbiddenException('Insufficient permissions');
		}

		return true;
	}
}
