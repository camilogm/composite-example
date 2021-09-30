import { GatekeeperConfig } from '@Gatekeeper/config';
import {
  LISTENER_CONTAINER,
  SUSCRIBE_GATEKEEPER_EVENTS,
} from '@Gatekeeper/constants';
import {
  IEventSuscribed,
  IGatakeeperSuscribeOptions,
} from '@Gatekeeper/interfaces';
import { GatekeeperListener } from '@Gatekeeper/providers';
import { WebhookController } from '@Gatekeeper/webhook.controller';
import { DiscoveryModule, DiscoveryService } from '@golevelup/nestjs-discovery';
import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forFeature(GatekeeperConfig), DiscoveryModule],
  providers: [
    GatekeeperListener,
    {
      provide: LISTENER_CONTAINER,
      useValue: new Map(),
    },
  ],
  controllers: [WebhookController],
})
export class GatekeeperModule implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    @Inject(LISTENER_CONTAINER)
    private readonly listenerContainer: Map<string, IEventSuscribed>,
  ) {}

  async onModuleInit() {
    const providers =
      await this.discoveryService.providerMethodsWithMetaAtKey<IGatakeeperSuscribeOptions>(
        SUSCRIBE_GATEKEEPER_EVENTS,
      );

    providers.forEach((provider) => {
      const {
        meta,
        discoveredMethod: {
          handler,
          parentClass: { instance: executionContext },
        },
      } = provider;

      this.listenerContainer.set(meta.event, {
        meta,
        handler: handler.bind(executionContext),
      });
    });
  }
}
