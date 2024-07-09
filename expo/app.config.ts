// Without dotenv, you can access .env
// import "dotenv/config";
import { type ExpoConfig, type ConfigContext } from "expo/config";

// https://docs.expo.dev/workflow/configuration/#dynamic-configuration

// https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules:
// Running `npx expo config` will display the final configuration that will be used in Expo CLI after resolution has occurred.
// or the sscript `yarn expo-config` in package.json

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "oz-ensemble", // repeat here because TS is yelling if not
  slug: "oz-ensemble", // repeat here because TS is yelling if not
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "oz",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.addicto.v1",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.addicto",
  },
  web: {
    bundler: "metro",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          newArchEnabled: true,
        },
        android: {
          newArchEnabled: true,
        },
      },
    ],
    [
      "@sentry/react-native/expo",
      {
        organization: "incubateur",
        project: "ozensemble",
        url: "https://sentry.fabrique.social.gouv.fr/",
      },
    ],
  ],

  // updates: {
  // url:
  // process.env.EXPO_PUBLIC_EXPO_UPDATES ??
  // // When using expo updates, the env is not available
  // `https://u.expo.dev/${process.env.EAS_PROJECT_ID}`,
  // },

  extra: {
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    EXPO_PUBLIC_API_SCHEME: process.env.EXPO_PUBLIC_API_SCHEME,
    EXPO_PUBLIC_API_HOST: process.env.EXPO_PUBLIC_API_HOST,
    EXPO_PUBLIC_APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
    eas: {
      projectId: process.env.EAS_PROJECT_ID,
    },
  },

  runtimeVersion: {
    policy: "appVersion",
  },
});
