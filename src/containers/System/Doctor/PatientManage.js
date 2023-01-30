import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from "moment"; //format date month, year
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

import DatePicker from "../../../components/Input/DatePicker";
import {
  getListPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";

import "./PatientManage.scss";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";

class PatientManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    let res = await getListPatientForDoctor({
      doctorId: user.id,
      date: formattedDate,
    });
    if (res && res.info.errCode === 0) {
      // console.log("check res", res);
      this.setState({
        dataPatient: res.info.data,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleConfirm = (item) => {
    // console.log('item', item)
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      patientName: item.patientData.firstName,
      timeType: item.timeType,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChildModal) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true
    })
    let res = await postSendRemedy({
      email: dataChildModal.email,
      imgBase64: dataChildModal.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      patientName: dataModal.patientName,
      language: this.props.language,
    });
    // console.log("check res send remedy", res);
    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false
      })
      toast.success("Send remedy success!");
      this.closeModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false
      })
      toast.error("Send remedy failure!");
      console.log(res);
    }
  };

  render() {
    let { dataPatient, dataModal, isOpenRemedyModal } = this.state;
    let { language } = this.props;
    console.log("check state", this.state);

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="patient-manage">
            <div className="title">Manage Schedule Patient</div>
            <div className="content row">
              <div className="col-4 form-group">
                <label>Choose day</label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="table form-group col-12">
                <table>
                  <tbody>
                    <tr>
                      <th>STT</th>
                      <th>FullName</th>
                      <th>Address</th>
                      <th>Gender</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>
                              {language === LANGUAGES.VI
                                ? item.patientData.genderData.value_vi
                                : item.patientData.genderData.value_en}
                            </td>
                            <td>
                              {language === LANGUAGES.VI
                                ? item.timeTypeDataPatient.value_vi
                                : item.timeTypeDataPatient.value_en}
                            </td>
                            <td>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => this.handleConfirm(item)}
                              >
                                Confirm
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          No Data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            toggle={this.closeModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientManage);
