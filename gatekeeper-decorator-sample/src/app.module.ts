import { DiscoveryCustomModule } from '@Discovery/discovery-custom.module';
import { GatekeeperModule } from '@Gatekeeper/gatekeeper.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GatekeeperModule, DiscoveryCustomModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
