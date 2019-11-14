import React from 'react';

export default class ImageIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchImages();
  }

  render () {
    const { images } = this.props;
    
    if(!images){
      return <h1>loading</h1>
    }
    const allImages = images.map(image => {

      return <li key={image.id}><img src={image.imageUrl} alt=""/></li>
    });
    
    return <ul>{allImages}</ul>
  }
}