import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
// import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDateService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
// import { Form } from "reactstrap";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;

    // console.log("moment vi", moment(new Date()).format("dddd - DD/MM"));
    // console.log(
    //   "moment en",
    //   moment(new Date()).locale("en").format("ddd - DD/MM")
    // );
    let allDays = this.getAllDays(language);
    this.setState({
      allDays: allDays,
    });
  }

  getAllDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddmm = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddmm}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddmm = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddmm}`;
          object.label = today;
          console.log("label", object.label);
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }
    return allDays;
  };

  async componentDidUpdate(prevProps, prevState, snapshop) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getAllDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getAllDays(this.props.language);
      let res = await getScheduleDoctorByDateService(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  //when change select date
  handleOnchangeSelect = async (e) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = e.target.value;
      let res = await getScheduleDoctorByDateService(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }
    }
  };
  //capital first letter
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    let { allDays, allAvailableTime } = this.state;
    let { language } = this.props;
    // console.log("check state available date", allAvailableTime);
    return (
      <>
        <div className="doctor-schedule">
          <div className="all-schedule">
            <select onChange={(e) => this.handleOnchangeSelect(e)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available">
            <div className="text-calendar">
              <div>
                <i className="fas fa-calendar-alt">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.schedule" />
                  </span>
                </i>
              </div>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div>
                    {allAvailableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.value_vi
                          : item.timeTypeData.value_en;
                      return <button key={index}>{timeDisplay}</button>;
                    })}
                  </div>
                  <div className="book-free">
                    <FormattedMessage id="patient.detail-doctor.book-free.first" />
                    <i class="far fa-hand-point-up"></i>
                    <FormattedMessage id="patient.detail-doctor.book-free.second" />
                  </div>
                </>
              ) : (
                <div className="time-empty">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </div>
              )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
