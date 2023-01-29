import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorService } from "../../../services/userService";
import NumberFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInfoDoctor = async (id) => {
    let result = "";
    if (id) {
      let res = await getProfileDoctorService(id);
      if (res && res.info.errCode === 0) {
        result = res.info;
      }
      // console.log(">>>check data info2", result);
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      
    }
  }

  //capital first letter
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime !== !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.value_vi
          : dataTime.timeTypeData.value_en;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      date = this.capitalizeFirstLetter(date);
      return (
        <>
          <div>
            {time} . {date}
          </div>
          <div>
            <FormattedMessage id="patient.booking-schedule.booking-free" />
          </div>
        </>
      );
    }
  };

  render() {
    let { dataProfile } = this.state;
    let {
      language,
      doctorId,
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkProfileDoctor,
      isShowPriceProfileDoctor,
    } = this.props;
    // console.log("check doctorId", doctorId);

    let nameEn = "",
      nameVi = "";
    if (dataProfile.data && dataProfile.data.positionData) {
      nameVi = `${dataProfile.data.positionData.value_vi}, ${dataProfile.data.lastName} ${dataProfile.data.firstName}`;
      nameEn = `${dataProfile.data.positionData.value_en}, ${dataProfile.data.firstName} ${dataProfile.data.lastName}`;
    }
    let priceData;
    let priceVi = "",
      priceEn = "";
    if (
      dataProfile &&
      dataProfile.data &&
      dataProfile.data.Doctor_info &&
      dataProfile.data.Doctor_info.priceTypeData
    ) {
      priceData = dataProfile.data.Doctor_info.priceTypeData;
    }
    if (priceData) {
      priceEn = priceData.value_en;
      priceVi = priceData.value_vi;
    }
    return (
      <>
        <div className="profile-doctor-container">
          <div className="profile-doctor">
            <div
              className="image"
              style={{
                backgroundImage: `url(${
                  dataProfile.data ? dataProfile.data.image : ""
                })`,
              }}
            ></div>
            <div className="info">
              <h5>{language === LANGUAGES.VI ? nameVi : nameEn}</h5>
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile.data &&
                    dataProfile.data.Markdown &&
                    dataProfile.data.Markdown.description && (
                      <span className="info-detail">
                        {dataProfile.data.Markdown.description}
                      </span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
          {isShowLinkProfileDoctor === true && (
            <div className="detail-doctor">
              <Link to={`/detail-doctor/${doctorId}`}>
                <FormattedMessage id="patient.detail-doctor.doctor-extra-info.show-more" />
              </Link>
            </div>
          )}
          {!isShowPriceProfileDoctor&& (
            <div className="price-exam">
              <FormattedMessage id="patient.detail-doctor.doctor-extra-info.price-exam" />
              :{" "}
              <span>
                {language === LANGUAGES.VI ? (
                  <NumberFormat
                    value={priceVi}
                    thousandSeparator={true}
                    displayType={"text"}
                    suffix={"VND"}
                  />
                ) : (
                  <NumberFormat
                    value={priceEn}
                    thousandSeparator={true}
                    displayType={"text"}
                    prefix={"$"}
                  />
                )}
              </span>
            </div>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
