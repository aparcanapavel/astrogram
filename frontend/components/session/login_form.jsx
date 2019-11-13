import React from 'react';
import { Redirect, Link } from 'react-router-dom';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  handleSubmit() {
    return this.props.login(this.state);
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  loginDemoUser() {
    const demoUser = Object.assign({}, {
      username: 'demoUser',
      password: 'password'
    });
    console.log(demoUser); //I want to see what the demo user variable
    this.props.login(demoUser);
  }

  render() {
    const errList = this.props.errors.map((err, i) => <li key={i}>{err}</li>);
    
    return (
    <section className="login-form-container">
      <div className='login-form'>
        <h1 className='astrogram-title'>Astrogram</h1>
        <form onSubmit={this.handleSubmit}>
          <input 
          type="text"
          value={this.state.username}
          onChange={this.updateField('username')}
          placeholder='Username'
          />
          <br/>

          <input
            type="password"
            value={this.state.password}
            onChange={this.updateField('password')}
            placeholder='Password'
          />
          <br />
          <button>Log In</button>

          <ul className="formErrors">{errList}</ul>
        </form>

        <div onClick={this.loginDemoUser}>Log In as Demo User</div>
      </div>

      <div className='optional-session-form'>Don't have an account? <Link to='/signup'>Sign un</Link></div>
    </section>
    );
  }
}