import { ApiProperty } from '@nestjs/swagger';

export class OutputAvailableSlugRouteDto {
	@ApiProperty({ example: 'POST' })
	method: string;

	@ApiProperty({ example: 'user' })
	module: string;

	@ApiProperty({ example: 'user.create', description: 'Canonical permission slug for this route' })
	slug: string;

	@ApiProperty({ example: 'Create user', description: 'Human-readable label for UI selects' })
	title: string;

	@ApiProperty({
		example: 'Permission to create user (user.create)',
		description: 'Auto-generated description from the slug',
	})
	description: string;
}

export class OutputAvailableSlugsDto {
	@ApiProperty({ type: [OutputAvailableSlugRouteDto] })
	routes: OutputAvailableSlugRouteDto[];
}
