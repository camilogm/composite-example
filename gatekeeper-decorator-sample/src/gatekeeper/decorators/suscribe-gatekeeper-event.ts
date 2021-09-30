import { SUSCRIBE_GATEKEEPER_EVENTS } from '@Gatekeeper/constants';
import { IGatakeeperSuscribeOptions } from '@Gatekeeper/interfaces';
import { SetMetadata } from '@nestjs/common';

export const GatekeperSuscribe = (options: IGatakeeperSuscribeOptions) => {
  return SetMetadata(SUSCRIBE_GATEKEEPER_EVENTS, options);
};
