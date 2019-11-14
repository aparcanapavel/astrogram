import React from 'react';

export default class ImageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      photoFile: null
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    debugger
    e.preventDefault();
    const formData = new FormData();
    formData.append('image[caption]', this.state.caption);
    formData.append('image[photo]', this.state.photoFile);

    this.props.createImage(formData);
    //turn img form, add a with router on container, '.then" this.props.history.push. to the latest image id
  }

  handleFile(e) {
    this.setState({ photoFile: e.currentTarget.files[0] })
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    return <section className="post-form">
      <h3>username here</h3>
      <form className="image-upload-form" onSubmit={this.handleSubmit}>
        <input 
        type="file"
        onChange={this.handleFile}
        />

        <label>
          caption:
          <input
            type="text"
            value={this.state.caption}
            onChange={this.updateField("caption")}
          />
        </label>

        <button>Upload Image</button>
      </form>
    </section>
  }
}