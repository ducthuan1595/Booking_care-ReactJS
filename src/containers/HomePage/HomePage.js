import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./Header/HomeHeader";
import Speciality from "./Secsion/Speciality";
import PopulaFacility from "./Secsion/PopulaFacility";
import PopularDoctor from "./Secsion/PopularDoctor";
import HandBook from "./Secsion/HandBook";
import HomeAbout from "./Secsion/HomeAbout";
import HomeFooter from "./Header/HomeFooter";

class HomePage extends Component {
  render() {
    return (
      <>
        <div>
          <HomeHeader />
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
