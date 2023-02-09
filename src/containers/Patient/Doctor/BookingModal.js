import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { Modal } from "reactstrap";
import ProfileDoctor from "./ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../components/Input/DatePicker";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { postPatientBookAppointment } from "../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      doctorId: "",
      selectedGender: "",
      genders: "",
      timeType: "",

      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label =
          language === LANGUAGES.VI ? item.value_vi : item.value_en;
        object.value = item.keyMap;
        result.push(object);
      });
      return result;
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnChange = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleOnChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };

  handleConfirmBooking = async () => {
    this.setState({
      isShowLoading: true,
    });
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    // console.log("<<time string", doctorName);
    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      birthday: date,
      date: this.props.dataTime.date,
      doctorId: this.state.doctorId,
      selectedGender: this.state.selectedGender.value,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    console.log("<<check confirm res:", res);
    if (res && res.info.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Book a new appointment succeed!");
      this.props.isCloseModal();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Book a new appointment error!");
    }
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime !== !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };

  buildTimeBooking = (dataTime) => {
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
      return `${time} . ${date}`;
    }
    return "";
  };

  render() {
    let { isOpenModal, isCloseModal, dataTime } = this.props;
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    // console.log(",,check dataTime", dataTime);

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div>
            <Modal
              isOpen={isOpenModal}
              toggle={this.toggle}
              className={"booking-modal"}
              centered
              size="lg"
            >
              <div className="modal-container">
                <div className="booking-modal-header">
                  <h4>
                    <FormattedMessage id="patient.booking-schedule.title" />
                  </h4>
                  <p onClick={isCloseModal}>
                    <i className="fas fa-times"></i>
                  </p>
                </div>
                <div className="horizontal-line"></div>
                <div className="booking-modal-body">
                  {/* {JSON.stringify(dataTime)} */}
                  <div className="doctor-info">
                    <ProfileDoctor
                      doctorId={doctorId}
                      isShowDescriptionDoctor={false}
                      dataTime={dataTime}
                    />
                  </div>

                  <div className="row">
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-schedule.fullName" />
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.fullName}
                        onChange={(e) => this.handleOnChange(e, "fullName")}
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-schedule.phoneNumber" />
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.phoneNumber}
                        onChange={(e) => this.handleOnChange(e, "phoneNumber")}
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-schedule.email" />
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.email}
                        onChange={(e) => this.handleOnChange(e, "email")}
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-schedule.address" />
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.address}
                        onChange={(e) => this.handleOnChange(e, "address")}
                      />
                    </div>
                    <div className="col-12 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-schedule.reason" />
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.season}
                        onChange={(e) => this.handleOnChange(e, "reason")}
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-schedule.birthday" />
                      </label>
                      <DatePicker
                        onChange={this.handleOnChangeDatePicker}
                        value={this.state.birthday}
                        className="form-control"
                      />
                    </div>
                    <div className="col-6 form-group">
                      <label>
                        <FormattedMessage id="patient.booking-schedule.gender" />
                      </label>
                      <Select
                        value={this.state.selectedGender}
                        onChange={this.handleOnChangeSelect}
                        options={this.state.genders}
                        className="selected"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="horizontal-line"></div> */}
                <div className="booking-modal-footer">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleConfirmBooking}
                  >
                    <FormattedMessage id="patient.booking-schedule.confirm" />
                  </button>
                  <button className="btn btn-dark" onClick={isCloseModal}>
                    <FormattedMessage id="patient.booking-schedule.cancel" />
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
