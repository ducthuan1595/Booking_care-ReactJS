import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux"; //use connect redux to react
import "./UserRedux.scss";
import { getAllCodeService } from "../../../services/userService"; // get all input at api
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils"; // ask redux current language is be used
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

      action: "",
      userEditId: "",
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
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "", //check data
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        // position:
        // arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        // role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.users !== this.props.users) {
      let arrGender = this.props.genderRedux; //get all data
      let arrPosition = this.props.positionRedux;
      let arrRole = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "", //check data
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
      });
    }
  }

  //create file image tranfer URL
  handleOnchangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file); //save image with base64
      // console.log("base64", base64);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
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

    let { action } = this.state; //let action = this.state.action
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create action
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
        avatar: this.state.avatar,
      });
    }
    if ((action = CRUD_ACTIONS.EDIT)) {
      //fire redux edit action
      this.props.editUser({
        id: this.state.userEditId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        roleId: this.state.role,
        positionId: this.state.position,
        gender: this.state.gender,
        avatar: this.state.avatar,
      });
    }
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
        // console.log("check input onchange", copyState);
      }
    );
  };

  //receive user from child(TableManageUser)
  handleEditUserFromParent = (user) => {
    // console.log("check edit user redux current", user);
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
      // console.log(imageBase64);
    }
    this.setState({
      email: user.email,
      password: "hackcode",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
      position: user.position,
      gender: user.gender,
      avatar: "",
      previewImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
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
            <div className="container mb-5">
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
                        disabled={
                          this.state.action === CRUD_ACTIONS.EDIT ? true : false
                        }
                      />
                    </div>
                    <div className="form-group col col-md-6">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => this.onChangeInput(e, "password")}
                        disabled={
                          this.state.action === CRUD_ACTIONS.EDIT ? true : false
                        }
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
                              <option key={index} value={item.keyMap}>
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
                              <option key={index} value={item.keyMap}>
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
                              <option key={index} value={item.keyMap}>
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
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={() => this.handleSaveUser()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? "EDIT" : "SAVE"}
                  </button>
                </form>
              </div>
            </div>
            <TableManageUser
              handleEditUserFromParent={this.handleEditUserFromParent}
              action={this.state.action}
            />
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
    editUser: (data) => dispatch(actions.editUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
