// Dependencies
import { connect } from 'react-redux';

// Redux Actions
import {
  SET_ONE_FAVORITE_REQUESTED
} from '../../redux/actions/todo-action';

// View
import View from './MySavedGifs';

export const mapStateToProps = (state) => ({
  savedGifs: state.allGiphy.savedGifs
})

const mapDispatchToProps = (dispatch) => ({
  setOneFavorite: (payload) => dispatch({ type: SET_ONE_FAVORITE_REQUESTED, payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);