// Dependencies
import { connect } from 'react-redux';

// Redux Actions
import {
  GET_ALL_BY_SEARCH_REQUESTED,
  GET_ALL_BY_TRENDING_REQUESTED,
  GET_ONE_BY_RANDOM_REQUESTED,
  GET_ONE_BY_TRANSLATE_REQUESTED,
  SET_ONE_FAVORITE_REQUESTED
} from '../../redux/actions/todo-action';

// View
import View from './GiphyHome';

export const mapStateToProps = (state) => ({
  allByMultiple: state.allGiphy.allByMultiple,
  oneBySingle: state.allGiphy.oneBySingle,
  loading: state.allGiphy.loading,
  savedGifs: state.allGiphy.savedGifs
})

const mapDispatchToProps = (dispatch) => ({
  getAllBySearch: (payload) => dispatch({ type: GET_ALL_BY_SEARCH_REQUESTED, payload }),
  getAllByTrendig: (payload) => dispatch({ type: GET_ALL_BY_TRENDING_REQUESTED, payload }),
  getOneByRandom: (payload) => dispatch({ type: GET_ONE_BY_RANDOM_REQUESTED, payload }),
  getOneByTranslate: (payload) => dispatch({ type: GET_ONE_BY_TRANSLATE_REQUESTED, payload }),
  setOneFavorite: (payload) => dispatch({ type: SET_ONE_FAVORITE_REQUESTED, payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);