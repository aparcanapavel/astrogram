import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import { updateUser } from '../../actions/user_actions'
import storage from "local-storage-fallback";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.currentUser.fullName,
      username: this.props.currentUser.username,
      photoFile: null,
      photoUrl: "",
      photoPreview: "",
      switchMenu: "profile"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.switchMenu = this.switchMenu.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme(e) {
    let currTheme = document.documentElement.attributes[0].value;
    if(currTheme === "light"){
      document.documentElement.setAttribute('data-theme', "");
      document.documentElement.setAttribute('data-theme', "dark");
      storage.setItem("userTheme", JSON.stringify({ userTheme: "dark" }));
    } else {
      document.documentElement.setAttribute('data-theme', "");
      document.documentElement.setAttribute('data-theme', "light");
      storage.setItem("userTheme", JSON.stringify({ userTheme: "light" }));
    }
  }

  switchMenu(choice){
    if(choice === "profile"){
      this.setState({ switchMenu: "profile"});
    } else {
      this.setState({ switchMenu: "theme"});
    }
  }

  componentDidMount() {
    this.setState({ 
      photoUrl: this.props.currentUser.imageUrl });
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    formData.append('user[profile_picture]', this.state.photoFile);
    formData.append('user[full_name]', this.state.name);
    formData.append('user[username]', this.state.username);
    formData.append('user[id]', this.props.currentUser.id);
    
    this.props.updateUser(this.props.currentUser, formData).then(() => this.props.history.push(`/users/${this.props.currentUser.id}/profile`));
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {

      this.setState({ photoFile: file, photoPreview: fileReader.result })
    }
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  render() {
    if(!this.props.currentUser){
      return <i id="loading-logo" className="fab fa-instagram"></i>
    }
    const src = this.state.photoPreview === "" ? this.state.photoUrl : this.state.photoPreview;

    const errList = this.props.errors.map((err, i) => <li key={i}>{err}</li>);

    const editProfile = <form className="edit-profile-form" onSubmit={this.handleSubmit}>
        <div className="profile-picture-peview">
          <input
            id="profile-file"
            type="file"
            style={{ visibility: 'hidden' }}
            onChange={this.handleFile}
          />
          <img
            src={src} className="edit-profile-img" />
        </div>
        <h4>{this.props.currentUser.username}</h4>
        <label id="label-file" htmlFor="profile-file" className="btn">
          Change Profile Picture
            </label>
        <br />

        <label htmlFor="editUserName">Name</label>
        <input
          id="editUserName"
          type="text"
          value={this.state.name}
          onChange={this.updateField('name')}
        />

        <br />

        <label htmlFor="editUsername">Username</label>
        <input
          id="editUsername"
          type="text"
          value={this.state.username}
          onChange={this.updateField('username')}
        />

        <br />

        <ul className="editProfileErrors">{errList}</ul>

        <input type="submit" value="Submit" />
      </form>

    const editTheme = <div className="edit-theme">
      <p>To toggle the theme, click the icon:</p>
      <i className="fas fa-adjust" onClick={this.toggleTheme}></i>
    </div>
    
    return (
      <div className="edit-profile-container">
       <nav>
        <ul className="edit-profile-menu">
          <li onClick={() => this.switchMenu("profile")}>
            Edit Profile
          </li>
          <li onClick={() => this.switchMenu("theme")}>
            Theme
          </li>
        </ul>
       </nav>
       <div className="edit-profile-details">
          {this.state.switchMenu === "profile" ? editProfile : editTheme}
       </div>
      </div>
    )
  }
}


const mstp = state => {
  return {
    currentUser: state.entities.users[state.session.id],
    modal: state.ui.modal,
    errors: state.errors.user
  }
}

const mdtp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    updateUser: (user, data) => dispatch(updateUser(user, data))
  }
}

export default withRouter(connect(mstp, mdtp)(EditProfile));