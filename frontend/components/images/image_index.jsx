import React from 'react';
import ImageIndexItemContainer from './image_index_item_container';

export default class ImageIndex extends React.Component {
  constructor(props) {
    super(props)
    this.removeImage = this.removeImage.bind(this);
    this.showImageOptions = this.showImageOptions.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers().then(() => this.props.fetchImages());
  }

  removeImage(imageId) {
    this.props.deleteImage(imageId);
  }

  showImageOptions(imageId) {
    document.getElementById(`image-options-${imageId}`).classList.toggle("show");
  }

  render () {
    const { images, currentUser, users } = this.props;
    
    if(!images){
      return <i id="loading-logo" className="fab fa-instagram"></i>
    }

    let sortedPosts = images.sort((a, b) => a.id < b.id ? 1 : a.id > b.id ? -1 : 0).map(img => {
      let optionsButton = img.authorId === currentUser.id ? <i onClick={() => this.showImageOptions(img.id)} className="fas fa-ellipsis-v"></i> : null;

      let imgAuthor = users[img.authorId];
      
      if(currentUser.followerIds.length === 0){
        return <ImageIndexItemContainer 
        removeImage={() => this.removeImage(img.id)} 
        optionsButton={optionsButton}
        imgAuthor={imgAuthor} 
        img={img}
        key={img.id}
        users={users}
        currentUser={currentUser}
        toggleOptions={() => this.showImageOptions(img.id)}
        />
      } else if (currentUser.followeeIds.includes(img.authorId) || currentUser.id === img.authorId) {
        return <ImageIndexItemContainer
          removeImage={() => this.removeImage(img.id)}
          optionsButton={optionsButton}
          imgAuthor={imgAuthor}
          img={img}
          key={img.id}
          users={users}
          currentUser={currentUser}
          toggleOptions={() => this.showImageOptions(img.id)}
        />
      }
    });
    
    return <ul className="posts-feed">{sortedPosts}</ul>
  }
}