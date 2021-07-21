import AsyncStorage from '@react-native-async-storage/async-storage';
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
};
