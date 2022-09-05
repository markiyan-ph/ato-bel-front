import React from "react";
// import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SliderButton from "./slider-button";

import "./slider-bar.scss";

const SliderBar = ({ prev, next, showButtons, title }) => {
  const {i18n} = useTranslation();
  const lang = i18n.language;
  // const [lang, setLang] = useState(i18n.language);

  // useEffect(() => {
  //   if (lang !== i18n.language) {
  //     setLang(i18n.language);
  //   }
  // }, [i18n.language]);

  return (
    <div className={`slider-bar d-flex justify-content-${showButtons ? 'between' : 'center'}`}>
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
        {title[lang]}
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
