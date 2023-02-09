import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import HomeFooter from "../../HomePage/Header/HomeFooter";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import LikeAndShare from "../socialPlugin/LikeAndShare";
import Comment from "../socialPlugin/Comment";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    // console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<");
    if (this.props.match.params.id) {
      let id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  render() {
    // console.log("check state detail dcotro", this.state);
    //console.log(this.props.match.params.id);//get id doctor
    let { detailDoctor } = this.state;
    console.log("check detailDoctor", detailDoctor);
    let { language } = this.props;
    let nameEn = "",
      nameVi = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.value_vi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.value_en}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    let currentURL =
      +process.env.REACT_APP_IS_LOCALHOST === 1
        ? "https://www.facebook.com/Sao-Gi%E1%BB%9D-415356329307334"
        : window.location.href;

    console.log(currentURL);
    return (
      <>
        <div>
          <HomeHeader isShowBanner={false} />
          <div className="doctor-detail-container">
            <Link to="/home" className="link-title">
              {/* <div > */}
                <i className="fas fa-home"></i>/<p>Bác sĩ nổi bật</p>
              {/* </div> */}
            </Link>
            <div className="infor-doctor">
              <div
                className="image"
                style={{
                  backgroundImage: `url(${
                    detailDoctor.image ? detailDoctor.image : ""
                  })`,
                }}
              ></div>
              <div className="infor">
                <h3>{language === LANGUAGES.VI ? nameVi : nameEn}</h3>
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span className="infor-doctor">
                      {detailDoctor.Markdown.description}
                    </span>
                  )}
                <div className="like-and-share">
                  <LikeAndShare dataHref={currentURL} />
                </div>
              </div>
            </div>
            <div className="schedule-doctor">
              <div className="schedule">
                <div className="content-left">
                  <DoctorSchedule
                    doctorIdFromParent={this.state.currentDoctorId}
                  />
                </div>
                <div className="content-right">
                  <DoctorExtraInfo
                    doctorIdFromParent={this.state.currentDoctorId}
                  />
                </div>
              </div>
            </div>
            <div className="detail-doctor">
              <div className="title-name">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.contentHTML && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: detailDoctor.Markdown.contentHTML,
                      }}
                    ></div>
                  )}
              </div>
            </div>
          </div>
          <div className="comment">
            <Comment dataHref={currentURL} width={"100%"} />
          </div>
          <HomeFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
