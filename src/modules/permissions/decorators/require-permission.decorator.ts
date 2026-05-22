import { Permission } from '@/modules/permissions/constants/permission.enum';
import { SetMetadata } from '@nestjs/common';

export const REQUIRE_PERMISSION_KEY = 'requirePermission';

export const RequirePermission = (...permissions: Permission[]) =>
	SetMetadata(REQUIRE_PERMISSION_KEY, permissions);
