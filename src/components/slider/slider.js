import React, { useState } from "react";
import { getRandomInt } from "../../tools/helpers";
import { CSSTransition } from "react-transition-group";
import SliderControl from "./slider-control";

import "./slider.scss";

const Slider = ({ slides }) => {
  const [slideIndex, setSlideIndex] = useState(getRandomInt(0, slides.length));
  const [showSlide, setShowSlide] = useState(true);
  const [slideState, setSlideState] = useState("shown");

  const { title, imgSrc } = slides[slideIndex];

  const changeSlide = state => {
    switch (state) {
      case "next":
        setSlideIndex(slideIndex =>
          slideIndex === slides.length - 1 ? 0 : slideIndex + 1
        );
        break;
      case "prev":
        setSlideIndex(slideIndex =>
          slideIndex === 0 ? slides.length - 1 : slideIndex - 1
        );
        break;
      default:
        setSlideState("shown");
    }
  };

  const onNext = () => {
    setShowSlide(false);
    setSlideState("next");
  };

  const onPrev = () => {
    setShowSlide(false);
    setSlideState("prev");
  };

  return (
    <div className="slider">
      <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showSlide}
        appear={true}
        timeout={500}
        classNames="fade"
        onExited={() => {
          changeSlide(slideState);
          setShowSlide(true);
        }}
      >
        <img src={`data:image/png;base64,${imgSrc}`} alt="Projects" />
      </CSSTransition>
      <SliderControl title={title} onNext={onNext} onPrev={onPrev} />
    </div>
  );
};

export default Slider;
