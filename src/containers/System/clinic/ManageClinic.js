import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import MdEditor from "react-markdown-editor-lite";

import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import { LANGUAGES, CommonUtils } from "../../../utils"; // ask redux current language is be used
import { postNewClinic } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: '',
      imageBase64: "",
      descHTML: "",
      descMarkdown: "",
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChange = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  //markdown edit
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descHTML: html,
      descMarkdown: text,
    });
  };

  //create file image tranfer URL
  handleOnchangeImage = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file); //save image with base64
      // console.log("base64", base64);
      // let objectUrl = URL.createObjectURL(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveNewSpecialty = async () => {
    let res = await postNewClinic(this.state);
    if (res && res.info.errCode === 0) {
      toast.success("Create clinic succeed");
      this.setState({
        name: "",
        address: '',
        imageBase64: "",
        descHTML: "",
        descMarkdown: "",
      });
    } else {
      toast.error("Not found clinic");
      // console.log("<<check specialty create res:", res);
    }
  };

  render() {
    console.log("check state", this.state);

    return (
      <>
        <div className="manage-specialty">
          <div className="title">Manage Clinic</div>
          <div className="add-new-specialty">
            {/* <button className="btn btn-primary">Add new Specialty</button> */}
            <h4>Add a new clinic</h4>
            <div className="row">
              <div className="col-6 form-group">
                <label>Name clinic</label>
                <input
                  className="form-control"
                  value={this.state.name}
                  onChange={(e) => this.handleOnChange(e, "name")}
                />
              </div>
              <div className="col-6 form-group">
                <label>Photo clinic</label>
                <input
                  className="form-control-file"
                  type="file"
                  onChange={(e) => this.handleOnchangeImage(e)}
                />
              </div>
              <div className="col-6 form-group">
                <label>Address clinic</label>
                <input
                  className="form-control"
                  value={this.state.address}
                  onChange={(e) => this.handleOnChange(e, "address")}
                />
              </div>
            </div>
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descMarkdown}
            />
            <div className="col-12 p-0">
              <button
                className="btn btn-primary btn-save"
                onClick={() => this.handleSaveNewSpecialty()}
              >
                SAVE
              </button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
