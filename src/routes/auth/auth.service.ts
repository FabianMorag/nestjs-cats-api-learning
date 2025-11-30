import { ConflictException, HttpStatus, Injectable, Res } from '@nestjs/common'
import { UserAuthDto } from './dto/user-auth.dto'
import { DbService } from 'src/lib/db'
import { compareSync, hashSync } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { type Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private db: DbService,
    private jwtService: JwtService,
  ) {}

  async signUp(userData: UserAuthDto, @Res() res: Response) {
    const user = await this.db.user.findFirst({
      where: { email: userData.email },
    })
    if (user) throw new ConflictException('User with this email already exists')

    const password = hashSync(userData.password, 10)

    const newUser = await this.db.user.create({
      data: {
        ...userData,
        password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    const accessToken = this.jwtService.sign(newUser)

    return res
      .status(HttpStatus.CREATED)
      .json({ ...newUser, access_token: accessToken })
  }

  async signIn(email: string, password: string, @Res() res: Response) {
    const user = await this.db.user.findFirst({
      where: { email },
    })
    if (!user) throw new ConflictException('Invalid credentials')

    const isInvalid = compareSync(password, user.password)
    if (!isInvalid) throw new ConflictException('Invalid credentials')

    const payload = { id: user.id, name: user.name, email: user.email }
    const accessToken = this.jwtService.sign(payload)

    return res
      .status(HttpStatus.OK)
      .json({ ...payload, access_token: accessToken })
  }
}
