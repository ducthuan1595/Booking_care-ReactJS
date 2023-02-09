import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl"; //format language
import { LANGUAGES } from "../../../utils"; //type language
import * as actions from "../../../store/actions"; //actions of redux
import { getTopDoctorHomeService } from "../../../services/userService";

import { changeLanguageApp } from "../../../store/actions/appActions"; //redux language

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      inputValue: "",
      isShowAllDoctors: false,
    };
  }

  async componentDidMount() {
    this.getAllDoctor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.inputValue !== this.state.inputValue) {
      let remainingDoctor = this.state.listDoctors.filter((item) => {
        if (item.label.toLowerCase().includes(this.state.inputValue)) {
          return item;
        }
      });
      this.setState({
        listDoctors: remainingDoctor,
      });
    }
  }

  getAllDoctor = async () => {
    let res = await getTopDoctorHomeService("");
    let dataSelect = this.buildDataInputSelect(res.data);
    this.setState({
      listDoctors: dataSelect,
    });
  };

  buildDataInputSelect = (input) => {
    let result = [];
    let { language } = this.props;
    if (input && input.length > 0) {
      input.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        let positionDataVi = `${item.positionData.value_vi}`;
        let positionDataEn = `${item.positionData.value_en}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.role =
          language === LANGUAGES.VI ? positionDataVi : positionDataEn;
        // object.value = item.id;
        result.push(object);
      });
      return result;
    }
  };

  handleLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  handleInputSearchDoctor = (e) => {
    let inputValue = e.target.value;
    let remainingDoctor = this.state.listDoctors.filter((item) => {
      if (item.label.toLowerCase().includes(inputValue)) {
        return item;
      }
    });
    // console.log('name doctor', remainingDoctor)
      this.setState({
        listDoctors: remainingDoctor,
        inputValue: inputValue,
        isShowAllDoctors: true,
      });
  };

  render() {
    let { language, allDoctors } = this.props.language;
    let { listDoctors, isShowAllDoctors, inputValue } = this.state;
    // console.log("check state", this.state);
    return (
      <>
        <div className="home-header-container">
          <div className="home-header">
            <div className="header-left">
              <i className="fas fa-bars"></i>
              <Link to="/home">
                <div className="header-image"></div>
              </Link>
              {/* <a href="/">
                <div className="header-image"></div>
              </a> */}
            </div>
            <div className="header-center">
              <a href="#specialty" className="header-item">
                <div>
                  <FormattedMessage id="home-header.speciality" />
                </div>
                <p>
                  <FormattedMessage id="home-header.search-doctor" />
                </p>
              </a>
              <a href="#clinic" className="header-item">
                <div>
                  <FormattedMessage id="home-header.health-facilities" />
                </div>
                <p>
                  <FormattedMessage id="home-header.choose-clinic" />
                </p>
              </a>
              <a href="#doctor" className="header-item">
                <div>
                  <FormattedMessage id="home-header.doctor" />
                </div>
                <p>
                  <FormattedMessage id="home-header.good-doctor" />
                </p>
              </a>
              <a href="#handbook" className="header-item">
                <div>
                  <FormattedMessage id="home-header.handbook" />
                </div>
                <p>
                  <FormattedMessage id="home-header.info-about-health" />
                </p>
              </a>
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
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="home-title">
              <div>
                <FormattedMessage id="banner.title1" />
              </div>
              <p>
                <FormattedMessage id="banner.title2" />
              </p>
            </div>
            <div id="search-modal">
            <div className="home-search">
              <i className="fas fa-search"></i>
              {/* change placelhoder language */}
              <FormattedMessage id="banner.find-doctor">
                {(msg) => (
                  <input
                    placeholder={msg}
                    type="text"
                    value={inputValue}
                    onInput={(e) => this.handleInputSearchDoctor(e)}
                  />
                )}
              </FormattedMessage>
            </div>
            <ul className="home-search-modal">
              {listDoctors &&
                isShowAllDoctors === true &&
                listDoctors.map((item, index) => {
                  return (
                    <li key={index}>
                      {item.role} {item.label}
                    </li>
                  );
                })}
            </ul>
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
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
    allDoctors: state.admin.allDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctors()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader); //connection redux and react
