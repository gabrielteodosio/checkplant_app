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

class Constants {
  getConfig = (env = DEFAULT_CONFIG) => CONFIG[env];
}

export default new Constants();