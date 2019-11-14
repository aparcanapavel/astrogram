import { connect } from 'react-redux';
import { fetchImages } from '../../actions/image_actions'
import ImageForm from './image_form';


const mdtp = dispatch => {

  return {
    fetchImages: () => dispatch(fetchImages())
  }
}

export default connect(null, mdtp)(ImageForm);