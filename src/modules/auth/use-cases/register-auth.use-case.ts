import { UserEntity } from '@/modules/user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateAuthDto } from '../dto/create-auth.dto';

@Injectable()
export class RegisterAuthUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async execute(registerDto: CreateAuthDto): Promise<UserEntity> {
    const passwordHash = await hash(registerDto.password, 10);
    const emailExists = await this.userRepository.findOne({
      where: {
        email: registerDto.email,
      },
    });

    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    const user = this.userRepository.create({
      ...registerDto,
      password: passwordHash,
    });

    return this.userRepository.save(user);
  }
}
