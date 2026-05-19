import { UserEntity } from '@/modules/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { ThrowIfExistUserUseCase } from './throw-if-exist-user.use-case';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly throwIfExistUserUseCase: ThrowIfExistUserUseCase,
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<void> {
    const passwordHash = await hash(registerUserDto.password, 10);

    await this.throwIfExistUserUseCase.execute({
      where: {
        email: registerUserDto.email,
      },
    });

    const user = this.userRepository.create({
      ...registerUserDto,
      password: passwordHash,
    });

    await this.userRepository.save(user);
  }
}
