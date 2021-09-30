import { RoleDTO } from '@Gatekeeper/dto/role.dto';

export class LinkEmployeeDTO {
  id: string;

  zohoUniqueId: string;

  roles: RoleDTO[];
}
