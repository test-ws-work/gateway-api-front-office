import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const IsLogist = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    const logist = context.switchToHttp().getRequest().logist;

    return logist;
  },
);
