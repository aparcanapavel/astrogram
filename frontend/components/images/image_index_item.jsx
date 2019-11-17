import React from 'react';
import { Link } from "react-router-dom";

export default class ImageIndexItem extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    if(!this.props.no_comments){
      this.props.fetchComments(this.props.img.id);
    }
  }

  submitComment(e) {
    e.preventDefault();
    console.log("todo: submit new comment");
  }

  render() {
    const {deleteButton, img, imgAuthor, comments, users } = this.props;

    let comment_list = comments.map(comment => {

      let commentAuthor = users[comment.authorId].username;

      return <li className="comment-item-preview" key={comment.id}>
        <p>{commentAuthor}</p>
        <p>{comment.body}</p>
      </li>
    })

    const numComments = comments.length > 1 ? <p className="num-comments">View all {comments.length} comments</p> : null

    if(comments.length > 1){
      comment_list = comment_list.slice(0,1);
      // debugger
    }

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
        
        <input 
        id="new-comment-field"
        type="text"
        placeholder="Add a comment..."
        />

        <input type="submit" value="post" />
      </form>
    </li>
  }
}