import React, { Component } from "react";
import { connect } from "react-redux";
import "./ScheduleManage.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions"; //actions of redux
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
// import { getDetailInforDoctor } from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment"; //format date month, year
import { toast } from "react-toastify"; //user library toast page
import _ from "lodash";
import { saveBulkDoctorService } from "../../../services/userService";

// import FormattedDate from "../../../components/Formating/FormattedDate";

class ScheduleManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedOption: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctor();
    this.props.fetAllScheduleTime();
  }

  //ham update state
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        // data = data.map((item) => {
        //   item.isSelected = false;
        //   return item;
        // });
        data = data.map((item) => ({ ...item, isSelected: false }));
        // console.log("check time", data);
      }
      this.setState({
        rangeTime: data,
      });
    }
  }

  //select
  handleChange = async (selectedOption) => {
    this.setState({
      selectedOption: selectedOption,
    });
  };

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
      return result;
    }
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  handleClickBtnTime = (time) => {
    let rangeTime = this.state.rangeTime;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedOption, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Invalid date");
    }
    if (selectedOption && _.isEmpty(selectedOption)) {
      toast.error("Invalid seleced doctor");
      return;
    }
    let formatedDate = new Date(currentDate).getTime();
    // let formatedDate = moment(currentDate).unix();
    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let object = {};
          object.doctorId = selectedOption.value;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time");
      }
    }
    let res = await saveBulkDoctorService({
      arrSchedule: result,
      doctorId: selectedOption.value,
      formatedDate: formatedDate,
    });

    console.log("check res", res);
    console.log("check result", result);
  };

  render() {
    // console.log("check state", this.state);
    // console.log("check props", this.props);
    let { rangeTime } = this.state;
    let { language } = this.props;
    // console.log("check time rangeTime", rangeTime);
    return (
      <>
        <div className="manage-schedule-container">
          <h3 className="manage-schedule-title">
            <FormattedMessage id="manage-schedule.title" />
          </h3>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.state.listDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                  minDate={new Date()}
                />
              </div>
              <div className="col-12 pick-hour">
                {/* <FormattedDate value={this.state.currentDate} /> */}
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    // console.log(item.value_vi);
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? "btn btn-light btn-schedule active"
                            : "btn btn-light btn-schedule"
                        }
                        key={index}
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.value_vi
                          : item.value_en}
                      </button>
                    );
                  })}
              </div>
              <button
                className="btn btn-primary btn-save-schedule"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-schedule.save" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctors()),
    fetAllScheduleTime: () => dispatch(actions.fetAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
