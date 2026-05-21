import { Controller, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '@/modules/auth/interfaces/authenticated-request.interface';
import { RouteManifestRebuildResult } from '../../interfaces/route-manifest-rebuild-result.interface';
import { ReloadRouteManifestUseCase } from './reload-route-manifest.use-case';

@ApiTags('Permissions')
@Controller('permissions')
export class ReloadRouteManifestController {
	constructor(private readonly reloadRouteManifestUseCase: ReloadRouteManifestUseCase) {}

	@Post('reload')
	@ApiOperation({ summary: 'Rebuild route manifest (admin only)' })
	@ApiResponse({ status: 200, description: 'Manifest rebuilt' })
	@ApiResponse({ status: 403, description: 'Forbidden' })
	async reloadRouteManifest(@Req() request: AuthenticatedRequest): Promise<RouteManifestRebuildResult> {
		const userId = request.user.userId;

		return await this.reloadRouteManifestUseCase.execute(userId);
	}
}
