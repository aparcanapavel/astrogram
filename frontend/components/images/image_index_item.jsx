import React from 'react';
import { Link } from "react-router-dom";

export default class ImageIndexItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      body: ""
    }
    this.submitComment = this.submitComment.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.likeIcon = "";
    this.handleFollow = this.handleFollow.bind(this);
    this.is_following = this.props.imgAuthor.followerIds.includes(this.props.currentUser.id)
  }

  submitComment(e) {
    e.preventDefault();
    const newComment = Object.assign({}, this.state, { image_id: this.props.img.id});
    this.props.createComment(newComment);
    this.setState({ body: "" });
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleLike(imageId) {
    const { currentUser, likes } = this.props;

    for(let i = 0; i < likes.length; i++){
      if(likes[i].authorId === currentUser.id){
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
    let followData ;
    if (this.props.imgAuthor.followerIds.includes(this.props.currentUser.id)) {
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
    const { deleteButton, img, imgAuthor, comments, users, currentUser, likes } = this.props;
    
  
    let comment_list = comments.map(comment => {
      let commentAuthor = users[comment.authorId].username;

      if ((currentUser.id === comment.authorId) || (img.authorId === currentUser.id)) {
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
    if(likes.length > 1){
      postLikes = <p className="post-likes">{likes.length} likes</p>;
    } else if (likes.length === 0){
      postLikes = null;
    } else {
      postLikes = <p className="post-likes">{likes.length} like</p>;
    }

    if (likes.every(like => like.authorId !== currentUser.id)) {
      this.likeIcon = "far fa-heart";
    } else {
      this.likeIcon = "fas fa-heart";
    }


    const numComments = img.commentIds.length > 4 ? <p className="num-comments">View all {comments.length} comments</p> : null

    // if(comments.length > 1){
    //   comment_list = comment_list.slice(0,1);
    // }
    let followButton;
    if(imgAuthor.followerIds.includes(currentUser.id)){

      followButton = <li className="follow-button" onClick={() => this.handleFollow(imgAuthor.id)}>Following</li>;

    } else if (imgAuthor.id === currentUser.id){
      followButton = null;

    } else {
      followButton = <li id="follow-button" onClick={() => this.handleFollow(imgAuthor.id)}>Follow</li>

    }

    return <li key={img.id} className="single-post">
      <div className="post-author">
        <img /><Link to={`/users/${imgAuthor.id}/profile`}>{imgAuthor.username}</Link>
        <ul>{followButton}</ul>
        {deleteButton}
      </div>

      <div className="post-img" onDoubleClick={() => this.handleLike(img.id)}>
        <i className={this.likeIcon} id={`heartIcon-${img.id}`}></i>
        <img src={img.imageUrl} alt=""  />
      </div>

      <div className="post-icons">
        <i className={this.likeIcon} onClick={() => this.handleLike(img.id)}></i>
        <i className="far fa-comment"></i>
      </div>

      {postLikes}

      <div className="post-caption">
        <p>{imgAuthor.username}</p>
        <p>{img.caption}</p>
        {numComments}
      </div>

      <ul className="post-comments">
        {comment_list}
      </ul>

      <form className="new-comment" onSubmit={this.submitComment}>
        
        <textarea 
        id="new-comment-field"
        placeholder="Add a comment..."
        onChange={this.updateField("body")}
        value={this.state.body}
        />

        <input type="submit" value="Post" disabled={this.state.body === "" ? 'disabled' : null}/>
      </form>
    </li>
  }
}