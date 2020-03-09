import React from 'react';

import './slider-button.scss';

const SliderButton = ({ onClickAction, spanClass, buttonTitle }) => {
  const btnStyle = {
    background: "transparent",
    border: "0",
    // border: 1px solid $button-colors,
    // borderRadius: "50%",
    color: "#ffffff80"
    // height: "11px",
    // marginLeft: "8px",
    // marginRight: "8px",
    // textAlign: "center",
    // width: "11px"
  };

  // const btnSpanStyle = {
  //   bottom: "20px",
  //   fontSize: "41px",
  //   fontWeight: "bold",
  //   position: "relative"
  // };

  return (
    <button style={btnStyle} onClick={onClickAction}>
      <span className={spanClass}>{buttonTitle}</span>
    </button>
  );
};

export default SliderButton;