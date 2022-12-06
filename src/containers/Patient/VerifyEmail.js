import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/Header/HomeHeader";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    //get token and doctorId
    if (this.props.location && this.props.location.search) {
      const urlParams = new URLSearchParams(this.props.location.search);
      const token = urlParams.get("token");
      const doctorId = urlParams.get("doctorId");
      // console.log("<<get token", token, doctorId);
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      console.log(",,check res", res);
      if (res && res.info.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.info.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.info.errCode ? res.info.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { statusVerify, errCode } = this.state;
    console.log("check state", this.state);

    return (
      <>
        <HomeHeader />
        <div style={{ marginTop: 150, textAlign: "center" }}>
          {statusVerify === false ? (
            <div>Loading data...</div>
          ) : (
            <di>{+errCode === 0 ? <div>Succeed</div> : <div>Failure</div>}</di>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
