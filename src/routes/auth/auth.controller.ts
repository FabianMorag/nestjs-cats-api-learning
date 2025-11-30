import { Controller, Post, Body, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserAuthDto } from './dto/user-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'
import { type Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() userData: UserAuthDto, @Res() res: Response) {
    return this.authService.signUp(userData, res)
  }

  @Post('signin')
  signIn(@Body() body: LoginAuthDto, @Res() res: Response) {
    return this.authService.signIn(body.email, body.password, res)
  }
}
