import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'usuario1' })
  @IsString()
  @IsNotEmpty()
  username!: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login e geração de token JWT' })
  @ApiResponse({
    status: 201,
    description: 'Token JWT gerado',
  })
  login(@Body() body: LoginDto) {
    return this.authService.login(body.username);
  }
}
