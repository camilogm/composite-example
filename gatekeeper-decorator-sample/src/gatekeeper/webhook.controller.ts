import { GatekeeperGuard } from '@Gatekeeper/guards/gatekeeper.guard';
import { GatekeeperListener } from '@Gatekeeper/providers';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@Controller('/webhooks')
export class WebhookController {
  constructor(private readonly gatekeeperListener: GatekeeperListener) {}

  @Post()
  @UseGuards(GatekeeperGuard)
  async incomingWebhook(@Body() body: any) {
    return await this.gatekeeperListener.redirectWebhook(body);
  }
}
