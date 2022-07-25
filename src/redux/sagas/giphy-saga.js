// Redux-saga/effects
import {
    put,
    call,
    takeEvery
  } from 'redux-saga/effects';
  
  // Redux actions
  import {
    SET_LOADING,
    GET_ALL_BY_SEARCH,
    GET_ALL_BY_SEARCH_REQUESTED,
    GET_ALL_BY_TRENDING,
    GET_ALL_BY_TRENDING_REQUESTED,
    GET_ONE_BY_RANDOM,
    GET_ONE_BY_RANDOM_REQUESTED,
    GET_ONE_BY_TRANSLATE,
    GET_ONE_BY_TRANSLATE_REQUESTED,
    SET_ONE_FAVORITE,
    SET_ONE_FAVORITE_REQUESTED,
    REMOVE_ONE_FAVORITE,
    REMOVE_ONE_FAVORITE_REQUESTED
  } from '../actions/giphy-action';
  
  // API's
  import {
    getAllbySearch,
    getAllbyTrending,
    getByRandom,
    getByTranslate
  } from '../../api/giphy-api';
  
  // Get All Gifs by Search method
  function* getAllSearch({ payload }) {
    yield put({ type: SET_LOADING });
  
    const allFound = yield call(getAllbySearch, payload);
  
    yield put({ type: GET_ALL_BY_SEARCH, payload: allFound });
  };

  // Get All Gifs by trending method
  function* getAllTrending({ payload }) {
    yield put({ type: SET_LOADING });
  
    const allFound = yield call(getAllbyTrending, payload);
  
    yield put({ type: GET_ALL_BY_TRENDING, payload: allFound });
  };

  // Get one Gif by random method
  function* getRandom({ payload }) {
    yield put({ type: SET_LOADING });
  
    const allFound = yield call(getByRandom, payload);
  
    yield put({ type: GET_ONE_BY_RANDOM, payload: allFound });
  };

  // Get one Gif by translate method
  function* getTranslate({ payload }) {
    yield put({ type: SET_LOADING });
  
    const allFound = yield call(getByTranslate, payload);
  
    yield put({ type: GET_ONE_BY_TRANSLATE, payload: allFound });
  };

  // Add another Gif to my saved Gifs
  function* setOneFav({ payload }) {
    yield put({ type: SET_ONE_FAVORITE, payload })
  }

  // Remove one Gif from my saved Gifs
  function* removeOneFav({ payload }) {
    yield put({ type: REMOVE_ONE_FAVORITE, payload })
  }
  
  export default function* giphySaga() {
    yield takeEvery(GET_ALL_BY_SEARCH_REQUESTED, getAllSearch);
    yield takeEvery(GET_ALL_BY_TRENDING_REQUESTED, getAllTrending);
    yield takeEvery(GET_ONE_BY_RANDOM_REQUESTED, getRandom);
    yield takeEvery(GET_ONE_BY_TRANSLATE_REQUESTED, getTranslate);
    yield takeEvery(SET_ONE_FAVORITE_REQUESTED, setOneFav);
    yield takeEvery(REMOVE_ONE_FAVORITE_REQUESTED, removeOneFav);
  };