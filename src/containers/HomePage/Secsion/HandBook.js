import React, { Component } from "react";
import { connect } from "react-redux";
import "./HandBook.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

//react slick (arrow right or left)
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getAllHandbook } from "../../../services/userService";

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbooks: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandbook();
    if (res && res.info.errCode === 0) {
      this.setState({
        dataHandbooks: res.info.data ? res.info.data : [],
      });
    }
  }

  handleDetailHandbook = (item) => {
    if(this.props.history) {
      this.props.history.push(`detail-handbook/${item.id}`)
    }
  }

  render() {
    let { dataHandbooks } = this.state;
    // console.log("data handbook vs state", this.state);

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      // fade: true,
    };
    return (
      <div id="handbook" className="home-hand-book">
        <div className="home-page-content">
          <div className="home-title">
            <FormattedMessage id="home-header.handbook" />
          </div>
          <div className="home-lists">
            <Slider {...settings}>
              {dataHandbooks &&
                dataHandbooks.length > 0 &&
                dataHandbooks.map((item, index) => {
                  return (
                    <div key={index} className="image-items"
                    onClick={()=>this.handleDetailHandbook(item)}>
                      <div
                        className="image-item"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <span>{item.description}</span>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
