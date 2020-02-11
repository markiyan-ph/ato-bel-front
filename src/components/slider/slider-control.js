import React from "react";

import "./slider-control.scss";

const SliderButton = ({ onClickAction, spanClass, buttonTitle }) => {
  return (
    <button onClick={onClickAction}>
      <span className={spanClass}>{buttonTitle}</span>
      {/* <span className="left-arrow">&lt;</span> */}
    </button>
  );
};

const SliderControl = ({ title, showButtons, onNext, onPrev }) => {
  const prevButton = (
    <SliderButton
      onClickAction={onPrev}
      spanClass="left-arrow"
      buttonTitle="&lsaquo;"
    />
  );

  const nextButton = (
    <SliderButton
      onClickAction={onNext}
      spanClass="right-arrow"
      buttonTitle="&rsaquo;"
    />
  );

  return (
    <div className="slide-control d-flex justify-content-between">
      {showButtons && prevButton}
      <h5>{title}</h5>
      {showButtons && nextButton}
    </div>
  );
};

export default SliderControl;
