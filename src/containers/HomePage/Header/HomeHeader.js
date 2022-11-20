import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";

import { changeLanguageApp } from "../../../store/actions/appActions"; //redux language

class HomeHeader extends Component {
  handleLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  render() {
    let language = this.props.language;
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
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Tìm bác sĩ" />
          </div>
          <div className="home-lists">
            <div className="list-item">
              <i class="fas fa-hospital-alt"></i>
              <div>Khám chuyên khoa</div>
            </div>
            <div className="list-item">
              <i class="fas fa-ambulance"></i>
              <div>Khám từ xa</div>
            </div>
            <div className="list-item">
              <i class="fas fa-stethoscope"></i>
              <div>Khám tổng quát</div>
            </div>
            <div className="list-item">
              <i class="fas fa-flask"></i>
              <div>Xét y học</div>
            </div>
            <div className="list-item">
              <i class="fas fa-code-branch"></i>
              <div>Sức khỏe tinh thần</div>
            </div>
            <div className="list-item">
              <i class="fas fa-diagnoses"></i>
              <div>Khám nha khoa</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader); //connection redux and react
