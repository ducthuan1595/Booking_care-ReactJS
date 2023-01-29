import React, { Component } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions"; //actions of redux
import "./ManageDoctor.scss";

// create text, html
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

//use react-select
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ///save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      // doctorId: "",
      listDoctors: [],
      hasOldData: false,

      ///save to doctor info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors(); //fire action in adminAction.js
    this.props.getRequiredDoctorInfo(); //get all required doctor info
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.value_vi}`;
          let labelEn = `${item.value_en} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.value_vi}`;
          let labelEn = `${item.value_en}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  //ham update state
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectedSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinics = this.buildDataInputSelect(resClinic, 'CLINIC');

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectedSpecialty,
        listClinic: dataSelectClinics,
      });
    }
    if (prevProps.language !== this.props.language) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfo;
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince,
        "PROVINCE"
      );
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  //select
  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state; //get variable in this.state to render data in UI
    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = '',
        clinicId = '',
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedSpecialty= '',
        selectedClinic = ''

      //get all data from server
      if (res.data.Doctor_info) {
        addressClinic = res.data.Doctor_info.addressClinic;
        nameClinic = res.data.Doctor_info.nameClinic;
        note = res.data.Doctor_info.note;
        paymentId = res.data.Doctor_info.paymentId;
        priceId = res.data.Doctor_info.priceId;
        provinceId = res.data.Doctor_info.provinceId;
        specialtyId = res.data.Doctor_info.specialtyId;
        clinicId = res.data.Doctor_info.clinicId;

        //find data selected
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId
        })
        // console.log("check payment", findItem, listPayment);
      }
      this.setState({
        //set state when find selected
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
      });
    } else {
      //no find assign empty string
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPrice: '',
        selectedPayment: '',
        selectedProvince: '',
        selectedSpecialty: '',
        selectedClinic: '',
      });
    }
  };

  handleOnChangeSelectDoctorInfo = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
    // console.log("Check new select on change", stateCopy);
  };

  //textarea
  handleOnChangeDesc = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  //markdown edit
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  //btn save
  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctors({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId: this.state.selectedClinic.value,
      specialtyId: this.state.selectedSpecialty.value,
    });
  };

  render() {
    let { hasOldData, listSpecialty } = this.state;
    console.log("check state", this.state);
    // console.log("<check resSpecialty", this.props.addRequiredDoctorInfo);
    return (
      <div className="manage-doctor">
        <div className="manage-doctor-title">
          <h3>
            <FormattedMessage id="patient.detail-doctor.doctor-info.title" />
          </h3>
        </div>
        <div className="manage-doctor-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="patient.detail-doctor.doctor-info.choose-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="patient.detail-doctor.doctor-info.choose-doctor" />
              }
            />
          </div>
          <div className="form-group content-right">
            <label>
              <FormattedMessage id="patient.detail-doctor.doctor-info.introduction" />
            </label>
            <textarea
              className="form-control"
              rows="2"
              onChange={(e) => this.handleOnChangeDesc(e, "description")}
              value={this.state.description}
            ></textarea>
          </div>
          <div className="more-info row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="patient.detail-doctor.doctor-info.price" />
              </label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleOnChangeSelectDoctorInfo}
                options={this.state.listPrice}
                placeholder={
                  <FormattedMessage id="patient.detail-doctor.doctor-info.price" />
                }
                name="selectedPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="patient.detail-doctor.doctor-info.payment" />
              </label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleOnChangeSelectDoctorInfo}
                options={this.state.listPayment}
                placeholder={
                  <FormattedMessage id="patient.detail-doctor.doctor-info.payment" />
                }
                name="selectedPayment"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="patient.detail-doctor.doctor-info.province" />
              </label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleOnChangeSelectDoctorInfo}
                options={this.state.listProvince}
                placeholder={
                  <FormattedMessage id="patient.detail-doctor.doctor-info.province" />
                }
                name="selectedProvince"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="patient.detail-doctor.doctor-info.name-clinic" />
              </label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeDesc(e, "nameClinic")}
                value={this.state.nameClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="patient.detail-doctor.doctor-info.address" />
              </label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeDesc(e, "addressClinic")}
                value={this.state.addressClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="patient.detail-doctor.doctor-info.note" />
              </label>
              <input
                className="form-control"
                onChange={(e) => this.handleOnChangeDesc(e, "note")}
                value={this.state.note}
              />
            </div>
            <div className="col-4 form-group">
              <label>Choose specialty</label>
              <Select
                value={this.state.selectedSpecialty}
                onChange={this.handleOnChangeSelectDoctorInfo}
                options={this.state.listSpecialty}
                name="selectedSpecialty"
                placeholder={
                  <FormattedMessage id="patient.detail-doctor.doctor-info.choose-doctor" />
                }
              />
            </div>
            <div className="col-4 form-group">
              <label>Choose clinic</label>
              <Select
                value={this.state.selectedClinic}
                onChange={this.handleOnChangeSelectDoctorInfo}
                options={this.state.listClinic}
                name="selectedClinic"
                placeholder={
                  <FormattedMessage id="patient.detail-doctor.doctor-info.choose-doctor" />
                }
              />
            </div>
          </div>
        </div>
        <div className="manage-doctor-markdown">
          {/* add information for doctor */}
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
          <button
            className="btn"
            onClick={() => this.handleSaveContentMarkdown()}
          >
            {hasOldData === true ? (
              <FormattedMessage id="patient.detail-doctor.doctor-info.edit" />
            ) : (
              <FormattedMessage id="patient.detail-doctor.doctor-info.save" />
            )}
          </button>
        </div>
      </div>
    );
  }
}

//get from redux to props(adminReduce.js)
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};
//get from action redux(adminAction.js)
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
