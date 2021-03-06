import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

class UserShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.toPicture = this.toPicture.bind(this);
  }

  handleLogout(e){
    e.preventDefault;
    this.props.logout();
    this.props.history.push('/');
  }

  toPicture(pictureId){
    this.props.history.push(`/feed/${pictureId}`);
  }

  componentDidMount() {
    this.props.fetchImages(this.props.user.id).then(() => {
      this.setState({ loading: false });
    })
  }

  render() {    
    if(this.state.loading){
      return <i id="loading-logo" className="fab fa-instagram"></i>
    }
    const { user, posts } = this.props;
    const followers = user.followerIds.length;
    const following = user.followeeIds.length;
    const postNums = user.authoredImageIds.length > 1 ? <p><strong>{user.authoredImageIds.length}</strong> posts</p> : <p><strong>{user.authoredImageIds.length}</strong> post</p>

    let mobilePosts = null;
    
    if(this.props.mobile) {
      mobilePosts = user.authoredImageIds.length > 1 ? (
        <li>
          <strong>{user.authoredImageIds.length}</strong>
          <p>posts</p>
        </li>
      ) : (
          <li>
            <strong>{user.authoredImageIds.length}</strong>
            <p>post</p>
          </li>
        )
    }

    posts.reverse();
    
    let ulKey = 1;
    let stacks = [];
    let row = [];
    for(let i = 0; i < posts.length; i++){

      let likes = posts[i].likeIds.length;
      let comments = posts[i].commentIds.length;
      row.push(<li key={posts[i].id} className="post-item" onClick={() => this.toPicture(posts[i].id)}>
        <div className="profile-post-icons">
          <i className="fas fa-heart"></i><p>{likes}</p>
          <i className="far fa-comment"></i><p>{comments}</p>
        </div>
        <div className="profile-single-image">
          <img src={posts[i].imageUrl} alt="" />
        </div>
      </li>)

      if(row.length === 3){
        stacks.push(<ul key={ulKey} className="posts-stack">
          {row}
        </ul>)
        ulKey++;
        row = [];
      } 
    }
    // need to figure out how to give each of the UL's an unique key
    if (stacks.length === 0) {
      stacks.push(<ul key={ulKey + 1} className="posts-stack">
        {row}
      </ul>)
    } else if (row.length > 0) {
      stacks.push(<ul key={ulKey + 1} className="posts-stack">
        {row}
      </ul>)
    }

    const src = user.imageUrl;
    return this.props.mobile ? (
      <section className="user-profile-container">
        <div className="profile-details">          
          <img src={src} alt="" />
          
          <div className="detail-top">
            <h2>{user.username}</h2>
            <ul className="detail-middle">
              {mobilePosts}
              <li><strong>{followers}</strong><p>followers</p></li>
              <li><strong>{following}</strong><p>following</p></li>
            </ul>
            <Link to="/account/edit">Edit Profile</Link>
            <i className="fas fa-cog" onClick={() => this.props.openModal('gearOptions')}></i>
          </div>

          <div className="detail-bottom">
            <strong>{user.fullName}</strong>
          </div>

        </div>
        <hr className="profile-hr" />

        {/* outter container, user flex: column */}
        <div className="user-posts-container">
          {stacks}
        </div>
      </section>
    ) : (
    <section className="user-profile-container">
      <div className="profile-details">
        <img src={src} alt=""/>
        <div className="detail-top">
          <h2>{user.username}</h2>
          <Link to="/account/edit">Edit Profile</Link>
          <i className="fas fa-cog" onClick={() => this.props.openModal('gearOptions')}></i>
        </div>

        <div className="detail-middle">
          {postNums}
          <p><strong>{followers}</strong> followers</p>
          <p><strong>{following}</strong> following</p>
        </div>

        <div className="detail-bottom">
          <strong>{user.fullName}</strong>
        </div>
      </div>
      <hr className="profile-hr"/>

      {/* outter container, user flex: column */}
      <div className="user-posts-container">
        {stacks}
      </div>
    </section>
    )
  }
}

export default withRouter(UserShow);