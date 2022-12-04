import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from "../../../utils";
import { getExtraInfoDoctorByIdService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailPrice: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInfoDoctorByIdService(
        this.props.doctorIdFromParent
      );
      if (res) {
        this.setState({
          extraInfo: res.info.data,
        });
      }
      // console.log(">>check extra", res);
    }
  }

  handleShowPrice = (status) => {
    this.setState({
      isShowDetailPrice: status,
    });
  };

  render() {
    let { isShowDetailPrice, extraInfo } = this.state;
    let { language } = this.props;
    console.log("check state", this.state);

    return (
      <>
        <div className="doctor-extra-info">
          <div className="content-up">
            <div className="title">
              <FormattedMessage id="patient.detail-doctor.doctor-extra-info.address-exam" />
            </div>
            <div className="name-clinic">
              {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
            </div>
            <div>
              {extraInfo && extraInfo.addressClinic
                ? extraInfo.addressClinic
                : ""}
            </div>
          </div>

          <div className="horizontal-line"></div>
          <div className="content-down">
            {isShowDetailPrice === false && (
              <div className="price">
                <span className="title">
                  <FormattedMessage id="patient.detail-doctor.doctor-extra-info.price-exam" />
                  :{" "}
                </span>
                <span className="price-detail">
                  {extraInfo &&
                    extraInfo.priceTypeData &&
                    language === LANGUAGES.VI && (
                      <NumberFormat
                        value={extraInfo.priceTypeData.value_vi}
                        thousandSeparator={true}
                        displayType={"text"}
                        suffix={"VND"}
                      />
                    )}
                  {extraInfo &&
                    extraInfo.priceTypeData &&
                    language === LANGUAGES.EN && (
                      <NumberFormat
                        value={extraInfo.priceTypeData.value_en}
                        thousandSeparator={true}
                        displayType={"text"}
                        prefix={"$"}
                      />
                    )}
                </span>
                <span
                  className="show-hidden"
                  onClick={() => this.handleShowPrice(true)}
                >
                  <FormattedMessage id="patient.detail-doctor.doctor-extra-info.show-detail" />
                </span>
              </div>
            )}
            {isShowDetailPrice === true && (
              <div className="detail-info">
                <div className="detail-price-info">
                  <div className="title">
                    <FormattedMessage id="patient.detail-doctor.doctor-extra-info.price-exam" />
                  </div>
                  <span className="price-detail">
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGES.VI && (
                        <NumberFormat
                          value={extraInfo.priceTypeData.value_vi}
                          thousandSeparator={true}
                          displayType={"text"}
                          suffix={"VND"}
                        />
                      )}
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === LANGUAGES.EN && (
                        <NumberFormat
                          value={extraInfo.priceTypeData.value_en}
                          thousandSeparator={true}
                          displayType={"text"}
                          prefix={"$"}
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  <div>{extraInfo && extraInfo.note ? extraInfo.note : ""}</div>
                  <div>
                    <FormattedMessage id="patient.detail-doctor.doctor-extra-info.pay-method-note" />
                    {extraInfo && extraInfo.paymentTypeData
                      ? extraInfo.paymentTypeData.value_vi
                      : ""}
                  </div>
                </div>
                <div
                  className="show-hidden"
                  onClick={() => this.handleShowPrice(false)}
                >
                  <FormattedMessage id="patient.detail-doctor.doctor-extra-info.hidden-detail" />
                </div>
              </div>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
