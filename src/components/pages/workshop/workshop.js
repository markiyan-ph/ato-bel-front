import React from "react";
import Content from "../../content";
import Footer from "../../footer";
import Gallery from "../../gallery";
import "./workshop.scss";

const ConmpanyInfo = ({ imgSrc }) => {
  return (
    <div className="company-info d-flex align-items-center">
      <div className="group-photo">
        <img src={imgSrc} alt="whole team" />
      </div>
      <div className="description">
        <span className="description-text">
          <h5>
            Проектна Майстерня Бєляєвих - архітектурна практика, що за 12 років
            розширилася із суто сімейної справи у об’єднання із 10 архітекторів,
            що розділяють схожі професійні цінності.
          </h5>
          <p>
            В доробку майстерні - понад півсотні реалізованих проектів у Львові,
            Києві, Рівному, Черкасах, Астані (Казахстан) та багатьох інших
            локаціях. Це - житлові та громадські інтер’єри, однородинні та
            багатоквартирні житлові будинки, відпочинкові комплекси,
            містобудівні концепції, музейні експозиції, тощо...
          </p>
          <p>
            В останні кілька років ми зосередилися на проектуванні міського,
            переважно - житлового середовища, намагаючись дбати про його якість
            на усіх рівнях: від містобудівного до інтер’єру окремих помешкань та
            просторів спільного користування.
          </p>
          <p>
            Такий підхід знаходить своїх поціновувачів не лише серед Замовників
            і покупців, але й серед професійної спільноти. Наші проекти
            здобувають призові місця на відкритих та закритих архітектурних
            конкурсах; їх було відзначено кількома міжнародними та національними
            преміями, зокрема - IPA (International Property Awards) у номінації
            кращий житловий комплекс в Україні та UUA (Ukrainian Urban Awards)
            де у 2018 р. наша майстерня здобула 4 призових місця, з яких - дві
            перші премії (найбільше з усіх учасників).
          </p>
        </span>
      </div>
    </div>
  );
};

// TODO: Load data from the server
const Workshop = () => {
  const listOfPhoto = [
    {
      _id: 1,
      title: "Андрій",
      imgSrc: "workshop/people/Андрій ФБ_1.jpg",
      description: "image description",
    },
    {
      _id: 2,
      title: "Тарас",
      imgSrc: "workshop/people/Тарас_ФБ_1.jpg",
      description: "Second Image",
    },
    {
      _id: 3,
      title: "ОксанаК",
      imgSrc: "workshop/people/ОксанаК_ФБ_1.jpg",
      description: "Third Image",
    },
    {
      _id: 4,
      title: "Дмитро",
      imgSrc: "workshop/people/Дмитро_ФБ_1.jpg",
      description: "loremAmet officia et et laboris eiusmod excepteur consectetur eiusmod fugiat ipsum labore aliqua aliquip. Lorem voluptate quis laborum qui laborum deserunt anim sunt elit.",
      // description: "1234",
    },
    {
      _id: 5,
      title: "Липа",
      imgSrc: "workshop/people/Липа_ФБ_1.jpg",
      description: "Second Image",
    },
    {
      _id: 6,
      title: "Марічка",
      imgSrc: "workshop/people/Марічка_ФБ_1.jpg",
      description: "Third Image",
    },
    {
      _id: 7,
      title: "Остап",
      imgSrc: "workshop/people/Остап_ФБ_1.jpg",
      description: "4th Image",
    },
    {
      _id: 8,
      title: "Галя",
      imgSrc: "workshop/people/Галя_ФБ_1.jpg",
      description: "4th Image",
    },
    {
      _id: 9,
      title: "Оксана",
      imgSrc: "workshop/people/Оксана_ФБ_1.jpg",
      description: "4th Image",
    },
  ];

  return (
    <div className="wrapper">
      <Content classNames={"flex-child"}>
        <ConmpanyInfo imgSrc="http://localhost:5000/uploads/workshop/ATO-Bel-Team.jpg" />

        <Gallery
          images={listOfPhoto}
          columns={5}
          relationship={{ height: 1, width: 1 }}
          placement={'order'}
        />
      </Content>
      <Footer />
    </div>
  );
};

export default Workshop;
