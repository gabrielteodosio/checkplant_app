import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */
const { Types, Creators } = createActions(
  {
    /* Map Action Creators */
    fetchMarkers: [],
    fetchMarkersSuccess: ['markers'],
    fetchMarkersError: ['error'],
  },
  { prefix: 'map/' },
);

export { Types, Creators };

/* Initial State */
export const INITIAL_STATE = {
  error: null,
  markers: [],
  fetchingMarkers: false,
};

/* Login Reducers */
const fetchMarkers = (state) => ({ ...state, error: null, signingIn: true });
const fetchMarkersSuccess = (state, { token }) => ({ ...state, token, error: null, signingIn: false });
const fetchMarkersError = (state, { error }) => ({ ...state, error, signingIn: false });

export const reducer = createReducer(INITIAL_STATE, {
  /* LOGIN HANDLERS */
  [Types.FETCH_MARKERS]: fetchMarkers,
  [Types.FETCH_MARKERS_SUCCESS]: fetchMarkersSuccess,
  [Types.FETCH_MARKERS_ERROR]: fetchMarkersError,
});