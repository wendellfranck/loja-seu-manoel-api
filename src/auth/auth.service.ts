import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  sub: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string) {
    const payload = { sub: username };
    console.log('Gerando token para:', username);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validateUser(payload: JwtPayload) {
    console.log('Validando payload JWT:', payload);
    return { userId: payload.sub };
  }
}
