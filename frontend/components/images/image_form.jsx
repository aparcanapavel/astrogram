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

  handleSubmit(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('image[caption]', this.state.caption);
    formData.append('image[photo]', this.state.photoFile);

    this.props.createImage(formData);
    //turn img form, add a with router on container, '.then" this.props.history.push. to the latest image id
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    filereader.onloadend = () => {

      this.setState({ photoFile: file, photoURL: filereader.result })
    }
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    const errList = this.props.errors.map((err, i) => <li key={i}>{err}</li>);

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

        <ul className="formErrors">{errList}</ul>
      </form>
    </section>
  }
}