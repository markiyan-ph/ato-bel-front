import React from "react";
import SliderButton from "./slider-button";

import "./slider-bar.scss";

const SliderBar = ({ prev, next, showButtons, title }) => {
  return (
    <div className="slider-bar d-flex justify-content-between">
      {showButtons ? (
        <SliderButton
          onClickAction={prev}
          spanClass="left-arrow"
          buttonTitle="&lsaquo;"
        />
      ) : null}
      <div
        className="slider-title"
      >
        {title}
      </div>
      {showButtons ? (
        <SliderButton
          onClickAction={next}
          spanClass="right-arrow"
          buttonTitle="&rsaquo;"
        />
      ) : null}
    </div>
  );
};

export default SliderBar;
