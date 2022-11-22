import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl"; //format language
import { LANGUAGES } from "../../../utils"; //type language

import { changeLanguageApp } from "../../../store/actions/appActions"; //redux language

class HomeHeader extends Component {
  handleLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let language = this.props.language;
    console.log("check userInfo", this.props.userInfo);
    return (
      <>
        <div className="home-header-container">
          <div className="home-header">
            <div className="header-left">
              <i className="fas fa-bars"></i>
              <a href="#">
                <div className="header-image"></div>
              </a>
            </div>
            <div className="header-center">
              <div className="header-item">
                <div>
                  <FormattedMessage id="home-header.speciality" />
                </div>
                <p>
                  <FormattedMessage id="home-header.search-doctor" />
                </p>
              </div>
              <div className="header-item">
                <div>
                  <FormattedMessage id="home-header.health-facilities" />
                </div>
                <p>
                  <FormattedMessage id="home-header.choose-clinic" />
                </p>
              </div>
              <div className="header-item">
                <div>
                  <FormattedMessage id="home-header.doctor" />
                </div>
                <p>
                  <FormattedMessage id="home-header.good-doctor" />
                </p>
              </div>
              <div className="header-item">
                <div>
                  <FormattedMessage id="home-header.package-check" />
                </div>
                <p>
                  <FormattedMessage id="home-header.general-health-check" />
                </p>
              </div>
            </div>
            <div className="header-right">
              <div className="header-tranlate">
                <span
                  className={
                    language === LANGUAGES.VI
                      ? "language_vi active"
                      : "language_vi"
                  }
                  onClick={() => this.handleLanguage(LANGUAGES.VI)}
                >
                  VI
                </span>
                /
                <span
                  className={
                    language === LANGUAGES.EN
                      ? "language_en active"
                      : "language_en"
                  }
                  onClick={() => this.handleLanguage(LANGUAGES.EN)}
                >
                  EN
                </span>
              </div>
              <div className="header-icon-help">
                <i className="fas fa-info-circle"></i>
              </div>
              <a href="#">
                <div>
                  <FormattedMessage id="home-header.help" />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="home-header-body">
          <div className="home-title">
            <div>
              <FormattedMessage id="banner.title1" />
            </div>
            <p>
              <FormattedMessage id="banner.title2" />
            </p>
          </div>
          <div className="home-search">
            <i className="fas fa-search"></i>
            {/* change placelhoder language */}
            <FormattedMessage id="banner.find-doctor">
              {(msg) => <input placeholder={msg} type="text" />}
            </FormattedMessage>
          </div>
          <div className="home-lists">
            <div className="list-item">
              <i className="fas fa-hospital-alt"></i>
              <div>
                <FormattedMessage id="banner.specialist-examination" />
              </div>
            </div>
            <div className="list-item">
              <i className="fas fa-ambulance"></i>
              <div>
                <FormattedMessage id="banner.remote-examination" />
              </div>
            </div>
            <div className="list-item">
              <i className="fas fa-stethoscope"></i>
              <div>
                <FormattedMessage id="banner.general-examination" />
              </div>
            </div>
            <div className="list-item">
              <i className="fas fa-flask"></i>
              <div>
                <FormattedMessage id="banner.medical-test" />
              </div>
            </div>
            <div className="list-item">
              <i className="fas fa-code-branch"></i>
              <div>
                <FormattedMessage id="banner.mental-health" />
              </div>
            </div>
            <div className="list-item">
              <i className="fas fa-diagnoses"></i>
              <div>
                <FormattedMessage id="banner.dental-examination" />
              </div>
            </div>
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
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader); //connection redux and react
