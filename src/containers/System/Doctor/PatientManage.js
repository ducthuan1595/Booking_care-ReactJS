import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import moment from "moment"; //format date month, year

import DatePicker from "../../../components/Input/DatePicker";
import { getListPatientForDoctor } from "../../../services/userService";

import "./PatientManage.scss";
import { LANGUAGES } from "../../../utils";

class PatientManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: {},
    };
  }

  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formattedDate = new Date(currentDate).getTime();
    this.getDataPatient(user, formattedDate);
  }

  getDataPatient = async (user, formattedDate) => {
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
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formattedDate);
      }
    );
  };

  handleConfirmChecked = () => {

  }

  handleSendBill = () => {}

  render() {
    let { dataPatient } = this.state;
    let { language } = this.props;
    // console.log("check state", this.state);

    return (
      <>
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
                  {dataPatient &&
                    dataPatient.length > 0 &&
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
                            <button className='btn btn-success mr-2 btn-sm' onClick={()=>this.handleConfirmChecked}>Confirm</button>
                            <button className='btn btn-info btn-sm' onClick={()=>this.handleSendBill}>Send bill</button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
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
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientManage);
