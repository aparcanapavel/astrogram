import React from 'react';
import { Link } from "react-router-dom";

export default class ImageShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      loading: true
    }
    this.submitComment = this.submitComment.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.likeIcon = "";
    this.handleFollow = this.handleFollow.bind(this);
  }

  componentDidMount(){
    const { imageId } = this.props;
    this.props.fetchUsers().then(() => {
      this.props.fetchImage(imageId).then(() => {
        this.props.fetchComments(imageId).then(() => {
          this.props.fetchLikes(imageId).then(() => {
            this.setState({ loading: false });
          })
        })
      })
    })
  }

  submitComment(e) {
    e.preventDefault();
    const newComment = Object.assign({}, this.state, { image_id: this.props.imageId });
    this.props.createComment(newComment);
    this.setState({ body: "" });
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleLike(imageId) {
    const { currentUser, likes } = this.props;

    for (let i = 0; i < likes.length; i++) {
      if (likes[i].authorId === currentUser.id) {
        this.props.deleteLike(likes[i].id);
        this.likeIcon = "far fa-heart";

        document.getElementById(`heartIcon-${imageId}`)
          .style.fontSize = '60px';

        $(`#heartIcon-${imageId}`)
          .fadeIn(800)
          .animate({ 'font-size': '30px' }, 150)
          .fadeOut(150);
      }
    }
    if (likes.every(like => like.authorId !== currentUser.id)) {
      this.props.createLike({ image_id: imageId, author_id: currentUser.id });
      this.likeIcon = "fas fa-heart";
      document.getElementById(`heartIcon-${imageId}`).style.fontSize = '40px';
      $(`#heartIcon-${imageId}`)
        .fadeIn(800)
        .animate({ 'font-size': '60px' }, 150)
        .fadeOut(150);

    }

  }

  handleFollow(imgAuthorId) {
    let followData;
    if (this.props.imageAuthor.followerIds.includes(this.props.currentUser.id)) {
      console.log("unfollowing...");
      this.props.unfollowUser(imgAuthorId);
    } else {
      console.log("following...");
      followData = {
        followee_id: imgAuthorId
      }
      this.props.followUser(followData);
    }
  }

  render() {
    if (this.state.loading) {
      return <i id="loading-logo" className="fab fa-instagram"></i>
    }
    const { image, imageAuthor, comments, users, currentUser, likes } = this.props;
    

    let comment_list = comments.map(comment => {
      let commentAuthor = users[comment.authorId].username;

      if ((currentUser.id === comment.authorId) || (image.authorId === currentUser.id)) {
        return <li className="comment-item-preview" key={comment.id}>
          <p>{commentAuthor}</p>
          <p>{comment.body}</p>
          <i onClick={() => this.props.deleteComment(comment.id)} className="far fa-trash-alt"></i>
        </li>

      } else {
        return <li className="comment-item-preview" key={comment.id}>
          <p>{commentAuthor}</p>
          <p>{comment.body}</p>
        </li>
      }
    });

    let postLikes;
    if (likes.length > 1) {
      postLikes = <p className="post-likes">{likes.length} likes</p>;
    } else if (likes.length === 0) {
      postLikes = null;
    } else {
      postLikes = <p className="post-likes">{likes.length} like</p>;
    }

    if (likes.every(like => like.authorId !== currentUser.id)) {
      this.likeIcon = "far fa-heart";
    } else {
      this.likeIcon = "fas fa-heart";
    }


    const numComments = image.commentIds.length > 4 ? <p className="num-comments">View all {comments.length} comments</p> : null

    // if(comments.length > 1){
    //   comment_list = comment_list.slice(0,1);
    // }
    let followButton;
    if (imageAuthor.followerIds.includes(currentUser.id)) {

      followButton = <li className="follow-button" onClick={() => this.handleFollow(imageAuthor.id)}>Following</li>;

    } else if (imageAuthor.id === currentUser.id) {
      followButton = null;

    } else {
      followButton = <li id="follow-button" onClick={() => this.handleFollow(imageAuthor.id)}>Follow</li>

    }
    const src = imageAuthor.imageUrl;

    return <section id="post-show-container">
      <div className="post-show-img" onDoubleClick={() => this.handleLike(image.id)}>
        <i className={this.likeIcon} id={`heartIcon-${image.id}`}></i>
        <img src={image.imageUrl} alt="" />
      </div>

      <div className="image-show-details">
        <div className="post-author">
          <img src={src} /><Link to={`/users/${imageAuthor.id}/profile`}>{imageAuthor.username}</Link>
          <ul>{followButton}</ul>
          {/* {deleteButton} */}
        </div>

        <div className="post-caption">
          <p>{imageAuthor.username}</p>
          <p>{image.caption}</p>
        </div>

        <ul className="post-comments">
          {comment_list}
        </ul>

        <div className="bottom-details">
          <div className="post-icons">
            <i className={this.likeIcon} onClick={() => this.handleLike(image.id)}></i>
            <i className="far fa-comment"></i>
          </div>
          {postLikes}

          <form className="new-comment" onSubmit={this.submitComment}>

            <textarea
              id="new-comment-field"
              placeholder="Add a comment..."
              onChange={this.updateField("body")}
              value={this.state.body}
            />

            <input type="submit" value="Post" disabled={this.state.body === "" ? 'disabled' : null} />
          </form>
        </div>
        
      </div>   
    </section>
  }
}