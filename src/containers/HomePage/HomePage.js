import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./Header/HomeHeader";
import Speciality from "./Secsion/Speciality";

class HomePage extends Component {
  render() {
    return (
      <>
        <div>
          <HomeHeader />
          <Speciality />
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
