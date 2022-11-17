import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService"; //get api from backend

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
    };
  }

  async componentDidMount() {
    //call db (api)
    let res = await getAllUsers("ALL");
    if (res && res.errCode === 0) {
      this.setState({
        arrUser: res.users, //users get in nodeJS
      });
    }
    console.log("get all user", res);
  }

  render() {
    const arrUser = this.state.arrUser;
    return (
      <>
        <div className="container">
          <div className="title">Manage user</div>
          <div className="mt-5">
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
                            <span>
                              <i className="fas fa-pencil-alt"></i>
                            </span>
                            <span>
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
