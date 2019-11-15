import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import ImageFormContainer from '../images/image_form_container';

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  // let component;
  // switch (modal) {
  //   case 'newPost':
  //     // component = <NewPostContainer />;
  //     break;
  //   case 'viewPost':
  //     // component = <ViewPostContainer />;
  //     break;
  //   default:
  //     return null;
  // }
  return (
    <div className="modal-background" id="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {/* {component} */}
        <ImageFormContainer />
      </div>
    </div>
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
