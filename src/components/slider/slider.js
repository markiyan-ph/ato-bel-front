import React, { Component } from "react";
import Slider from "react-slick";
import SliderBar from "./slider-bar";

import { isMobile } from '../../tools/helpers';

import "./slider.scss";

const CustomSlide = props => {
  const { imgSrc, title, imgOnload } = props;

  return (
    <div>
      <img
        // src={`data:image/png;base64,${imgSrc}`}
        src={`http://localhost:5000/uploads${imgSrc}`}
        alt={title}
        onLoad={() => imgOnload('done')}
      />
    </div>
  );
};

export default class MSlider extends Component {
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
    const { projects, imgOnload, showButtons } = this.props;

    const settings = {
      accessibility: true,
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
      touchMove: isMobile(),
      focusOnSelect: true,
      beforeChange: (_oldIndex, newIndex) => {
        this.setState({ title: this.props.projects[newIndex].title });
      }
    };

    const slides = projects.map(({ _id, imgSrc, title }) => (
      <CustomSlide key={_id} imgSrc={imgSrc} title={title} imgOnload={imgOnload} />
    ));

    return (
      <div
        className="slider"
        onKeyDown={(e) => {
          if (window.event && window.event.keyCode === 9) {
            e.preventDefault();
            return false;
          }
        }}
      >
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
          showButtons={showButtons}
          title={this.state.title}
        />
      </div>
    );
  }
}
