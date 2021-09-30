import { registerAs } from '@nestjs/config';

export const GatekeeperConfig = registerAs('gatekeeperConfig', () => {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;

  return {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  };
});
