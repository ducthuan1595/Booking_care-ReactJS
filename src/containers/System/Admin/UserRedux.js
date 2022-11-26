import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux"; //use connect redux to react
import "./UserRedux.scss";
import { getAllCodeService } from "../../../services/userService"; // get all input at api
import { LANGUAGES } from "../../../utils"; // ask redux current language is be used
import * as actions from "../../../store/actions"; //actions of redux

import Lightbox from "react-image-lightbox"; //library: phong to image
import "react-image-lightbox/style.css";

import TableManageUser from "./TableManageUser"; //table edit user with redux

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      role: "",
      position: "",
      avatar: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // or this.props.dispatch(actions.fetchGenderStart())

    // try {
    //   let res = await getAllCodeService("gender");
    //   console.log(res);
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  //check truoc when undate data
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux; //get all data
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "", //check data
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }
    if (prevProps.users !== this.props.users) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: "",
        role: "",
        position: "",
        avatar: "",
      });
    }
  }

  //create file image tranfer URL
  handleOnchangeImage = (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: file,
      });
      console.log("image", objectUrl);
    }
  };

  //check image
  handlOpenReviewImg = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    //fire redux action
    this.props.createNewUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender,
      address: this.state.address,
      roleId: this.state.role,
      positionId: this.state.position,
      phoneNumber: this.state.phoneNumber,
    });
    // this.props.fetchUserRedux();
    // console.log("input return user data", this.state);
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; arrCheck.length > i; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Invalid input: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("check input onchange", copyState);
      }
    );
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;

    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      role,
      position,
      gender,
      avatar,
    } = this.state;

    return (
      <>
        <div className="user-redux">
          <h2>Manage user redux</h2>
          <div className="user-redux-container">
            <div className="container">
              <div>{isLoadingGender === true ? "loading genders" : ""}</div>
              <h4>Add a new user</h4>
              <div className="row-form">
                <form>
                  <div className="form-redux">
                    <div className="form-group col col-md-6">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="thuan@gmail.com"
                        value={email}
                        onChange={(e) => this.onChangeInput(e, "email")}
                      />
                    </div>
                    <div className="form-group col col-md-6">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => this.onChangeInput(e, "password")}
                      />
                    </div>
                  </div>
                  <div className="form-redux">
                    <div className="form-group col-md-6">
                      <label>FirstName</label>
                      <input
                        type="text"
                        className="form-control"
                        value={firstName}
                        onChange={(e) => this.onChangeInput(e, "firstName")}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Lastname</label>
                      <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        onChange={(e) => this.onChangeInput(e, "lastName")}
                      />
                    </div>
                  </div>
                  <div className="form-redux">
                    <div className="form-group col-md-9">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address"
                        placeholder="132 New Jason, New york, US"
                        value={address}
                        onChange={(e) => this.onChangeInput(e, "address")}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>PhoneNumber</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="003.689.1995"
                        value={phoneNumber}
                        onChange={(e) => this.onChangeInput(e, "phoneNumber")}
                      />
                    </div>
                  </div>

                  <div className="form-redux">
                    <div className="form-group col-md-3">
                      <label>Gender</label>
                      <select
                        id="inputState"
                        className="form-control"
                        onChange={(e) => this.onChangeInput(e, "gender")}
                      >
                        {genders &&
                          genders.length > 0 &&
                          genders.map((item, index) => {
                            <option selected>Choose...</option>;
                            return (
                              <option key={index} value={item.key}>
                                {language === LANGUAGES.VI
                                  ? item.value_vi
                                  : item.value_en}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Position</label>
                      <select
                        id="inputState"
                        className="form-control"
                        onChange={(e) => this.onChangeInput(e, "position")}
                      >
                        {positions &&
                          positions.length > 0 &&
                          positions.map((item, index) => {
                            <option selected>Choose...</option>;
                            return (
                              <option key={index} value={item.key}>
                                {language === LANGUAGES.VI
                                  ? item.value_vi
                                  : item.value_en}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <label>Role</label>
                      <select
                        id="inputState"
                        className="form-control"
                        onChange={(e) => this.onChangeInput(e, "role")}
                      >
                        {roles &&
                          roles.length > 0 &&
                          roles.map((item, index) => {
                            <option selected>Choose...</option>;
                            return (
                              <option key={index} value={item.key}>
                                {language === LANGUAGES.VI
                                  ? item.value_vi
                                  : item.value_en}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="form-group col-md-3">
                      <div className="form-image">
                        <label>Avatar</label>
                        <div>
                          <input
                            type="file"
                            className="form-control"
                            id="prevImage"
                            hidden
                            onChange={(e) => this.handleOnchangeImage(e)}
                          />
                          <label htmlFor="prevImage" className="image-upload">
                            Upload <i className="fas fa-upload"></i>
                          </label>
                        </div>
                        <div
                          className="preview-image"
                          style={{
                            backgroundImage: `url(${this.state.previewImgURL})`,
                          }}
                          onClick={() => this.handlOpenReviewImg()}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    onClick={() => this.handleSaveUser()}
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
            <TableManageUser />
          </div>
          {/* //phong to image */}
          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
      </>
    );
  }
}

//ham use save data from redux to react(get data: this.props.language)
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
