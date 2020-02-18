import React from "react";
import Content from "../../content";
import Footer from "../../footer";
import "./workshop.scss";

const ConmpanyInfo = ({ imgSrc }) => {
  return (
    <div className="company-info d-flex align-items-center">
      <div className="group-photo">
        <img src={imgSrc} alt="whole team" />
      </div>
      <div className="description">
        <span className="description-text">
          ATO-bel architects - молода практика, що розпочала свою творчу
          діяльність в 2004 році. Партнери Андрій, Тарас та Оксана Бєляєві -
          рідні брати та сестра.
        </span>
      </div>
    </div>
  );
};

// TODO: Move Gallery to other file. 
const Gallery = ({ images }) => {
  const imgs = images.map(({imgSrc, _id}) => {
    return (
      <div className="img-container" key={_id}>
        {/* <img src={`http://localhost:5000/uploads/${imgSrc}`} alt={imgSrc} /> */}
      </div>
    );
  });

  return (
    <div className="galery-container d-flex flex-wrap justify-content-between">
      {imgs}
    </div>
  );
};

// TODO: Load data from the server
const Workshop = () => {
  const listOfPhoto = [
    {
      "_id": 1,
      "title": "Реконструкція аквапарку!!!!!",
      "imgSrc": "04.jpg",
      "description": "image description"
    },
    {
      "_id": 2,
      "title": "Приватна резиденція в м. Дубно",
      "imgSrc": "03.jpg",
      "description": "Second Image"
    },
    {
      "_id": 3,
      "title": "Апартамент готель. Зелена 67",
      "imgSrc": "final01.jpg",
      "description": "Third Image"
    },
    {
      "_id": 4,
      "title": "Магнолія Spring",
      "imgSrc": "2.jpg",
      "description": "4th Image"
    }
  ];

  return (
    <React.Fragment>
      <Content>
        <ConmpanyInfo imgSrc="http://localhost:5000/uploads/workshop/2.jpg" />

        <Gallery images={listOfPhoto} />
      </Content>
      <Footer />
    </React.Fragment>
  );
};

export default Workshop;
