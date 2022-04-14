import Reactotron, {
  overlay,
  networking,
  asyncStorage,
  openInEditor,
  trackGlobalErrors,
} from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { reactotronRedux } from 'reactotron-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tron = Reactotron.configure({ name: 'CheckPlantApp', port: 9091 })
  .use(overlay())
  .use(sagaPlugin())
  .use(networking())
  .use(openInEditor())
  .use(asyncStorage({}))
  .use(reactotronRedux())
  .use(trackGlobalErrors({}))
  .useReactNative({
    errors: true,
    editor: true,
    devTools: true,
    storybook: true,
    networking: true,
    asyncStorage: true,
  })
  .setAsyncStorageHandler(AsyncStorage)
  .connect();

console.tron = tron;

if (__DEV__) {
  console.tron.clear();
}