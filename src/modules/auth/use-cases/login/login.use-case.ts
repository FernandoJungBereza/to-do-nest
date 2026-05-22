import { EnvService } from '@/config/env';
import { UserRepositoryAbstract } from '@/modules/user/repositories/user.repository.abstract';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { LoginDto } from '../../dtos/login.dto';

@Injectable()
export class LoginUseCase {
	constructor(
		private readonly userRepository: UserRepositoryAbstract,
		private readonly jwtService: JwtService,
		private readonly env: EnvService,
	) {}

	async execute(loginDto: LoginDto): Promise<{
		user: { id: string; name: string; email: string };
		access_token: string;
		refresh_token: string;
	}> {
		const user = await this.userRepository.findOne({
			where: { email: loginDto.email },
		});

		if (!user) {
			throw new UnauthorizedException('Invalid credentials');
		}

		const comparePassword = await compare(loginDto.password, user.password);

		if (!comparePassword) {
			throw new UnauthorizedException('Invalid credentials');
		}

		return {
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
			access_token: this.jwtService.sign({ userId: user.id }, { expiresIn: '1h' }),
			refresh_token: this.jwtService.sign(
				{ userId: user.id },
				{
					secret: this.env.jwtRefresh,
					expiresIn: '7d',
				},
			),
		};
	}
}
