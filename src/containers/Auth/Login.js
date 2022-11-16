import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
// import { KeyCodeUtils, LanguageUtils } from "../utils";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isShowPassword: false
    }
  }

  handleOnChangeInput = (e)=> {
    this.setState({
      email: e.target.value,
    })
  }
  handleOnChangePassword = (e)=> {
    this.setState({
      password: e.target.value
    })
  }
  handleLogin = ()=> {
    console.log('email:', this.state.email)
    console.log('password:', this.state.password)
  }
  handleShowHidePassword = ()=> {//show hiden password
    this.setState({
      isShowPassword: !this.state.isShowPassword
    })
  }

  render() {
    return (
      <div className="login">
        <div className="container-login">
          <div className="container-content">
            <form>
              <h2 className="login-title">Login</h2>
              <div className="login-content">
                <div className="login-email">
                  <label>Email</label>
                  <input 
                  className="form-control"
                  value={this.state.email}
                  onChange={(e)=> this.handleOnChangeInput(e)}
                  placeholder="Enter your email" 
                  type="email"/>
                </div>
                <div className="login-password">
                  <label>Password</label>
                  <input 
                  className="form-control"
                  value={this.state.password}
                  onChange={(e)=> this.handleOnChangePassword(e)}
                  placeholder="Enter your password" 
                  type={this.state.isShowPassword ? 'text' : 'password'}
                  />
                  <span
                  onClick={()=> this.handleShowHidePassword()}>
                  <i className={this.state.isShowPassword ? "fas fa-eye eye-password" : 'far fa-eye-slash eye-password'}></i>
                  </span>
                </div>
                <div>
                <button onClick={()=> this.handleLogin()}>Login</button>
                </div>
                <div className="login-forget-password">
                  <p>Forget your password?</p>
                </div>
              </div>
              <div className="login-footer">
                <p>Or login with</p>
                <div className="login-social">
                  <div><i className="fab fa-google-plus social-google"></i></div>
                  <div><i className="fab fa-facebook social-facebook"></i></div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
