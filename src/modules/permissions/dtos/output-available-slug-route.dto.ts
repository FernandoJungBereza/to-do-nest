import { ApiProperty } from '@nestjs/swagger';

export class OutputAvailableSlugRouteDto {
	@ApiProperty({ example: 'POST:/users' })
	routeKey: string;

	@ApiProperty({ example: 'POST' })
	method: string;

	@ApiProperty({ example: '/users' })
	path: string;

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

	@ApiProperty({ description: 'Whether the slug is already registered in permissions_slugs' })
	registered: boolean;
}

export class OutputAvailableSlugsDto {
	@ApiProperty({ type: [OutputAvailableSlugRouteDto] })
	routes: OutputAvailableSlugRouteDto[];
}
