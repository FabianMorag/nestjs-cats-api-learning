import { PickType } from '@nestjs/mapped-types'
import { UserAuthDto } from './user-auth.dto'

export class LoginAuthDto extends PickType(UserAuthDto, [
  'email',
  'password',
]) {}
