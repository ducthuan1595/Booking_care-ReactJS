import React, { Component } from "react";
import { connect } from "react-redux";
import "./PopulaFacility.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

//react slick (arrow right or left)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getAllClinic } from "../../../services/userService";

class PopulaFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.info.errCode === 0) {
      this.setState({
        dataClinics: res.info.data ? res.info.data : [],
      });
    }
  }

  handleDetailClinic = (clinic) => {
    if(this.props.history) {
      this.props.history.push(`detail-clinic/${clinic.id}`)
    }
  }

  render() {
    const { dataClinics } = this.state;

    console.log("check popularFaciliti state", this.state);

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
      <div id="clinic" className="home-popular-facility">
        <div className="home-page-content">
          <div className="home-title"><FormattedMessage id="home-header.health-facilities" /></div>
          <div className="home-lists">
            <Slider {...settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div className="image-items" key={index} onClick={()=>this.handleDetailClinic(item)}>
                      <div
                        className="image-item"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <p>{item.name}</p>
                    </div>
                  );
                })}

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PopulaFacility));
