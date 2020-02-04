import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import Modal from '../modal/modal';

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: '',
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  handleSubmit() {
    return this.props.signup(this.state);
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  loginDemoUser (e) {
    if (e.altKey) {
      return this.props.openModal('loginOptions');
    }
    const demoUser = Object.assign({}, {
      username: 'demoUser',
      password: 'password'
    });
    this.props.login(demoUser);
  }

  componentDidMount() {
    if (this.props.location.pathname === '/signup'){
      const signupContainer = document.getElementById('signup');
      $(signupContainer).addClass('session-form-container');
    } 
  }

  componentWillUnmount() {
    const signupContainer = document.getElementById('signup');
    $(signupContainer).removeClass('session-form-container');
  }

  render() {

    const errList = this.props.errors.map((err, i) => <li key={i}>{err}</li>);
    
    return (
      <section id='signup' className="signup-form-container">
        <div className='signup-form'>
          <h1 className='astrogram-title'>Astrogram</h1>
          <p>Sign up to see photos and videos from your friends.</p>
          <button onClick={this.loginDemoUser}>Log In as Demo User</button>

          <div className="orSignup">
            <div className='orLine'></div>
            <div>OR</div>
            <div className='orLine'></div>
          </div>
          
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.full_name}
              onChange={this.updateField('full_name')}
              placeholder='Full Name'
            />
            <br />

            <input
              type="text"
              value={this.state.username}
              onChange={this.updateField('username')}
              placeholder='Username'
            />
            <br />

            <input
              type="password"
              value={this.state.password}
              onChange={this.updateField('password')}
              placeholder='Password'
            />
            <br />
            <button>Sign up</button>

            <ul className="formErrors">{errList}</ul>
          </form>
        </div>
        <div className='optional-session-form'>Have an account? <Link to='/login'>Log in</Link></div>
        <Modal />
      </section>
    );
  }
}