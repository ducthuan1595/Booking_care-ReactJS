import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import _ from "lodash";
import * as Scroll from 'react-scroll';
// import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import HomeHeader from "../../HomePage/Header/HomeHeader";
import HomeFooter from "../../HomePage/Header/HomeFooter";
import "./DetailHandbook.scss";
import { getDetailHandbook } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import LikeAndShare from "../socialPlugin/LikeAndShare";
import Comment from "../socialPlugin/Comment";

// var scroll  = Scroll.animateScroll;

class DetailHandbook extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      handbookId: {},
      allHandbook: [],
    };
  }

  async componentDidMount() {
    // window.scrollTo(0, 0)
    this.myRef.current.scrollTo(0, 0);
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailHandbook({
        id: id,
      });
      if (res && res.info.errCode === 0) {
        let data = res.info.data;
        let allHandbook = [];
        if (data.allHandbook) {
          allHandbook = data.allHandbook.filter((item, index) => {
            return item.id !== data.id;
          });
        }
        data.allHandbook = allHandbook;
        // console.log('data handbook', data)
        if (data) {
          this.setState({
            handbookId: data,
            allHandbook: data.allHandbook,
          });
        }
      }
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleDetailHandbook = async(id) => {
    if(this.props.history) {
      this.props.history.push(`${id}`)
    }
    let res = await getDetailHandbook({
      id: id,
    });
    if (res && res.info.errCode === 0) {
      let data = res.info.data;
      let allHandbook = [];
      if (data.allHandbook) {
        allHandbook = data.allHandbook.filter((item, index) => {
          return item.id !== data.id;
        });
      }
      data.allHandbook = allHandbook;
      if (data) {
        this.setState({
          handbookId: data,
          allHandbook: data.allHandbook,
        });
      }
    }
  }

  render() {
    window.scrollTo(0, 0);
    let { handbookId, allHandbook } = this.state;
    let { language } = this.props;
    // console.log("check detail handbook state", this.state);

    let currentURL =
      +process.env.REACT_APP_IS_LOCALHOST === 1
        ? "https://www.facebook.com/Sao-Gi%E1%BB%9D-415356329307334"
        : window.location.href;

    return (
      <>
        <HomeHeader />
        {handbookId && (
          <div className="handbook row" ref={this.myRef}>
            <div className="handbook-container col-8">
              <Link to="/home" className="link-title">
                <i className="fas fa-home"></i>/
                <p>
                  <FormattedMessage id="home-header.handbook" />
                </p>
              </Link>
              <div className="handbook-head">
                <div className="handbook-title">{handbookId.description}</div>
                <span>
                  <FormattedMessage id="patient.handbook.author" />
                </span>
                <p className="handbook-attention">
                  <i className="fas fa-notes-medical icon-handbook"></i>
                  <FormattedMessage id="patient.handbook.description" />
                </p>
                <div className="like-and-share">
                  <LikeAndShare dataHref={currentURL} />
                </div>
                <div
                  className="handbook-image"
                  style={{
                    backgroundImage: `url(${
                      handbookId.image ? handbookId.image : ""
                    })`,
                  }}
                ></div>
              </div>
              <div
                className="handbook-description"
                dangerouslySetInnerHTML={{
                  __html: handbookId.contentHTML,
                }}
              ></div>
              <div className="comment">
                <Comment dataHref={currentURL} width={"100%"} />
              </div>
            </div>
            <div className="side-bar col-4">
              <h6 className="side-bar-title"><FormattedMessage id="patient.handbook.focus" /></h6>
              {allHandbook &&
                allHandbook.length > 0 &&
                allHandbook.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <div
                        className="side-bar-image"
                        style={{
                          backgroundImage: `url(${
                            item.image ? item.image : ""
                          })`,
                          cursor: 'pointer'
                        }}
                        onClick={()=> this.handleDetailHandbook(item.id)}
                      ></div>
                      <p className="side-bar-name">{item.description}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
