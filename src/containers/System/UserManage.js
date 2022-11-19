import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  creatNewUserApi,
  deleteUserApi,
  editUserApi,
} from "../../services/userService"; //get api from backend
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModal: false,
      isOpenEditModal: false,
      userEdit: {},
    };
  }

  componentDidMount() {
    //call db (api)
    this.getAllUserFromReact();
  }

  getAllUserFromReact = async () => {
    let res = await getAllUsers("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUser: res.users, //users get in nodeJS
      });
    }
    console.log("get all user", res);
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
    // alert("click");
  };

  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  toggleEditUser = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };

  createNewUser = async (data) => {
    try {
      let res = await creatNewUserApi(data);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          isOpenModal: false, //set again modal
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleDeleteUser = async (userId) => {
    try {
      let res = await deleteUserApi(userId);
      console.log(res);
      if (res && res.errCode === 0) {
        this.setState({
          isOpenEditModal: false,
        });
        await this.getAllUserFromReact();
        console.log("done");
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleEditUser = async (userId) => {
    try {
      console.log("edit user", userId);
      this.setState({
        isOpenEditModal: true,
        userEdit: userId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  saveEditUser = async (user) => {
    try {
      let res = await editUserApi(user);
      console.log("click edit", res);
      if (res && res.errCode === 0) {
        await this.getAllUserFromReact();
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const arrUser = this.state.arrUser;
    return (
      <>
        <div className="container">
          <ModalUser
            isOpen={this.state.isOpenModal}
            toggleModal={this.toggleModal}
            createNewUser={this.createNewUser}
          />
          {this.state.isOpenEditModal && (
            <ModalEditUser
              isOpen={this.state.isOpenEditModal}
              toggleModal={this.toggleEditUser}
              currentUser={this.state.userEdit} //pass current user for ModalEditUser.js
              editUser={this.saveEditUser} //get edit user when click save in ModalEditUser.js
            />
          )}
          <div className="title">Manage user</div>
          <div className="mt-4">
            <button
              className="btn btn-primary px-3"
              onClick={() => this.handleAddNewUser()}
            >
              + Add a new user
            </button>
          </div>
          <div className="mt-3">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>LastName</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {arrUser &&
                  arrUser.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <div className="btn btn-manage">
                            <span onClick={() => this.handleEditUser(item)}>
                              <i className="fas fa-pencil-alt"></i>
                            </span>
                            <span
                              onClick={() => this.handleDeleteUser(item.id)}
                            >
                              <i className="fas fa-trash-alt"></i>
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
