import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from '../modal/modal';
import storage from "local-storage-fallback";

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      ready: false,
      results: null
    }
    this.toHome = this.toHome.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.updateField = this.updateField.bind(this);
    this.doesMatch = this.doesMatch.bind(this);
    this.escapeResults = this.escapeResults.bind(this);
    this.toUser = this.toUser.bind(this);
  }

  startSearch() {
    if(!this.state.ready){
      this.props.fetchUsers().then(() => this.setState({ ready: true }));
    }
    const resultsUL = document.getElementById('search-results');
    const escape = document.getElementById('escape');
    resultsUL.style.display = "block";
    escape.style.display = "block";
    this.timeout = setTimeout(() => {
      escape.classList.add("show-button");
      resultsUL.classList.add("show-results");
    }, 100);
  }

  toHome() {
    this.props.history.push('/');
  }

  componentDidMount() {
    this.props.fetchUsers();
    
  }

  doesMatch(user, search){
    for(let i = 0; i < user.username.length; i++){
      let usernameSplit = user.username.slice(i, i + search.length).toLowerCase();
      let nameSplit = user.fullName.slice(i, i + search.length).toLowerCase();
      if (usernameSplit === search.toLowerCase() || nameSplit === search.toLowerCase()){
        return true;
      }
    }
    return false;
  }

  escapeResults() {
    document.getElementById("search-bar-field").disabled = true;

    const resultsUL = document.getElementById('search-results');
    const escape = document.getElementById('escape');
    resultsUL.classList.remove("show-results");
    escape.classList.remove("show-button");
    this.timeout = setTimeout(() => {
      resultsUL.style.display = "none";
      escape.style.display = "none";
      document.getElementById("search-bar-field").disabled = false;
    }, 300);
    return this.setState({ search: "" });
  }

  toUser(userId){
    this.escapeResults();
    this.props.history.push(`/users/${userId}/profile`);
  }

  updateField(field){ 
    return e => {
      let fieldValue = e.target.value;
      let searchResults = this.props.users.map(user => {
        const src = user.imageUrl;
        if(this.doesMatch(user, fieldValue)){
          return <li key={user.id} onClick={() => this.toUser(user.id)}>
            <img src={src} alt=""/>
            <div>
              <p>{user.username}</p>
              <p>{user.fullName}</p>
            </div>
          </li>
        }
      });
      if(searchResults.length === 0){
        searchResults = <li>No Matches</li>
      }
      this.setState({ 
        [field]: fieldValue,
        results: searchResults
      });
    }
  }

  toggleTheme(e) {
    let currTheme = document.documentElement.attributes[0].value;
    if (currTheme === "light") {
      document.documentElement.setAttribute('data-theme', "");
      document.documentElement.setAttribute('data-theme', "dark");
      storage.setItem("userTheme", JSON.stringify({ userTheme: "dark" }));
    } else {
      document.documentElement.setAttribute('data-theme', "");
      document.documentElement.setAttribute('data-theme', "light");
      storage.setItem("userTheme", JSON.stringify({ userTheme: "light" }));
    }
  }

  render () {  
    document.onkeydown = function (event) {
      event = event || window.event;
      if (event.keyCode == 27) {
        this.escapeResults();
      }
    }.bind(this); 
    return <nav className="nav-bar">
      <ul className="nav-list">
        <li id="logo-icons" onClick={this.toHome}><i className="fas fa-satellite"></i><h1 className='astrogram-nav'>Astrogram</h1></li>
        <li id="search-desktop">
          <div className="nav-search">
            <label htmlFor="search-bar-field" id="escape" onClick={this.escapeResults}>x</label>
            <input
              id="search-bar-field"
              type="text"
              placeholder="search users"
              onClick={this.startSearch}
              onChange={this.updateField("search")}
              value={this.state.search}
            />
            <ul id="search-results">
              {this.state.results ? this.state.results : <i id="loading-search-logo" className="fab fa-instagram"></i>}
            </ul>
          </div>
        </li>
        <li id="post-icon" onClick={() => this.props.openModal('newPost')}><i className="fas fa-camera-retro"></i></li>
        <li id="explore-icon"><Link to="/explore" className="far fa-compass"></Link></li>
        <li id="theme-icon"><i className="fas fa-adjust" onClick={this.toggleTheme}></i></li>
        <li id="profile-icon"><Link to={`/users/${this.props.currentUser.id}/profile`} className="fas fa-user-astronaut"></Link></li>
        <li id="search-icon"><i class="fas fa-search"></i></li>
      </ul>
      <Modal />
    </nav>
  }
}

export default withRouter(LoggedIn);