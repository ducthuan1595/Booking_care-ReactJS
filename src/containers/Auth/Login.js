import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { handleLoginApi } from "../../services/userService"; //get api from backend
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeInput = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginApi(this.state.email, this.state.password); //get data from nodejs
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user); //use redux
      }
      console.log(data);
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassword = () => {
    //show hiden password
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  render() {
    console.log(this.state.errMessage);
    return (
      <div className="login">
        <div className="container-login">
          <div className="container-content">
            {/* <form> */}
            <h2 className="login-title">Login</h2>
            <div className="login-content">
              <div className="login-email">
                <label>Email</label>
                <input
                  className="form-control"
                  value={this.state.email}
                  onChange={(e) => this.handleOnChangeInput(e)}
                  placeholder="Enter your email"
                  type="email"
                />
              </div>
              <div className="login-password">
                <label>Password</label>
                <input
                  className="form-control"
                  value={this.state.password}
                  onChange={(e) => this.handleOnChangePassword(e)}
                  placeholder="Enter your password"
                  type={this.state.isShowPassword ? "text" : "password"}
                />
                <span onClick={() => this.handleShowHidePassword()}>
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye eye-password"
                        : "far fa-eye-slash eye-password"
                    }
                  ></i>
                </span>
              </div>
              <div className="col-12 error-message">
                {this.state.errMessage}
              </div>
              <div>
                <button onClick={() => this.handleLogin()}>Login</button>
              </div>
              <div className="login-forget-password">
                <p>Forget your password?</p>
              </div>
            </div>
            <div className="login-footer">
              <p>Or login with</p>
              <div className="login-social">
                <div>
                  <i className="fab fa-google-plus social-google"></i>
                </div>
                <div>
                  <i className="fab fa-facebook social-facebook"></i>
                </div>
              </div>
            </div>
            {/* </form> */}
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
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)), //save data in redux
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
