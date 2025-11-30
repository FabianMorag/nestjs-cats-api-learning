import { ConflictException, Injectable } from '@nestjs/common'
import { UserAuthDto } from './dto/user-auth.dto'
import { DbService } from 'src/lib/db'
import { hash, compare } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private db: DbService) {}

  async signUp(userData: UserAuthDto) {
    const user = await this.db.user.findFirst({
      where: { email: userData.email },
    })
    if (user) throw new ConflictException('User with this email already exists')

    const password = await hash(userData.password, 10)

    return this.db.user.create({
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
  }

  async signIn(email: string, password: string) {
    const user = await this.db.user.findFirst({
      where: { email },
    })
    if (!user) throw new ConflictException('Invalid credentials')

    const isInvalid = await compare(password, user.password)
    if (!isInvalid) throw new ConflictException('Invalid credentials')

    return { id: user.id, name: user.name, email: user.email }
  }
}
