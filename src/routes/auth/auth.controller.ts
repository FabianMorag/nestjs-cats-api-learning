import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserAuthDto } from './dto/user-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() userData: UserAuthDto) {
    return this.authService.signUp(userData)
  }

  @Post('signin')
  signIn(@Body() body: LoginAuthDto) {
    return this.authService.signIn(body.email, body.password)
  }
}
