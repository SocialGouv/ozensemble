import { type ExpoConfig, type ConfigContext } from "expo/config";
import version from "./app.versions.json";

// https://docs.expo.dev/workflow/configuration/#dynamic-configuration

// https://docs.expo.dev/workflow/configuration/#configuration-resolution-rules:
// Running `npx expo config` will display the final configuration that will be used in Expo CLI after resolution has occurred.
// or the sscript `yarn expo-config` in package.json

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log({
    ENV_VARIABLES_CALLED_FROM: process.env.ENV_VARIABLES_CALLED_FROM,
    NODE_ENV: process.env.NODE_ENV,
  });
  return {
    ...config,
    name: "Oz Ensemble",
    slug: "oz_ensemble",
    owner: "oz-ensemble",
    newArchEnabled: true,
    version: version.buildName,
    // orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "oz",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#4030a5",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.addicto.v1",
      config: {
        usesNonExemptEncryption: false,
      },
      buildNumber: String(version.buildNumber),
      infoPlist: {
        LSApplicationQueriesSchemes: ["oz"],
        UISupportsDocumentBrowser: true,
        UIFileSharingEnabled: true,
        LSSupportsOpeningDocumentsInPlace: true,
      },
    },
    androidStatusBar: {
      backgroundColor: "#4030a5",
      barStyle: "light-content",
      hidden: false,
      translucent: false,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#4030a5",
      },
      googleServicesFile: "./google-services.json",
      package: "com.addicto",
      versionCode: version.buildNumber,
      permissions: [
        "android.permission.SCHEDULE_EXACT_ALARM",
        "android.permission.WRITE_EXTERNAL_STORAGE",
        "android.permission",
      ],
      softwareKeyboardLayoutMode: "pan",
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "oz",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    web: {
      bundler: "metro",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      [
        "react-native-share",
        {
          ios: ["fb", "instagram", "twitter", "tiktoksharesdk"],
          android: ["com.facebook.katana", "com.instagram.android", "com.twitter.android", "com.zhiliaoapp.musically"],
          enableBase64ShareAndroid: true,
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
      [
        "expo-notifications",
        {
          // "icon": "./local/path/to/your-icon.png",
          defaultChannel: "PUSH-LOCAL-NOTIFICATIONS",
          color: "#4030a5",
          mode: "production",
        },
      ],
      [
        "expo-dev-launcher",
        {
          launchMode: "most-recent",
        },
      ],
    ],

    // updates: {
    //   url: `https://u.expo.dev/${process.env.EAS_PROJECT_ID}`,
    // },

    extra: {
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      EXPO_PUBLIC_API_SCHEME: process.env.EXPO_PUBLIC_API_SCHEME,
      EXPO_PUBLIC_API_HOST: process.env.EXPO_PUBLIC_API_HOST,
      EXPO_PUBLIC_APP_ENV: process.env.EXPO_PUBLIC_APP_ENV,
      eas: {
        projectId: process.env.EAS_PROJECT_ID ?? "0cdb8eae-8390-44f0-8762-592ea2a538fa",
      },
    },

    // runtimeVersion: version.buildName,
  };
};
