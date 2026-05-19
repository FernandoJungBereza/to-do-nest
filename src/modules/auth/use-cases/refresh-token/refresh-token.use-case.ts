import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute(refreshToken: string): Promise<string> {
    const decoded = this.jwtService.verify(refreshToken);

    if (!decoded) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.jwtService.sign(
      { userId: decoded.userId },
      { expiresIn: '1d' },
    );
  }
}
