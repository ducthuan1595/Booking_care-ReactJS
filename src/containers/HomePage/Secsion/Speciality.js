import React, { Component } from "react";
import { connect } from "react-redux";
import "./Speciality.scss";
import { FormattedMessage } from "react-intl";

//react slick (arrow right or left)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomeHeader extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };
    return (
      <div className="home-speciality">
        <div className="home-page-speciality">
          <div className="home-speciality-title">Chuyên gia phổ biến</div>
          <div className="home-speciality-lists">
            <Slider {...settings}>
              <div className="speciality-image">
                <div className="image-item"></div>
                <p>Co xuong khop</p>
              </div>
              <div className="speciality-image">
                <div className="image-item"></div>
                <p>Co xuong khop</p>
              </div>
              <div className="speciality-image">
                <div className="image-item"></div>
                <p>Co xuong khop</p>
              </div>
              <div className="speciality-image">
                <div className="image-item"></div>
                <p>Co xuong khop</p>
              </div>
              <div className="speciality-image">
                <div className="image-item"></div>
                <p>Co xuong khop</p>
              </div>
              <div className="speciality-image">
                <div className="image-item"></div>
                <p>Co xuong khop</p>
              </div>
            </Slider>
          </div>
        </div>
      </div>
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
