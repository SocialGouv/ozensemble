# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

```bash
npx expo install
```

2. Development build

Because we use some libs that are not supported in Expo Go (like `react-native-mmkv` for instance, but a few other too), we need to use [development builds](https://docs.expo.dev/develop/development-builds/introduction/)

> A development build is a debug build of your app that contains the expo-dev-client package. By using development builds instead of Expo Go, you gain full control over the native runtime, so you can install any native libraries, modify any project configuration, or write your own native code. With Expo development builds, you are building your own native app, while with Expo Go you are running your project in a sandboxed native app environment.

To start using it, we did the following:

```bash
npx expo prebuild
```

It created `/ios` and `/android` folders, which are the native projects that we can open with XCode and Android Studio.
Read more [here](https://docs.expo.dev/workflow/prebuild/)

You don't need to do it again. It's a one-time thing.

3. Start the development server

For now, we are doing [Local app development](https://docs.expo.dev/guides/local-app-development/), which requires to install Android Studio and XCode, but there is an [option to use EAS too](https://docs.expo.dev/develop/development-builds/create-a-build/).
We chose the local option to not depend on EAS, but that's an opinionated choice. EAS cost a bit of money, but not that nmuch - it could be much more interesting to use it than to take a lot of time to set up the local environment and debug.

Anyway, now that we are setup locally, we can do

```bash
yarn ios # or yarn android
```


## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
