import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */
const { Types, Creators } = createActions(
  {
    /* Login Action Creators */
    signIn: ['body', 'navigation'],
    signInSuccess: ['token'],
    signInError: ['error'],

    signUp: ['body', 'navigation'],
    signUpSuccess: ['token'],
    signUpError: ['error'],

    signOut: ['navigation'],
    signOutSuccess: [],
    signOutError: ['error'],
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
  signingUp: false,
};

/* Login Reducers */
const signIn = (state) => ({ ...state, error: null, signingIn: true });
const signInSuccess = (state, { token }) => ({ ...state, token, error: null, signingIn: false });
const signInError = (state, { error }) => ({ ...state, error, signingIn: false });

/* Register Reducers */
const signUp = (state) => ({ ...state, error: null, signingUp: true });
const signUpSuccess = (state, { token }) => ({ ...state, token, error: null, signingUp: false });
const signUpError = (state) => ({ ...state, error: null, signingUp: false });

/* Register Reducers */
/* Logout Reducers */
const signOut = (state) => ({ ...state, signingOut: true });
const signOutSuccess = (state) => ({ ...state, token: null, signingOut: false });
const signOutError = (state, { error }) => ({
  ...state,
  error,
  signingOut: false,
});


export const reducer = createReducer(INITIAL_STATE, {
  /* LOGIN HANDLERS */
  [Types.SIGN_IN]: signIn,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_ERROR]: signInError,

  /* SIGNUP HANDLERS */
  [Types.SIGN_UP]: signUp,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_ERROR]: signUpError,

  /* LOGOUT HANDLERS */
  [Types.SIGN_OUT]: signOut,
  [Types.SIGN_OUT_SUCCESS]: signOutSuccess,
  [Types.SIGN_OUT_ERROR]: signOutError,
});