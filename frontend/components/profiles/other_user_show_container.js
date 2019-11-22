import { connect } from 'react-redux';
import OtherUserShow from './other_user_show';
import { openModal } from '../../actions/modal_actions';
import { fetchImages } from '../../actions/image_actions';
import { fetchUser } from '../../actions/user_actions';
import { unfollowUser, followUser } from '../../actions/follow_actions'

const mstp = (state, ownProps) => {
  // debugger
  return {
    user: state.entities.users[ownProps.match.params.id],
    currentUserId: state.session.id,
    posts: Object.values(state.entities.posts),
    userId: ownProps.match.params.id
  }
}

const mdtp = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal)),
    fetchImages: (userId) => dispatch(fetchImages(userId)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    followUser: follow => dispatch(followUser(follow)),
    unfollowUser: followId => dispatch(unfollowUser(followId))
  }
}

export default connect(mstp, mdtp)(OtherUserShow);