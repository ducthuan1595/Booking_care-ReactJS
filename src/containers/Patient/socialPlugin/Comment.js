import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import { LANGUAGES } from "../../../utils";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  async componentDidMount() {
    this.initFacebookSDK();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  initFacebookSDK() {
    if(window.FB) {
      window.FB.XFBML.parse();
    }
    let {language} = this.props;
    let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US';
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v2.5'
      })
    };
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if(d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = `//connect.facebook.net/${locale}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  render() {
    let  {dataHref, width, numPost} = this.props;
    console.log("check state", this.state);

    return <>
    <div className="fb-comments"
      data-href={dataHref}
      data-width={width ? width : ''}
      data-numposts={numPost ? numPost : 5}
    >
      </div>
    </>;
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
