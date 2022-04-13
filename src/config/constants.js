export const DEFAULT_CONFIG = __DEV__ ? 'development' : 'production';
// export const DEFAULT_CONFIG = 'production';

const CONFIG = {
  development: {
    BASE_URL: 'http://localhost:3000/api/v1',
  },
  production: {
    BASE_URL: 'https://someapi.herokuapp.com',
  },
};

console.log(__DEV__ ? "val me da um beijo" : "eu dou um beijo em val")

class Constants {
  getConfig = (env = DEFAULT_CONFIG) => CONFIG[env];
}

export default new Constants();