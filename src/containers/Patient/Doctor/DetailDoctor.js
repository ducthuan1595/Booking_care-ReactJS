import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  async componentDidMount() {
    if (this.props.match.params.id) {
      let id = this.props.match.params.id;
      let res = await getDetailInforDoctor(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  render() {
    console.log("check state detail dcotro", this.state);
    //console.log(this.props.match.params.id);//get id doctor
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameEn = "",
      nameVi = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.value_vi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.value_en}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <>
        <div>
          <HomeHeader isShowBanner={false} />
          <div className="doctor-detail-container">
            <a className="link-title">
              <i class="fas fa-home"></i>/<p>Bác sĩ nổi bật</p>
            </a>
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
              </div>
            </div>
            <div className="schedule-doctor">
              <div className="schedule">
                <h5>Lich kham</h5>
                <div className="hours">
                  <div className="hour">07:00 - 08:00</div>
                  <div className="hour">07:00 - 08:00</div>
                  <div className="hour">07:00 - 08:00</div>
                  <div className="hour">07:00 - 08:00</div>
                  <div className="hour">07:00 - 08:00</div>
                  <div className="hour">07:00 - 08:00</div>
                  <div className="hour">07:00 - 08:00</div>
                  <div className="hour">07:00 - 08:00</div>
                </div>
              </div>
              <div className="detail">
                <div className="location">
                  <h6>benh vien hop luc</h6>
                  <p>So 14 song ly - tieng trang</p>
                </div>
                <div className="price">Gia kham: $10</div>
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
            <div className="comment-doctor">
              <h3>Fellback of patients</h3>
              <div className="patients">
                <div className="patient">
                  <div className="infor-patient">
                    <div>bui hy thoj</div>
                    <i>da kham 01/05/1995</i>
                  </div>
                  <p>exaclly</p>
                </div>
                <div className="patient">
                  <div className="infor-patient">
                    <div>bui hy thoj</div>
                    <i>da kham 01/05/1995</i>
                  </div>
                  <p>exaclly</p>
                </div>
                <div className="patient">
                  <div className="infor-patient">
                    <div>bui hy thoj</div>
                    <i>da kham 01/05/1995</i>
                  </div>
                  <p>exaclly</p>
                </div>
              </div>
            </div>
          </div>
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
