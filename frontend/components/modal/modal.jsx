import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import ImageFormContainer from '../images/image_form_container';
import LoginOptions from '../session/login_options';
import FadeIn from 'react-fade-in';
import GearOptions from '../profiles/gear_options';

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'newPost':
      component = <ImageFormContainer />;
      break;
    case 'loginOptions':
      component = <LoginOptions />;
      break;
    case 'gearOptions':
      component = <GearOptions />;
      break;
    case 'editProfilePicture':
      console.log("opening the profile picture edit");
      
    default:
      return null;
  }
  return (
    <FadeIn>
      <div className="modal-background" id="modal-background" onClick={closeModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          {component}
        </div>
      </div>
    </FadeIn>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
