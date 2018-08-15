import React, { Component } from "react";
import axios from "axios";
import "../Login.css";
import LoginImg from "../LoginImg.js";
import LoginImg2 from "../LoginImg2.js";
import Zoom from "react-reveal/Zoom";
import { tada } from "react-animations";
import { ScrollTo } from "react-scroll-to";
import ReallySmoothScroll from "really-smooth-scroll";
import FlexView from "react-flexview";

ReallySmoothScroll.shim();

class Login extends Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      user: null,
      signupFormVisible: false
    };
  }

  render() {
    return (
      <div>
        <div className="login-form" style={LoginImg}>
          <Zoom>
            <div className="loginDescription">
              <h4>Track your annual carbon emmission output.</h4>
              <h4>
                Share your score / Improve your output / Shame your friends
              </h4>
            </div>
          </Zoom>

          {this.state.user ? (
            <br />
          ) : (
            // <div className="user">
            //     <span className="username">User: {this.state.user.username}</span>
            //     <button onClick={this.logout}>Log Out</button>
            // </div>
            <div className="user-form">
              <button
                className="loginRegisterSwitch"
                onClick={this.showSignupForm}
                disabled={this.state.signupFormVisible}
              >
                Register
              </button>
              <button
                className="loginRegisterSwitch"
                onClick={this.showLoginForm}
                disabled={!this.state.signupFormVisible}
              >
                Login
              </button>
              {this.state.signupFormVisible ? (
                <div>
                  <form id="registerForm" onSubmit={this.register}>
                    <h2>Register</h2>
                    <div className="form-field">
                      <label htmlFor="registerUsername">Username:</label>
                      <input name="registerUsername" type="text" required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="registerPassword">Password:</label>
                      <input name="registerPassword" type="password" required />
                    </div>
                    <button className="appBtn" type="submit">
                      Register
                    </button>
                    <br />
                  </form>
                  <a href="/github/auth">
                    <button className="gitHubButton" type="submit">
                      GitHub
                    </button>
                  </a>
                </div>
              ) : (
                <div>
                  <form id="loginForm" onSubmit={this.login}>
                    <h2>Login</h2>
                    <div className="form-field">
                      <label htmlFor="username">Username:</label>
                      <input name="username" type="text" required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="password">Password:</label>
                      <input name="password" type="password" required />
                    </div>
                    <button className="appBtn" type="submit">
                      Login
                    </button>
                  </form>
                  <a href="/github/auth">
                    <button className="gitHubButton" type="submit">
                      GitHub
                    </button>
                  </a>
                </div>
              )}
              <ScrollTo>
                {scroll => (
                  <a onClick={() => scroll(0, 2000)}>
                    <p>
                      <h4 className="learnMore">Learn More</h4>
                      <i className="fas fa-chevron-circle-down fa-3x" />
                    </p>
                  </a>
                )}
              </ScrollTo>
            </div>
          )}
        </div>
        <div className="login-2nd" id="login-2nd" style={LoginImg2}>
          <FlexView height={200} hAlignContent="left" vAlignContent="center" marginLeft={75}>I'm vertically centered!</FlexView>
          <FlexView height={200} hAlignContent="center" vAlignContent="center" >I'm vertically centered!</FlexView>
          <FlexView height={200} hAlignContent="right" vAlignContent="center" marginRight={75}>I'm vertically centered!</FlexView>
        </div>      </div>
   );
  }

  showLoginForm = event => {
    this.setState({
      signupFormVisible: false
    });
  };

  showSignupForm = event => {
    this.setState({
      signupFormVisible: true
    });
  };

  register = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/auth/signup",
      data: {
        username: event.target.registerUsername.value,
        password: event.target.registerPassword.value
      }
    })
      .then(res => {
        this.showLoginForm();
        console.log(res);
      })
      .catch(res => {
        console.log(res);
      });
  };

  login = event => {
    event.preventDefault();
    axios({
      method: "post",
      url: "/auth/login",
      data: {
        username: event.target.username.value,
        password: event.target.password.value
      }
    })
      .then(res => {
        window.location.reload();
        this.setState({
          user: res.data.user,
          showSignupForm: false
        });
        console.log(res);
      })
      .catch(res => {
        console.log(res);
      });
  };

  logout = () => {
    axios({
      method: "get",
      url: "/logout"
    })
      .then(() => {
        this.setState({
          user: null
        });
      })
      .catch(res => {
        console.log(res);
      });
  };
}

export default Login;
