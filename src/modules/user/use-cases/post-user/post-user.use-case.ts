import { UserEntity } from '@/modules/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { ThrowIfExistUserUseCase } from '../throw-if-exist-user.use-case';
import { PostUserDto } from '../../dtos/post-user.dto';

@Injectable()
export class PostUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly throwIfExistUserUseCase: ThrowIfExistUserUseCase,
  ) {}

  async execute(postUserDto: PostUserDto): Promise<void> {
    const passwordHash = await hash(postUserDto.password, 10);

    await this.throwIfExistUserUseCase.execute({
      where: {
        email: postUserDto.email,
      },
    });

    const user = this.userRepository.create({
      ...postUserDto,
      password: passwordHash,
    });

    await this.userRepository.save(user);
  }
}
