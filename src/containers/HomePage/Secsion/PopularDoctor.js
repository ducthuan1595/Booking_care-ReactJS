import React, { Component } from "react";
import { connect } from "react-redux";
import "./PopularDoctor.scss";
import { FormattedMessage } from "react-intl";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

//react slick (arrow right or left)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class PopularDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshop) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors(); //ham accept actions dk dua vao in redux
  }

  handleViewDetailDoctor = (doctor) => {
    console.log("check view detail doctor", doctor);
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };

  render() {
    // console.log("check top doctor", this.props);
    let allDoctors = this.state.arrDoctors;
    let { language } = this.props;
    // console.log("<<check all doctor", allDoctors);
    // allDoctors = allDoctors.concat(allDoctors).concat(allDoctors);
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      autoplaySpeed: 7000,
      pauseOnHover: true,
      cssEase: "linear",
    };
    return (
      <div id="doctor" className="home-popular-doctor">
        <div className="home-page-content">
          <div className="home-title">
            <FormattedMessage id="homepage.outstanding-writter" />
          </div>
          <div className="home-lists">
            <Slider {...settings}>
              {allDoctors &&
                allDoctors.length > 0 &&
                allDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.value_vi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.value_en}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="image-items"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div
                        className="image-item"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      ></div>
                      <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
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
    topDoctorRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PopularDoctor)
);
