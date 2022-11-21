import React, { Component } from "react";
import { connect } from "react-redux";
import "./PopularDoctor.scss";
import { FormattedMessage } from "react-intl";

//react slick (arrow right or left)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class PopularDoctor extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      cssEase: "linear",
    };
    return (
      <div className="home-popular-doctor">
        <div className="home-page-content">
          <div className="home-title">Bác sĩ nổi bật tuần qua</div>
          <div className="home-lists">
            <Slider {...settings}>
              <div className="image-items">
                <div className="image-item"></div>
                <div>Phó giao sư tiến sĩ, Trương Đức Thuận</div>
                <p>Bệnh viện nhà tao</p>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <div>Phó giao sư tiến sĩ, Trương Đức Thuận</div>
                <p>Bệnh viện nhà tao</p>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <div>Phó giao sư tiến sĩ, Trương Đức Thuận</div>
                <p>Bệnh viện nhà tao</p>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <div>
                  Phó giao sư tiến sĩ, chuyên gia cao cấp, học viện hàm lân
                  Trương Đức Thuận
                </div>
                <p>Bệnh viện nhà tao</p>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <div>Phó giao sư tiến sĩ, Trương Đức Thuận</div>
                <p>Bệnh viện nhà tao</p>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <div>Phó giao sư tiến sĩ, Trương Đức Thuận</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PopularDoctor);
