import { 
    SET_LOADING,
    GET_ALL_BY_SEARCH,
    GET_ONE_BY_RANDOM,
    GET_ONE_BY_TRANSLATE,
    GET_ALL_BY_TRENDING,
    SET_ONE_FAVORITE
  } from '../actions/todo-action';
  
  // Reducer state
  const initialState = {
    loading: false,
    allByMultiple: {},
    oneBySingle: {},
    savedGifs: []
  };
  
  const todoReducer = (state = initialState, {type, payload}) => {
    console.log('ÁJAAAAAAAAA', state, type, payload);
    switch(type) {
      // Set loading
      case SET_LOADING:
        return {
          ...state,
      loading: true
        }
      // Get all by search
      case GET_ALL_BY_SEARCH:
        return {
          ...state,
          allByMultiple: payload.data,
          loading: false
        }
      // Get all by search
      case GET_ALL_BY_TRENDING:
        return {
          ...state,
          allByMultiple: payload.data,
          loading: false
        }
      // Get one by random
      case GET_ONE_BY_RANDOM:
        return {
          ...state,
          oneBySingle: payload.data,
          loading: false
        }
      // Add another GIF to my saved Gifs
      case SET_ONE_FAVORITE:
        return {
          ...state,
          savedGifs: [payload, ...state.savedGifs]
        }
      default:
        return state
    };
  };

  export default todoReducer;