import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { updateUser } from '../../actions/user_actions'

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.currentUser.fullName,
      userName: this.props.currentUser.username,
      photoFile: null,
      photoUrl: this.props.currentUser.imageUrl
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user[photo]', this.state.photoFile);
    formData.append('user[full_name]', this.state.name);
    formData.append('user[username]', this.state.username);
    formData.append('user[id]', this.props.currentUser.id);
    
    this.props.updateUser(this.props.currentUser, formData);

    if (this.state.photoURL) {
      this.props.history.push(`/users/${currentUser.id}/profile`);
    }
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {

      this.setState({ photoFile: file, photoURL: fileReader.result })
    }
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render() {
    let preview;
    if (this.state.photoURL) {
      preview = <img 
        src={this.state.photoURL} className="edit-profile-img" />
    } else {
      preview = <input
        id="profile-file"
        type="file"
        style={{ visibility: 'hidden' }}
        onChange={this.handleFile}
      />
    } 
    
    return (
      <div className="edit-profile-container">
       <nav>
        <ul>
          <li>
            Edit Profile
          </li>
        </ul>
       </nav>
       <div className="edit-profile-details">
          <form className="edit-profile-form" onSubmit={this.handleSubmit}>
            {preview}
            <h4>{this.props.currentUser.username}</h4>
            <label id="label-file" htmlFor="profile-file" className="btn">
              Change Profile Picture
            </label>
            <input id="profile-file" style={{visibility: 'hidden'}} type="file"/>
            <br/>

            <label htmlFor="editUserName">Name</label>
            <input 
            id="editUserName"
            type="text"
            value={this.state.name}
            onChange={this.updateField('name')}
            />

            <br/>

            <label htmlFor="editUsername">Username</label>
            <input 
            id="editUsername"
            type="text"
            value={this.state.userName}
            onChange={this.updateField('username')}
            />

            <br/>

            <input type="submit" value="Submit"/>
          </form>
       </div>
      </div>
    )
  }
}


const mstp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    modal: state.ui.modal
  }
}

const mdtp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    updateUser: user => dispatch(updateUser(user))
  }
}

export default withRouter(connect(mstp, mdtp)(EditProfile));