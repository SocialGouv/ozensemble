import AsyncStorage from '@react-native-community/async-storage';
import { createMigrate } from 'redux-persist';

const migrations = {};

export default {
  key: 'addicto',
  version: 4,
  storage: AsyncStorage,
  debug: false,
  migrate: createMigrate(migrations, { debug: false }),
  blacklist: [
    // 'conso',
  ],
  // transforms: [
  //   encryptTransform({
  //     secretKey: 'my-super-magic-secret-key',
  //     onError: function (error) {
  //       // Handle the error.
  //       console.log('error in ecnryption', error);
  //     },
  //   }),
  // ],
};
