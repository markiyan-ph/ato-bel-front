import React, { useState } from "react";
import Slider from "../../slider";
// import { useTranslation } from "react-i18next";
import "./main-page.scss";

const MainPage = () => {
  // const [t] = useTranslation();
  const [state] = useState([
    {
      _id: 1,
      title: "Title1",
      imgSrc: "http://127.0.0.1:5000/04.jpg",
      description: "image description"
    },
    {
      _id: 2,
      title: "Title2",
      imgSrc: "http://127.0.0.1:5000/03.jpg",
      description: "Second Image"
    },
    {
      _id: 3,
      title: "Title3",
      imgSrc: "http://127.0.0.1:5000/final01.jpg",
      description: "Third Image"
    },
    {
      _id: 4,
      title: "Title4",
      imgSrc: "http://127.0.0.1:5000/2.jpg",
      description: "4th Image"
    }
  ]);

  return <Slider slides={state} />;
};

export default MainPage;
