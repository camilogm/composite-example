import { IGatakeeperSuscribeOptions } from '@Gatekeeper/interfaces';

export class IEventSuscribed {
  meta: IGatakeeperSuscribeOptions;

  handler: (...args: any[]) => any;
}
