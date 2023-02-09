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
          <div className="home-title">
            <FormattedMessage id="home-header.about-us" />
          </div>
          <div className="home-lists">
            {/* <div className="video-our"> */}
            <iframe
              width="600"
              height="300"
              src="https://www.youtube.com/embed/tgbNymZ7vqY"
              title="The Most Expensive Healthcare In The World"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* </div> */}
            <div className="about-our">
              <p>
                If you get sick or injured in any of these places, don't worry,
                you'll be in good hands... hands that are deep in your pockets
                that is! Here's the countries that charge the most for medical
                bills!
              </p>
              <p>
                What if hospitals were designed and built to promote wellness
                and not just to fix and cure human beings? Architect Jerry Ong
                brought this vision into reality in his work Little did
                architect Jerry Ong expect when he first undertook the design of
                Khoo Teck Puat hospital in Singapore that he would be pioneering
                brand new approaches, ideas and innovations in the architecture
                of wellness.
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
