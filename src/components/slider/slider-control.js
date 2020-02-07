import React from "react";

import "./slider-control.scss";

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

export default SliderControl;
