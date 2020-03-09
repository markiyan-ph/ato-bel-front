import React from "react";

import "./slider-button.scss";

const SliderButton = ({ onClickAction, spanClass, buttonTitle }) => {
  return (
    <button className="slider-button" onClick={onClickAction}>
      <span className={spanClass}>{buttonTitle}</span>
    </button>
  );
};

export default SliderButton;
