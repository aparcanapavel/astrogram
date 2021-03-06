import React from 'react';
import { withRouter } from 'react-router-dom';

class OtherUserShow extends React.Component {
  constructor(props) {
    super(props)
    this.handleFollow = this.handleFollow.bind(this);
    this.state = {
      loading: true,
      numFollowees: null,
      numFollowers: null,
      followed: false,
      posts: null
    }
    this.toPicture = this.toPicture.bind(this);
  }

  toPicture(pictureId) {
    this.props.history.push(`/feed/${pictureId}`);
  }

  componentDidMount() {
    const { userId } = this.props;

    this.props.fetchUser(userId).then(() => this.props.fetchImages(this.props.user.id)).then(() => {

      this.setState({ 
        loading: false, 
        numFollowers: this.props.user.followerIds.length,
        numFollowees: this.props.user.followeeIds.length,
        followed: this.props.user.followerIds.includes(this.props.currentUserId),
        posts: this.props.posts
      });
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.componentDidMount();
    }
  }

  handleFollow(userId) {

    let followData;
    if (this.state.followed) {
      this.props.unfollowUser(userId).then(() => {
        this.setState({ 
          followed: false,
          numFollowers: this.state.numFollowers - 1
        })
      });

    } else {
      followData = {
        followee_id: userId
      }
      this.props.followUser(followData).then(() => {
        this.setState({
          followed: true,
          numFollowers: this.state.numFollowers + 1
        })
      });

    }
  }

  render() {
    if (this.state.loading) {
      return <i id="loading-logo" className="fab fa-instagram"></i>
    }
    
    const { user } = this.props;
    const posts = this.state.posts;
    
    const postNums = user.authoredImageIds.length > 1 ? <p><strong>{user.authoredImageIds.length}</strong> posts</p> : <p><strong>{user.authoredImageIds.length}</strong> post</p>

    let mobilePosts = null;

    if (this.props.mobile) {
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

    let stacks = [];
    let row = [];
    for (let i = 0; i < posts.length; i++) {
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

      if (row.length === 3) {
        stacks.push(<ul key={i} className="posts-stack">
          {row}
        </ul>)
        row = [];
      }
    }

    if (stacks.length === 0) {
      stacks.push(<ul key={1} className="posts-stack">
        {row}
      </ul>)
    } else if (row.length !== 0) {
      stacks.push(<ul key={1} className="posts-stack">
        {row}
      </ul>)
    }

    let followButton;    
    if(this.state.followed){
      followButton = (<button 
        className="profile-following" 
        onClick={() => this.handleFollow(user.id)}>
          Following
        </button >
      )
    } else{
      followButton = (<button
        className="profile-follow-button"
        onClick={() => this.handleFollow(user.id)}>
        Follow
        </button >
      )
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
              <li>
                <strong>{this.state.numFollowers}</strong>
                <p>followers</p>
              </li>
              <li>
                <strong>{this.state.numFollowees}</strong>
                <p>following</p>
              </li>
            </ul>
            
            {followButton}
            <i className="fas fa-ellipsis-h" onClick={() => this.props.openModal('gearOptions')}></i>
          </div>

          <div className="detail-bottom">
            <strong>{user.fullName}</strong>
          </div>
        </div>
        <hr />

        <div className="user-posts-container">
          {stacks}
        </div>
      </section>
    ) : (
    <section className="user-profile-container">
      <div className="profile-details">
        <img src={src} alt="" />
        <div className="detail-top">
          <h2>{user.username}</h2>
          {followButton}
          <i className="fas fa-ellipsis-h" onClick={() => this.props.openModal('gearOptions')}></i>
        </div>

        <div className="detail-middle">
          {postNums}
          <p><strong>{this.state.numFollowers}</strong> followers</p>
          <p><strong>{this.state.numFollowees}</strong> following</p>
        </div>

        <div className="detail-bottom">
          <strong>{user.fullName}</strong>
        </div>
      </div>
      <hr />

      <div className="user-posts-container">
        {stacks}
      </div>
    </section>
    )
  }
}

export default withRouter(OtherUserShow);