import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }

  listenToEmitter = () => {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  };

  componentDidMount() {}
  //open or close the modal
  toggle = () => {
    this.props.toggleModal(); //toggleModal from parent component (UserManage.js)
  };
  handleOnChange = (e, input) => {
    // console.log(e.target.value, input);
    let copyState = { ...this.state };
    copyState[input] = e.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        // console.log("result:", copyState);
      }
    );
  };
  //check input full informatioon
  checkValidInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing paramter " + arrInput[i]);
        break;
      }
      return isValid;
    }
  };
  hanleAddNewUser = () => {
    console.log(this.state); //get information when input
    let isValid = this.checkValidInput();
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };
  render() {
    return (
      <>
        <div className="container">
          <Modal
            isOpen={this.props.isOpen} //get props from parents component
            toggle={() => this.toggle()}
            className={"modal-create-user"}
            size="lg" //size for modal(md, lg, sm)
            centered //center
          >
            <ModalHeader toggle={() => this.toggle()}>
              Creat a new user
            </ModalHeader>
            <ModalBody>
              <div className="modal-content">
                <div className="modal-row">
                  <div className="modal-col">
                    <div className="modal-item-6">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        onChange={(e) => this.handleOnChange(e, "email")}
                        value={this.state.email}
                      />
                    </div>
                    <div className="modal-item-6">
                      <label>Password</label>
                      <input
                        type="password"
                        name="password"
                        onChange={(e) => this.handleOnChange(e, "password")}
                        value={this.state.password}
                      />
                    </div>
                  </div>
                  <div className="modal-col">
                    <div className="modal-item-6">
                      <label>FirstName</label>
                      <input
                        type="text"
                        name="firstName"
                        onChange={(e) => this.handleOnChange(e, "firstName")}
                        value={this.state.firstName}
                      />
                    </div>
                    <div className="modal-item-6">
                      <label>LastName</label>
                      <input
                        type="text"
                        name="lastName"
                        onChange={(e) => this.handleOnChange(e, "lastName")}
                        value={this.state.lastName}
                      />
                    </div>
                  </div>
                  <div className="modal-col">
                    <div className="modal-item-12">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        onChange={(e) => this.handleOnChange(e, "address")}
                        value={this.state.address}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.toggle()}>
                <div
                  className="modal-btn btn btn-primary"
                  onClick={() => this.hanleAddNewUser()}
                >
                  Save
                </div>
              </Button>
              <Button color="secondary" onClick={() => this.toggle()}>
                <div className="modal-btn btn-light">Cancel</div>
              </Button>
            </ModalFooter>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
