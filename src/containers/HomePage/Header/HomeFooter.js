import React, { Component } from "react";
import { connect } from "react-redux";
// import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

import { changeLanguageApp } from "../../../store/actions/appActions"; //redux language

class HomeFooter extends Component {
  handleLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let language = this.props.language;
    return (
      <>
        <div className="home-footer">
          <div className="footer-content">
            <i>
              &copy; Thuan Truong, <em>contact:</em>{" "}
            </i>
            <a href="https://facebook.com">
              <i className="fab fa-facebook-square facebook"></i>
            </a>
            <a href="https://youtube.com">
              <i className="fab fa-google-plus-square google"></i>
            </a>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter); //connection redux and react
