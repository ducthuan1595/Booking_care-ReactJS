import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
// import Select from "react-select";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDateService } from "../../../services/userService";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
    };
  }

  async componentDidMount() {
    let { language } = this.props;

    console.log("moment vi", moment(new Date()).format("dddd - DD/MM"));
    console.log(
      "moment en",
      moment(new Date()).locale("en").format("ddd - DD/MM")
    );
    this.setDates(language);
  }

  setDates = async (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        object.label = moment(new Date()).add(i, "days").format("dddd -DD/MM");
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }
    this.setState({
      allDays: allDays,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshop) {
    if (this.props.language !== prevProps.language) {
      this.setDates(this.props.language);
    }
  }

  //when change select date
  handleOnchangeSelect = async (e) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = e.target.value;
      let res = await getScheduleDoctorByDateService(doctorId, date);
    }
  };

  render() {
    let { allDays } = this.state;
    // console.log("check state", this.state);
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
          <div className="all-availible"></div>
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