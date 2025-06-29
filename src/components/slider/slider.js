import React, { useRef, useState } from "react";
import Slider from "react-slick";
import SliderBar from "./slider-bar";

import { isMobile } from '../../tools';

import "./slider.scss";

const CustomSlide = props => {
  const { _id, imgSrc, title } = props;

  return (
    <div key={_id}>
      <img
        src={`/uploads/${imgSrc}`}
        alt={title}
      />
    </div>
  );
};

function MSlider ({projects, showButtons, initialSlide}) {
  const [title, setTitle] = useState(projects[initialSlide].title);
  const slider = useRef(null);

  const next = () => {
    slider.current.slickNext();
  };

  const previous = () => {
    slider.current.slickPrev();
  };
  
  const settings = {
    // accessibility: true,
    dots: false,
    // fade: true,
    infinite: false,
    speed: 800,
    // autoplay: true,
    // autoplaySpeed: 3000,
    // lazyLoad: true,
    pauseOnHover: false,
    // cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    touchMove: isMobile(),
    initialSlide,
    // focusOnSelect: true,
    beforeChange: (_oldIndex, newIndex) => {
      setTitle(projects[newIndex].title);
    }
  };

  const slides = projects.map(({ _id, imgSrc, title }) => (
    <CustomSlide key={_id} imgSrc={imgSrc} title={title} />
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
        ref={slider}
        {...settings}
      >
        {slides}
      </Slider>
      <SliderBar
        prev={previous}
        next={next}
        showButtons={showButtons}
        title={title}
      />
    </div>
  );
}

export default MSlider;