import React, { Component } from "react";
import { connect } from "react-redux";
import "./PopulaFacility.scss";
import { FormattedMessage } from "react-intl";

//react slick (arrow right or left)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class PopulaFacility extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 8000,
      cssEase: "linear",
      pauseOnHover: true,
    };
    return (
      <div className="home-popular-facility">
        <div className="home-page-content">
          <div className="home-title">Cơ sở y tế phổ biến</div>
          <div className="home-lists">
            <Slider {...settings}>
              <div className="image-items">
                <div className="image-item"></div>
                <p>Bệnh viện nhà tao</p>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <p>Bệnh viện nhà tao</p>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <p>Bệnh viện nhà tao</p>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <p>Bệnh viện nhà tao</p>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <p>Bệnh viện nhà tao</p>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <p>Bệnh viện nhà tao</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(PopulaFacility);
