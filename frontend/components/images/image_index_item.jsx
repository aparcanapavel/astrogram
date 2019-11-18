import React from 'react';
import { Link } from "react-router-dom";

export default class ImageIndexItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      body: ""
    }
    this.submitComment = this.submitComment.bind(this);
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

  render() {
    const { deleteButton, img, imgAuthor, comments, users, currentUser } = this.props;
    

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



    const numComments = img.commentIds.length > 4 ? <p className="num-comments">View all {comments.length} comments</p> : null

    // if(comments.length > 1){
    //   comment_list = comment_list.slice(0,1);
    // }

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