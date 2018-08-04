import React, { Component } from 'react';
import axios from 'axios';

import LoginImg from "../LoginImg.js";


class Login extends Component {

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            user: null,
            signupFormVisible: false,
        };
    }


   

    render() {
        return (

        <div className="login-form" style={LoginImg}>
            <h3 style="padding-top: 5px;">Know your CRBN score.</h3>
            <h3>Reduce your CRBN score.</h3>
            <h3>Be a better person than your friends.</h3>

            {this.state.user ? (
                <br />
                // <div className="user">
                //     <span className="username">User: {this.state.user.username}</span>
                //     <button onClick={this.logout}>Log Out</button>
                // </div>
            ) : (
                <div className="user-form">

                    <button className="loginRegisterSwitch" onClick={this.showSignupForm} disabled={this.state.signupFormVisible}>Register</button>
                    <button className="loginRegisterSwitch" onClick={this.showLoginForm} disabled={!this.state.signupFormVisible}>Login</button>
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
                            <button className="appBtn" type="submit">Register</button><br />
                        </form>
                        <a href="/github/auth"><button className="gitHubButton" type="submit">GitHub</button></a>
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
                            <button className="appBtn" type="submit">Login</button>
                        </form>
                        <a href="/github/auth"><button className="gitHubButton" type="submit">GitHub</button></a>
                        </div>
                    )}
                </div>
            )
            }
        </div>
        );
    }

    showLoginForm = (event) => {
        this.setState({
            signupFormVisible: false,
        })
    }

    showSignupForm = (event) => {
        this.setState({
            signupFormVisible: true,
        })
    }

    register = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/auth/signup',
            data: {
                username: event.target.registerUsername.value,
                password: event.target.registerPassword.value,
            }
        })
            .then((res) => {
                this.showLoginForm();
                console.log(res);
            })
            .catch((res) => {
                console.log(res);
            });
    }

    login = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/auth/login',
            data: {
                username: event.target.username.value,
                password: event.target.password.value,
            }
        })
        .then((res) => {
         window.location.reload();
            this.setState({
                user: res.data.user,
                showSignupForm: false,
            })
            console.log(res);
        })
        .catch((res) => {
            console.log(res);
        });
    }

    logout = () => {
        axios({
            method: 'get',
            url: '/logout'
        })
        .then(() => {
            this.setState({
                user: null,
            })
        })
        .catch((res) => {
            console.log(res);
        });
    }

}

export default Login;
