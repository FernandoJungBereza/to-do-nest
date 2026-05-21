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

	@ApiProperty({ example: 'user.create' })
	suggestedSlug: string;

	@ApiProperty({ description: 'Whether the slug is already registered in permissions_slugs' })
	registered: boolean;
}

export class OutputAvailableSlugsDto {
	@ApiProperty({ type: [OutputAvailableSlugRouteDto] })
	routes: OutputAvailableSlugRouteDto[];
}
