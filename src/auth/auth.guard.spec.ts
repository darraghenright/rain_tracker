import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

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

  it('should pass if `x-userId` header is present', () => {
    const executionContext = createExecutionContext({
      'x-userId': 'abc123',
    });

    expect(authGuard.canActivate(executionContext)).toBe(true);
  });

  it('should raise an `UnauthorizedException` if `x-userId` header is missing', () => {
    const executionContext = createExecutionContext({});

    expect(() => authGuard.canActivate(executionContext)).toThrow(
      UnauthorizedException,
    );
  });

  it('should raise an `UnauthorizedException` if `x-userId` header is an empty string', () => {
    const executionContext = createExecutionContext({
      'x-userId': '',
    });

    expect(() => authGuard.canActivate(executionContext)).toThrow(
      UnauthorizedException,
    );
  });
});
