import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */
const { Types, Creators } = createActions(
  {
    /* Login Action Creators */
    signIn: ['body', 'navigation'],
    signInSuccess: ['token'],
    signInError: ['error'],

    signOut: [],
  },
  { prefix: 'auth/' },
);

export { Types, Creators };

/* Initial State */
export const INITIAL_STATE = {
  token: null,
  error: null,
  signingIn: false,
  signingOut: false,
  registering: false,
};

/* Login Reducers */
const signIn = (state) => ({ ...state, error: null, signingIn: true });
const signInSuccess = (state, { token }) => ({ ...state, token, signingIn: false });
const signInError = (state, { error }) => ({ ...state, error, signingIn: false });

export const reducer = createReducer(INITIAL_STATE, {
  /* LOGIN HANDLERS */
  [Types.SIGN_IN]: signIn,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_ERROR]: signInError,
});