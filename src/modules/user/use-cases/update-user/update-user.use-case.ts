import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../../dtos/update-user.dto';
import { UserEntity } from '../../entities/user.entity';
import { GetExistingUserUseCase } from '../get-existing-user.use-case';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly getExistingUserUseCase: GetExistingUserUseCase,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.getExistingUserUseCase.execute({
      where: { id: id },
    });

    const comparePassword = await compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!comparePassword) {
      throw new UnauthorizedException('Osld password is incorrect');
    }

    if (updateUserDto.password !== updateUserDto.confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }

    const hashedPassword = await hash(updateUserDto.password, 10);
    updateUserDto.password = hashedPassword;

    await this.userRepository.update(user.id, updateUserDto);
  }
}
