import { GatekeeperConfig } from '@Gatekeeper/config';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { createHmac } from 'crypto';
import { Request } from 'express';

@Injectable()
export class GatekeeperGuard implements CanActivate {
  constructor(
    @Inject(GatekeeperConfig.KEY)
    private readonly gatekeeperConfig: ConfigType<typeof GatekeeperConfig>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  getSignature(clientSecret: string, data: object): string {
    return createHmac('sha256', clientSecret)
      .update(Buffer.from(JSON.stringify(data), 'utf-8'))
      .digest('base64');
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest<Request>();
    const { headers, body } = request;

    const signature = this.getSignature(
      this.gatekeeperConfig.clientSecret,
      body,
    );

    return signature === headers['x-gatekeeper-signature'];
  }
}
