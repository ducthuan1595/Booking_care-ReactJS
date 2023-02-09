import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import HomeFooter from "../../HomePage/Header/HomeFooter";
import "./DetailClinic.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailClinicById,
  getAllCodeService,
} from "../../../services/userService";
import { LANGUAGES } from "../../../utils";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicById({
        id: id,
      });
      console.log('check res when mount', res)
      if (res && res.info.errCode === 0) {
        let data = res.info.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailClinic: res.info.data,
          arrDoctorId: arrDoctorId,
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

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;
    console.log("check detail clinic state", this.state);
    return (
      <div className="detail-clinic-container">
        <HomeHeader />
        <div className="detail-clinic-header">
          {dataDetailClinic && !_.isEmpty(dataDetailClinic)}
          <div>
            <div className="image-clinic"
            style={{
              backgroundImage: `url(${
                dataDetailClinic.image ? dataDetailClinic.image : ""
              })`,
            }}
            ></div>
            <div className="name-clinic">{dataDetailClinic.name}</div>
            <span className="address-clinic"><i className="icon-map fas fa-map-marker-alt"></i>{dataDetailClinic.address}</span>
          </div>
          <div className="desc-clinic"
            dangerouslySetInnerHTML={{
              __html: dataDetailClinic.descHTML,
            }}
          ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
