import { JwtStrategy } from '@core/strategy';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(private jwtStrategy: JwtStrategy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    if (req.connectionParams?.headers) {
      req.headers = req.connectionParams.headers;
    }

    const validationResult = this.jwtStrategy.validate(req);

    if (validationResult === undefined) {
      return false;
    }

    return true;
  }

  getRequest(context: ExecutionContext) {}
}
