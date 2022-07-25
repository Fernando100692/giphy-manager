// Dependencies
import { connect } from 'react-redux';

// Redux Actions
import {
  REMOVE_ONE_FAVORITE_REQUESTED,
} from '../../redux/actions/giphy-action';

// View
import View from './MySavedGifs';

export const mapStateToProps = (state) => ({
  savedGifs: state.allGiphy.savedGifs
})

const mapDispatchToProps = (dispatch) => ({
  removeOneFavorite: (payload) => dispatch({ type: REMOVE_ONE_FAVORITE_REQUESTED, payload }),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(View);