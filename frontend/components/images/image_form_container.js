import { connect } from 'react-redux';
import { fetchImages, createImage } from '../../actions/image_actions'
import ImageForm from './image_form';


const mdtp = dispatch => {

  return {
    createImage: (image) => dispatch(createImage(image))
  }
}

export default connect(null, mdtp)(ImageForm);