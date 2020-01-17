import React from 'react';
import { withRouter } from 'react-router-dom';

class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      photoFile: null,
      photoURL: null,
      loadingButton: false
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toHome = this.toHome.bind(this);
  }

  toHome() {
    this.props.history.push('/');
  }

  handleSubmit(e) {
    e.preventDefault();
    const button = document.getElementById("new-image-button");
    button.disabled = true;
    const formData = new FormData();
    formData.append('image[caption]', this.state.caption);
    formData.append('image[photo]', this.state.photoFile);

    this.props.createImage(formData).then(image => {
      const imgIds = Object.keys(this.props.posts);
      if (imgIds.includes(image.image.id.toString())){
        this.props.closeModal();
      }
    });
    if(this.state.photoURL){
      this.toHome();
      this.setState({ loadingButton: true });
    }
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    if (file.type && file.type.split("/")[0] !== "image") {
      alert("We currently only allow images");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({ photoFile: file, photoURL: fileReader.result })
    }
    if(file) {
      fileReader.readAsDataURL(file);
    }
    //need to see how to not rotate vertical images by default to landscape
  }
  

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    const errList = this.props.errors.map((err, i) => {
      return <li key={i}>{err}</li>}
    );

    let preview;
    if (this.state.photoURL) {
      preview = <img src={this.state.photoURL} className="preview"/>
    } else {
      preview = <input
        type="file"
        onChange={this.handleFile}
      />
    } 
    
    let buttonText = this.state.loadingButton ? <i id="loading-button" className="fas fa-circle-notch"></i> : "Upload Image";

    return <section className="post-form-container">
      <div className="post-form-modal">
        <h3>{this.props.currentUser.username}</h3>
        <form className="image-upload-form" onSubmit={this.handleSubmit}>
          <div className="preview-upload">
            {preview}
          </div>

          <label>
            
            <input
              type="text"
              value={this.state.caption}
              onChange={this.updateField("caption")}
              placeholder="caption:"
            />
          </label>

          <br/>

          <button id="new-image-button">{buttonText}</button>

          <ul className="formErrors">{errList}</ul>
        </form>
      </div>
    </section>
  }
}

export default withRouter(ImageForm);