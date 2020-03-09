import React, { useState, useEffect } from "react";

import { CSSTransition } from "react-transition-group";
import SliderControl from "./slider-control";

import "./slider.scss";

const getIndexById = (array, id) => array.findIndex((proj) => proj._id === id);

const Slider = ({ slides, slideId }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showSlide, setShowSlide] = useState(true);
  const [slideState, setSlideState] = useState("shown");
  
  //console.log(slideIndex);
  const { title, imgSrc } = slides[slideIndex];
  const showButtons = slides.length > 1 ? true : false;

  useEffect(() => {
    setSlideIndex(getIndexById(slides, slideId));

    // const interval = setInterval(() => {
    //   onNext();
    // }, 7000);

    return () => {
      // clearInterval(interval);
    };

  }, [slides, slideId]);

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
      <SliderControl title={title} onNext={onNext} onPrev={onPrev} showButtons={showButtons} />
    </div>
  );
};

export default Slider;
