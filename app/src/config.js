const MATOMO_URL = process.env.EXPO_PUBLIC_MATOMO_URL;
const MATOMO_IDSITE_1 = process.env.EXPO_PUBLIC_MATOMO_IDSITE_1;
const MATOMO_URL_2 = process.env.EXPO_PUBLIC_MATOMO_URL_2;
const MATOMO_IDSITE_2 = process.env.EXPO_PUBLIC_MATOMO_IDSITE_2;
const SENTRY_XXX = process.env.EXPO_PUBLIC_SENTRY_XXX;
const OPEN_FOOD_FACT_PASSWORD = process.env.EXPO_PUBLIC_OPEN_FOOD_FACT_PASSWORD;
const OPEN_FOOD_FACT_USER_ID = process.env.EXPO_PUBLIC_OPEN_FOOD_FACT_USER_ID;
const SCHEME = process.env.EXPO_PUBLIC_SCHEME;
const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV;

console.log({
  MATOMO_URL,
  MATOMO_IDSITE_1,
  MATOMO_URL_2,
  MATOMO_IDSITE_2,
  SENTRY_XXX,
  OPEN_FOOD_FACT_PASSWORD,
  OPEN_FOOD_FACT_USER_ID,
  SCHEME,
  API_HOST,
  APP_ENV,
});

export {
  MATOMO_URL,
  MATOMO_IDSITE_1,
  MATOMO_URL_2,
  MATOMO_IDSITE_2,
  SENTRY_XXX,
  OPEN_FOOD_FACT_PASSWORD,
  OPEN_FOOD_FACT_USER_ID,
  SCHEME,
  API_HOST,
  APP_ENV,
};
