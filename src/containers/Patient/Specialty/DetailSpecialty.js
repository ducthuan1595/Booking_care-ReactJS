import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import HomeHeader from "../../../containers/HomePage/Header/HomeHeader";
import HomeFooter from "../../../containers/HomePage/Header/HomeFooter";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
      isToggleDetailDoctor: true,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailSpecialtyById({
        id: id,
        location: "All",
      });
      let resProvince = await getAllCodeService("PROVINCE");
      if (
        res &&
        res.info.errCode === 0 &&
        resProvince &&
        res.info.errCode === 0
      ) {
        let data = res.info.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            keyMap: "All",
            type: "PROVINCE",
            value_vi: "Toàn quốc",
            value_en: "All",
            createAt: null,
          });
        }
        this.setState({
          dataDetailSpecialty: res.info.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getInforDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
  }

  handleChangeSelectProvince = async (e) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = e.target.value;
      let res = await getDetailSpecialtyById({
        id: id,
        location: location,
      });
      if (res && res.info.errCode === 0) {
        let data = res.info.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailSpecialty: res.info.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };

  toggleDetailDoctor = (status) => {
    this.setState({
      isToggleDetailDoctor: status,
    });
  };
  render() {
    let {
      arrDoctorId,
      dataDetailSpecialty,
      listProvince,
      isToggleDetailDoctor,
    } = this.state;
    let { language } = this.props;
    console.log("check detail specialty state", typeof arrDoctorId);

    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div
          className={
            isToggleDetailDoctor === true
              ? "hidden-desc-specialty"
              : "description-specialty"
          }
        >
          {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
            <div
              dangerouslySetInnerHTML={{
                __html: dataDetailSpecialty.descHTML,
              }}
            ></div>
          )}
        </div>
        <div
          className="toggle-detail-doctor"
          onClick={() => this.toggleDetailDoctor(!isToggleDetailDoctor)}
        >
          {isToggleDetailDoctor === true ? (
            <FormattedMessage id="patient.detail-doctor.doctor-extra-info.show-more" />
          ) : (
            <FormattedMessage id="patient.detail-doctor.doctor-extra-info.hide-away" />
          )}
        </div>
        <div className="select-province-doctor">
          <select onChange={(e) => this.handleChangeSelectProvince(e)}>
            {listProvince &&
              listProvince.length > 0 &&
              listProvince.map((item, index) => {
                return (
                  <option key={index} value={item.keyMap}>
                    {language === LANGUAGES.VI ? item.value_vi : item.value_en}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="detail-specialty-content">
          {arrDoctorId &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="content-left">
                    <ProfileDoctor
                      doctorId={item}
                      isShowDescriptionDoctor={true}
                      isShowLinkProfileDoctor={true}
                      isShowPriceProfileDoctor={true}
                      // dataTime={dataTime}
                    />
                  </div>
                  <div className="content-right">
                    <DoctorSchedule doctorIdFromParent={item} />
                    <DoctorExtraInfo doctorIdFromParent={item} />
                  </div>
                </div>
              );
            })}
        </div>
        <HomeFooter />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
