import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
// import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CommonUtils } from "../../../utils"; // ask redux current language is be used
import { postHandbook } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageHandbook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      imageBase64: "",
      contentHTML: "",
      contentMarkdown: "",
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
      contentHTML: html,
      contentMarkdown: text,
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
    let res = await postHandbook(this.state);
    if (res && res.info.errCode === 0) {
      toast.success("Create handbook succeed");
      this.setState({
        description: "",
        imageBase64: "",
        contentHTML: "",
        contentMarkdown: "",
      });
    } else {
      toast.error("Not found handbook");
      console.log("<<check handbook create res:", res);
    }
  };

  render() {
    console.log("check state", this.state);

    return (
      <>
        <div className="manage-specialty">
          <div className="title">Manage Handbook</div>
          <div className="add-new-specialty">
            {/* <button className="btn btn-primary">Add new Specialty</button> */}
            <h4>Add a new handbook</h4>
            <div className="row">
              <div className="col-6 form-group">
                <label>Description handbook</label>
                <input
                  className="form-control"
                  value={this.state.description}
                  onChange={(e) => this.handleOnChange(e, "description")}
                />
              </div>
              <div className="col-6 form-group">
                <label>Photo handbook</label>
                <input
                  className="form-control-file"
                  type="file"
                  onChange={(e) => this.handleOnchangeImage(e)}
                />
              </div>
            </div>
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
