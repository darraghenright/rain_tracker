import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export const AUTH_HEADER = 'x-userid';

type AuthGuardResult = boolean | Promise<boolean> | Observable<boolean>;

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): AuthGuardResult {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers[AUTH_HEADER];

    if (!userId) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
