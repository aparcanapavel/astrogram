import React from 'react';
import { withRouter } from 'react-router-dom';

class ExplorePage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loading: true
    }
    this.toPicture = this.toPicture.bind(this)
  }

  componentDidMount() {
    this.props.fetchUsers()
    .then(() => this.props.fetchImages())
    .then(() => this.setState({ loading: false }));
  }

  toPicture(imageId){
    this.props.history.push(`/feed/${imageId}`);
  }

  render() {
    if (this.state.loading) {
      return <i id="loading-logo" className="fab fa-instagram"></i>
    }

    const { posts } = this.props;

    posts.reverse();

    let ulKey = 1;
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
        ulKey++;
        row = [];
      }
    }
    //need to find a way to put unique keys per ul outside the loop
    if (stacks.length === 0) {
      stacks.push(<ul key={ulKey + 2} className="posts-stack">
        {row}
      </ul>)
    } else if (row.length > 0) {
      stacks.push(<ul key={ulKey + 2} className="posts-stack">
        {row}
      </ul>)
    }
    

    return <section className="explore-container">
      <h3>Explore</h3>
      <div className="stacks-container">
        {stacks}
      </div>
    </section>
  }
}

export default withRouter(ExplorePage);