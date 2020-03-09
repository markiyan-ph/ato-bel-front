import React, { Component } from "react";
import Slider from "react-slick";
import SliderBar from './slider-bar';

import "./slider.scss";

const CustomSlide = props => {
  const { imgSrc, title } = props;

  const imgStyle = {
    height: "100vh",
    width: "100%",
    objectFit: "cover",
    objectPosition: "left bottom",
    overflow: "hidden"
    // paddingRight: "15px",
    // paddingLeft: "15px"
  };

  return (
    <div>
      <img
        src={`data:image/png;base64,${imgSrc}`}
        style={imgStyle}
        alt={title}
      />
    </div>
  );
};


export default class NewSlider extends Component {
  state = {
    title: this.props.projects[0].title
  };

  next = () => {
    this.slider.slickNext();
  };

  previous = () => {
    this.slider.slickPrev();
  };

  render() {
    const { projects } = this.props;

    const settings = {
      dots: false,
      // fade: true,
      infinite: true,
      speed: 500,
      // autoplay: true,
      // autoplaySpeed: 3000,
      pauseOnHover: false,
      // cssEase: "linear",
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: null,
      prevArrow: null,
      beforeChange: (_oldIndex, newIndex) => {
        this.setState({ title: this.props.projects[newIndex].title });
      }
    };

    const slides = projects.map(({ _id, imgSrc, title }) => (
      <CustomSlide key={_id} imgSrc={imgSrc} title={title} />
    ));

    return (
      <div className="slider">
        <Slider
          style={{ overflow: "hidden" }}
          ref={c => (this.slider = c)}
          {...settings}
        >
          {slides}
        </Slider>
        <SliderBar
          prev={this.previous}
          next={this.next}
          showButtons={true}
          title={this.state.title}
        />
      </div>
    );
  }
}
