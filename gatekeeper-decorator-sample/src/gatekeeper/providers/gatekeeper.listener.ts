import { LISTENER_CONTAINER } from '@Gatekeeper/constants';
import { GatekeperSuscribe } from '@Gatekeeper/decorators';
import { LinkEmployeeDTO } from '@Gatekeeper/dto';
import { RoleDTO } from '@Gatekeeper/dto/role.dto';
import { IEventSuscribed } from '@Gatekeeper/interfaces';
import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GatekeeperListener {
  constructor(
    @Inject(LISTENER_CONTAINER)
    private readonly listenerContainer: Map<string, IEventSuscribed>,
  ) {}

  @GatekeperSuscribe({ event: 'linkEmployee', DTO: LinkEmployeeDTO })
  private async linkEmployeeEvent(linkEmployee: LinkEmployeeDTO) {
    console.log('execute business logic for add employee');
    console.log(linkEmployee);
  }

  @GatekeperSuscribe({ event: 'addRole', DTO: RoleDTO })
  private async addRole(role: RoleDTO) {
    console.log('execute business logic for add role');
    console.log(role);
  }

  async redirectWebhook(body: { event: string; data: any }) {
    const { event: eventName, data } = body;
    const eventMeta = this.listenerContainer.get(eventName);

    if (!eventMeta) throw new NotImplementedException();

    const {
      handler,
      meta: { DTO },
    } = eventMeta;

    const transformedBody = plainToClass(DTO, data);

    return await handler(transformedBody);
  }
}
