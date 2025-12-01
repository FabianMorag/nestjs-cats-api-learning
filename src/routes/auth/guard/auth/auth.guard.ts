import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { jwtConstants } from '../../contants'

interface RequestWithUser extends Request {
  user: {
    sub: number
    email: string
    name: string
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>()
    const token = this.extractTokenFromHeader(request)

    if (!token) throw new UnauthorizedException()

    try {
      const payload = this.jwtService.verify<RequestWithUser['user']>(token, {
        secret: jwtConstants.secret,
      })
      request.user = payload
    } catch {
      throw new UnauthorizedException()
    }

    return true
  }
}
