import { connect } from 'react-redux';
import UserShow from './user_show';
import { openModal } from '../../actions/modal_actions';
import { fetchImages } from '../../actions/image_actions';
import { fetchUsers } from '../../actions/user_actions';

const mstp = (state, ownProps) => {
  // debugger
  return {
    user: state.entities.users[ownProps.match.params.id],
    currentUserId: state.session.id,
    posts: Object.values(state.entities.posts)
  }
}

const mdtp = dispatch => {
  return {
    openModal: modal => dispatch(openModal(modal)),
    fetchImages: (userId) => dispatch(fetchImages(userId)),
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mstp, mdtp)(UserShow);