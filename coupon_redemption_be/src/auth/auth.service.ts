import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(username: string, password: string) {
    if (username !== 'admin' || password !== 'root') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: username,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      accessToken: accessToken,
    };
  }
}
