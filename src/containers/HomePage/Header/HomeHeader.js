import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
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
                <div>Chuyên khoa</div>
                <p>Tìm bác sĩ chuyên khoa</p>
              </div>
              <div className="header-item">
                <div>Chuyên khoa</div>
                <p>Tìm bác sĩ chuyên khoa</p>
              </div>
              <div className="header-item">
                <div>Chuyên khoa</div>
                <p>Tìm bác sĩ chuyên khoa</p>
              </div>
              <div className="header-item">
                <div>Chuyên khoa</div>
                <p>Tìm bác sĩ chuyên khoa</p>
              </div>
            </div>
            <div className="header-right">
              <div className="header-tranlate">
                <span className="active">VI</span>/<span className="">EN</span>
              </div>
              <div className="header-icon-help">
                <i className="fas fa-info-circle"></i>
              </div>
              <a href="#">
                <div>Help</div>
              </a>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
