import React, { Component } from "react";
import { connect } from "react-redux";
import "./HandBook.scss";
import { FormattedMessage } from "react-intl";

//react slick (arrow right or left)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      // fade: true,
    };
    return (
      <div className="home-hand-book">
        <div className="home-page-content">
          <div className="home-title">Hand book</div>
          <div className="home-lists">
            <Slider {...settings}>
              <div className="image-items">
                <div className="image-item"></div>
                <span>
                  Review our new hospital is building addtion in the US on
                  August
                </span>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <span>
                  Review our new hospital is building addtion in the US on
                  August
                </span>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <span>
                  Review our new hospital is building addtion in the US on
                  August
                </span>
              </div>
              <div className="image-items">
                <div className="image-item"></div>
                <span>
                  Phó giao sư tiến sĩ, chuyên gia cao cấp, học viện hàm lân
                  Trương Đức Thuận
                </span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
