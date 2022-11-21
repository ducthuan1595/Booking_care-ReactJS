import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeAbout.scss";
import { FormattedMessage } from "react-intl";

//react slick (arrow right or left)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomeAbout extends Component {
  render() {
    return (
      <div className="home-about">
        <div className="home-page-content">
          <div className="home-title">About our</div>
          <div className="home-lists">
            {/* <div className="video-our"> */}
            <iframe
              width="600"
              height="300"
              src="https://www.youtube.com/embed/RzhAS_GnJIc?list=RDRzhAS_GnJIc"
              title="Safe & Sound feat. The Civil Wars (The Hunger Games: Songs From District 12 And Beyond)"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* </div> */}
            <div className="about-our">
              <p>
                My name is THUAN, 27 old years. Current, I'm a developer, With
                my hard wishes wants discover and conquer this world...
              </p>
              <p>
                The song hits differently when youre a Hunger Games Fan. It
                makes you wanna read the whole thing
              </p>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeAbout);
