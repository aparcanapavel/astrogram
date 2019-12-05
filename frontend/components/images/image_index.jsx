import React from 'react';
import ImageIndexItemContainer from './image_index_item_container';

export default class ImageIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUsers().then(() => this.props.fetchImages());
  }

  removeImage(imageId) {
    this.props.deleteImage(imageId);
  }

  render () {
    const { images, currentUser, users } = this.props;
    
    if(!images){
      return <i id="loading-logo" className="fab fa-instagram"></i>
    }

    let sortedPosts = images.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0).map(img => {
      if(currentUser.followeeIds.length === 0){
        let deleteButton = img.authorId === currentUser.id ? <i onClick={() => this.removeImage(img.id)} className="fas fa-ellipsis-v"></i> : null;

        let imgAuthor = users[img.authorId];

        return <ImageIndexItemContainer 
        deleteButton={deleteButton} 
        imgAuthor={imgAuthor} 
        img={img}
        key={img.id}
        users={users}
        currentUser={currentUser}
        />
      } else if (currentUser.followeeIds.includes(img.authorId)) {
        let deleteButton = img.authorId === currentUser.id ? <i onClick={() => this.removeImage(img.id)} className="fas fa-ellipsis-v"></i> : null;

        let imgAuthor = users[img.authorId];

        return <ImageIndexItemContainer
          deleteButton={deleteButton}
          imgAuthor={imgAuthor}
          img={img}
          key={img.id}
          users={users}
          currentUser={currentUser}
        />
      }
    });
    
    return <ul className="posts-feed">{sortedPosts}</ul>
  }
}