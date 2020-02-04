;import { connect } from 'react-redux';
import { fetchImages, createImage } from '../../actions/image_actions'
import ImageForm from './image_form';
import { closeModal } from '../../actions/modal_actions';

const mstp = ({ errors, entities, session }) => {
  return {
    posts: entities.posts,
    errors: errors.image,
    currentUser: entities.users[session.id]
  }
}

const mdtp = dispatch => {

  return {
    createImage: (image) => dispatch(createImage(image)),
    closeModal: () => dispatch(closeModal())
  }
}

export default connect(mstp, mdtp)(ImageForm);