import React, { Component } from "react";
import { connect } from "react-redux";
import "./Speciality.scss";
import { FormattedMessage } from "react-intl";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";

//react slick (arrow right or left)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Speciality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    // console.log("<<check specialty res: ", res);
    if (res && res.info.errCode === 0) {
      this.setState({
        dataSpecialty: res.info.data ? res.info.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`detail-specialty/${item.id}`);
    }
  };

  render() {
    let { dataSpecialty } = this.state;
    // console.log("... data specialty", dataSpecialty);
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 9000,
      cssEase: "linear",
      pauseOnHover: true,
    };
    return (
      <div className="home-speciality">
        <div className="home-page-speciality">
          <div id="specialty" className="home-speciality-title"><FormattedMessage id="home-header.speciality" /></div>
          <div className="home-speciality-lists">
            <Slider {...settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="speciality-image"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div
                        className="image-item"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Speciality)
);
