import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";

import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      imgBase64: ''
    };
  }

  async componentDidMount() {
    if(this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email
      })
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email
      })
    }
  }

  handleChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handleOnchangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file); //save image with base64
      // console.log("base64", base64);
      // let objectUrl = URL.createObjectURL(file); 
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state)
    // console.log('check state modal', this.state)
  }

  render() {
    let { isOpenModal, dataModal, toggle, sendRemedy } = this.props;
    let { email, imgBase64 } = this.state;
    console.log("check state", this.state);

    return (
      <>
        <div>
          <Modal
            isOpen={isOpenModal}
            className={"booking-modal"}
            centered
            size="md"
          >
            <ModalHeader toggle={toggle}>Send bills for patient</ModalHeader>
            <ModalBody>
              {dataModal && 
                <div className="row">
                  <div className="form-group col-6">
                    <label>Email'f patient</label>
                    <input className="form-control" type='email' value={this.state.email} 
                      onChange={(e)=>this.handleChangeEmail(e)} 
                    />
                  </div>
                  <div className="form-group col-6">
                    <label>File bills</label>
                    <input className="form-control-file" type='file' 
                    onChange={(e)=>this.handleOnchangeImage(e)}
                    />
                  </div>
                </div>
              }
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=>this.handleSendRemedy()}>
                Send
              </Button>{" "}
              <Button color="secondary" onClick={toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
