import React from 'react';
import ImageIndexItemContainer from './image_index_item_container';

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
    
    if(!images){
      return <h1>loading</h1>
    }

    let sortedPosts = images.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0).map(img => {

      let deleteButton = img.authorId === currentUser.id ? <i onClick={() => this.removeImage(img.id)} className="fas fa-ellipsis-v"></i> : null;

      let imgAuthor = users[img.authorId].username;

      let no_comments = img.commentIds.length === 0 ? true : false;

      return <ImageIndexItemContainer 
      deleteButton={deleteButton} 
      imgAuthor={imgAuthor} 
      img={img}
      key={img.id}
      users={users}
      no_comments={no_comments}
      />
    });
    
    return <ul className="posts-feed">{sortedPosts}</ul>
  }
}