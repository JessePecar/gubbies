import { AuthClientService } from '@core/repository';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    // unsure if user will exist, it might be saved under claims instead
    const user = request.user?.claims ?? request.claims;
    return user;
  },
);