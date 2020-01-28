import React, { useState } from "react";
import { getRandomInt } from "../../tools/helpers";

import "./slider.scss";

const SliderControl = ({ title, onNext, onPrev }) => {
  return (
    <div className="slide-control d-flex justify-content-between">
      <button onClick={onPrev}>
        <span className="left-arrow">&lsaquo;</span>
        {/* <span className="left-arrow">&lt;</span> */}
      </button>
      <h5>{title}</h5>
      <button onClick={onNext}>
        <span className="right-arrow">&rsaquo;</span>
      </button>
    </div>
  );
};

const Slider = ({ slides }) => {
  const [slideIndex, setSlideIndex] = useState(getRandomInt(0, slides.length));

  const { title, imgSrc } = slides[slideIndex];

  const onNext = () => {
    setSlideIndex(slideIndex =>
      slideIndex === slides.length - 1 ? 0 : slideIndex + 1
    );
  };

  const onPrev = () => {
    setSlideIndex(slideIndex =>
      slideIndex === 0 ? slides.length - 1 : slideIndex - 1
    );
  };

  return (
    <div className="main-page">
      <img src={imgSrc} alt="Projects" />
      <SliderControl title={title} onNext={onNext} onPrev={onPrev} />
    </div>
  );
};

export default Slider;
