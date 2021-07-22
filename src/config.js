import envConfig from 'react-native-config';

const MATOMO_URL = envConfig.MATOMO_URL;
const MATOMO_IDSITE_1 = envConfig.MATOMO_IDSITE_1;
const MATOMO_URL_2 = envConfig.MATOMO_URL_2;
const MATOMO_IDSITE_2 = envConfig.MATOMO_IDSITE_2;
const TIPIMAIL_API_USER = envConfig.TIPIMAIL_API_USER;
const TIPIMAIL_API_KEY = envConfig.TIPIMAIL_API_KEY;
const TIPIMAIL_EMAIL_TO = envConfig.TIPIMAIL_EMAIL_TO;
const TIPIMAIL_EMAIL_FROM = envConfig.TIPIMAIL_EMAIL_FROM;
const SENTRY_DSN = envConfig.SENTRY_DSN;

export {
  MATOMO_URL,
  MATOMO_IDSITE_1,
  MATOMO_URL_2,
  MATOMO_IDSITE_2,
  TIPIMAIL_API_USER,
  TIPIMAIL_API_KEY,
  TIPIMAIL_EMAIL_TO,
  TIPIMAIL_EMAIL_FROM,
  SENTRY_DSN,
};
