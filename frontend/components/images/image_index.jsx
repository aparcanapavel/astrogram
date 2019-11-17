import React from 'react';

export default class ImageIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchImages();
  }

  removeImage(imageId) {
    this.props.deleteImage(imageId);
  }

  render () {
    const { images, currentUser, users } = this.props;
    
    const that = this;
    if(!images){
      return <h1>loading</h1>
    }

    let sortedPosts = images.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0).map(img => {

      let deleteButton = img.authorId === currentUser.id ? <i onClick={() => this.removeImage(img.id)} className="fas fa-ellipsis-v"></i> : null;

      let imgAuthor = users[img.authorId].username;

      return <li key={img.id} className="single-post">
        <div className="post-author">
          <img /><h3>{imgAuthor}</h3>
          {deleteButton}
        </div>

        <img src={img.imageUrl} alt="" />

        <div className="post-icons">
          <i className="far fa-heart"></i>
          <i className="far fa-comment"></i>
        </div>

        <p className="post-likes">### likes</p>

        <div className="post-caption">
          <p>{imgAuthor}</p>
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