import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, AUTH_HEADER } from './auth.guard';

function createExecutionContext(headers?: Record<string, string>) {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ headers }),
    }),
  } as ExecutionContext;
}

describe('AuthGuard', () => {
  let authGuard: AuthGuard;

  beforeEach(() => {
    authGuard = new AuthGuard();
  });

  it('should pass if `AUTH_HEADER` is present', () => {
    const executionContext = createExecutionContext({
      [AUTH_HEADER]: 'abc123',
    });

    expect(authGuard.canActivate(executionContext)).toBe(true);
  });

  it('should raise an `UnauthorizedException` if `AUTH_HEADER` is missing', () => {
    const executionContext = createExecutionContext({});

    expect(() => authGuard.canActivate(executionContext)).toThrow(
      UnauthorizedException,
    );
  });

  it('should raise an `UnauthorizedException` if `AUTH_HEADER` is an empty string', () => {
    const executionContext = createExecutionContext({
      [AUTH_HEADER]: '',
    });

    expect(() => authGuard.canActivate(executionContext)).toThrow(
      UnauthorizedException,
    );
  });
});
