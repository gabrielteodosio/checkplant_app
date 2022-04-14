import { createReducer, createActions } from 'reduxsauce';

/* Types & Action Creators */
const { Types, Creators } = createActions(
  {
    /* Map Action Creators */
    fetchMarkers: [],
    fetchMarkersSuccess: ['markers'],
    fetchMarkersError: ['error'],

    newAnnotation: ['annotation'],
    newAnnotationSuccess: [],
    newAnnotationError: ['error'],
  },
  { prefix: 'map/' },
);

export { Types, Creators };

/* Initial State */
export const INITIAL_STATE = {
  error: null,
  markers: [],
  fetchingMarkers: false,
  creatingAnnotation: false
};

/* Login Reducers */
const fetchMarkers = (state) => ({ ...state, error: null, fetchingMarkers: true });
const fetchMarkersSuccess = (state, { markers }) => ({ ...state, markers, fetchingMarkers: false });
const fetchMarkersError = (state, { error }) => ({ ...state, error, fetchingMarkers: false });

/* Annotation Reducers */
const newAnnotation = (state) => ({ ...state, error: null, creatingAnnotation: true });
const newAnnotationSuccess = (state) => ({ ...state, creatingAnnotation: false });
const newAnnotationError = (state, { error }) => ({ ...state, error, creatingAnnotation: false });

export const reducer = createReducer(INITIAL_STATE, {
  /* LOGIN HANDLERS */
  [Types.FETCH_MARKERS]: fetchMarkers,
  [Types.FETCH_MARKERS_SUCCESS]: fetchMarkersSuccess,
  [Types.FETCH_MARKERS_ERROR]: fetchMarkersError,

  /* ANNOTATION HANDLERS */
  [Types.NEW_ANNOTATION]: newAnnotation,
  [Types.NEW_ANNOTATION_SUCCESS]: newAnnotationSuccess,
  [Types.NEW_ANNOTATION_ERROR]: newAnnotationError,
});