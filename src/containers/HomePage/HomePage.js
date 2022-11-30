import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./Header/HomeHeader";
import Speciality from "./Secsion/Speciality";
import PopulaFacility from "./Secsion/PopulaFacility";
import PopularDoctor from "./Secsion/PopularDoctor";
import HandBook from "./Secsion/HandBook";
import HomeAbout from "./Secsion/HomeAbout";
import HomeFooter from "./Header/HomeFooter";
import "./Header/HomeHeader.scss";
import "./HomePage.scss";

class HomePage extends Component {
  render() {
    return (
      <>
        <div className="home-page">
          <HomeHeader isShowBanner={true} />
          <Speciality />
          <PopulaFacility />
          <PopularDoctor />
          <HandBook />
          <HomeAbout />
          <HomeFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
