import React from 'react';

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      photoFile: null,
      photoURL: null
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image[caption]', this.state.caption);
    formData.append('image[photo]', this.state.photoFile);

    return this.props.createImage(formData);
    //turn img form, add a with router on container, '.then" this.props.history.push. to the latest image id
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
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

  componentDidMount() {
    //fade in the modals for better UX
  }

  render() {
    console.log(this.state);
    const errList = this.props.errors.map((err, i) => <li key={i}>{err}</li>);

    let preview;
    if (this.state.photoURL) {
      preview = <img src={this.state.photoURL} className="preview"/>
    } else {
      preview = <input
        type="file"
        onChange={this.handleFile}
      />
    } 

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

          <button>Upload Image</button>

          <ul className="formErrors">{errList}</ul>
        </form>
      </div>
    </section>
  }
}