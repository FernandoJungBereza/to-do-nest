import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OutputAvailableSlugsDto } from '../../dtos/output-available-slug-route.dto';
import { GetAvailableSlugsUseCase } from './get-available-slugs.use-case';

@ApiTags('Permissions')
@Controller('permissions')
export class GetAvailableSlugsController {
	constructor(private readonly getAvailableSlugsUseCase: GetAvailableSlugsUseCase) {}

	@Get('available-slugs')
	@ApiOperation({ summary: 'List discovered routes with slug, title and description for UI' })
	@ApiResponse({ status: 200, description: 'Routes found', type: OutputAvailableSlugsDto })
	async getAvailableSlugs() {
		return await this.getAvailableSlugsUseCase.execute();
	}
}
