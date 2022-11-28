import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions"; //actions of redux
// import "./UserManage.scss";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        usersRedux: this.props.users,
      });
    }
  }

  handleDeleteUser = (id) => {
    this.props.deleteUserRedux(id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user); //chuyen user sang parent(UserRedux)
  };

  render() {
    let arrUser = this.state.usersRedux;
    // console.log("edit user:", arrUser);
    return (
      <>
        <div className="container mb-5 mt-5">
          <div className="title">Actions user</div>
          <div className="mt-3">
            <table>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>address</th>
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
  return {
    users: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
