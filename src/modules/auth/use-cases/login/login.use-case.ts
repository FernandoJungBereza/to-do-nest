import { UserEntity } from '@/modules/user/entities/user.entity';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginDto } from '../../dtos/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(loginDto: LoginDto): Promise<{
    user: Pick<UserEntity, 'id' | 'name' | 'email'>;
    access_token: string;
    refresh_token: string;
  }> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comparePassword = await compare(loginDto.password, user.password);

    if (!comparePassword) {
      throw new UnauthorizedException('Password is incorrect');
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      access_token: this.jwtService.sign({ userId: user.id }),
      refresh_token: this.jwtService.sign(
        { userId: user.id },
        { expiresIn: '7d' },
      ),
    };
  }
}
