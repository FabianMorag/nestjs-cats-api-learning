import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class UserAuthDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  readonly password: string
}
