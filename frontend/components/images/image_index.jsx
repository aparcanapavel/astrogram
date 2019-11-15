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
    //sorted posts; oldest at the bottom, newest at the top

    let sortedPosts = images.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0).map(img => {
      return <li key={img.id} className="single-post">
        <div className="post-author">
          <img /><h3>{this.props.currentUser.username}</h3>
        </div>

        <img src={img.imageUrl} alt="" />

        <div className="post-icons">
          <i className="far fa-heart"></i>
          <i className="far fa-comment"></i>
        </div>

        <p className="post-likes">### likes</p>

        <div className="post-caption">
          <p>{this.props.currentUser.username}</p>
          <p>{img.caption}</p>
          <p>View all ## comments</p>
        </div>

        <div className="post-comments">

        </div>
        </li>
    });
    
    const allImages = images.map(image => {

      return <li key={image.id}><img src={image.imageUrl} alt=""/></li>
    });
    
    return <ul className="posts-feed">{sortedPosts}</ul>
  }
}