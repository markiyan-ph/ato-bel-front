import React from 'react';
import SliderButton from './slider-button';

import './slider-bar.scss';

const SliderBar = ({ prev, next, showButtons, title }) => {
  const sliderBarStyle = {
    background: "#00000080",
    textAlign: "center",
    height: "40px",
    width: "100%",
    position: "fixed",
    bottom: "0"
  };

  return (
    <div style={sliderBarStyle}>
      {showButtons ? (
        <SliderButton
          onClickAction={prev}
          spanClass="left-arrow"
          buttonTitle="&lsaquo;"
        />
      ) : null}
      <span
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          color: "#ffffffbb"
        }}
      >
        {title}
      </span>
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