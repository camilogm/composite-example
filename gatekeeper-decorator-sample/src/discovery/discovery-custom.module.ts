import { GatekeeperModule } from '@Gatekeeper/gatekeeper.module';
import { GatekeeperListener } from '@Gatekeeper/providers';
import { Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Module({ imports: [DiscoveryModule] })
export class DiscoveryCustomModule implements OnModuleInit {
  constructor(private readonly discoveryService: DiscoveryService) {}

  async exploreMetadata() {
    const providers = this.discoveryService.getProviders();
    const module = providers?.find(
      (provider) => provider.name === GatekeeperModule.name,
    );

    const moduleProviders = (module as any).host._providers as Map<
      string,
      InstanceWrapper
    >;
    const gatekeeperListener = moduleProviders.get(GatekeeperListener.name);

    console.log('------------ Discovery custom service example --------------');
    console.log(gatekeeperListener);
    console.log(gatekeeperListener.getCtorMetadata());
    // https://github.com/golevelup/nestjs/blob/master/packages/discovery/src/discovery.service.ts
  }

  async onModuleInit() {
    // this.exploreMetadata();
  }
}
