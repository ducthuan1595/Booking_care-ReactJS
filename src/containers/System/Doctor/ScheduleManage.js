import React, { Component } from "react";
import { connect } from "react-redux";

class ScheduleManage extends Component {
  render() {
    return (
      <>
        <div>schedule manage</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
