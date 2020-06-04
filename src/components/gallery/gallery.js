import React from "react";
import "./gallery.scss";

const Gallery = ({
  images,
  columns = 3,
  relationship = { height: 1, width: 1 },
  placement = "between",
}) => {
  let imgWidth = 30,
    imgPaddingBot = 30,
    justifyType = placement === "between" ? "between" : "start",
    galleryStyle = placement === 'between' ? {} : {marginBottom: '2rem'};

  // Change width depend on amount of pictures in a row
  // TODO: remove not needed comments
  switch (columns) {
    case 1:
      imgWidth = 100;
      break;

    case 2:
      imgWidth = 48;
      // imgWidth = placement === "between" ? 48 : 50;
      break;

    case 3:
      imgWidth = 27;
      // imgWidth = placement === "between" ? 30 : 33.33;
      break;

    case 4:
      // imgWidth = placement === "between" ? 22 : 25;
      imgWidth = 22;
      break;

    case 5:
      imgWidth = 17;
      break;

    default:
      imgWidth = 31;
      // imgWidth = placement === "between" ? 30 : 33.33;
      break;
  }

  imgPaddingBot = (imgWidth * relationship.height) / relationship.width;

  // Define size of image using container width and container padding bottom
  const imgContainerStyle = {
    paddingBottom: `${imgPaddingBot}%`,
    width: `${imgWidth}%`,
  };

  const imgs = images.map(({ _id, imgSrc }, index) => {
    let imgStyle = {},
      mr,
      mb,
      lastRow;

    if (placement === "order" && columns !== 1) {
      lastRow = images.length - columns;
      columns = columns > 5 ? 3 : columns;
      mr = (100 - imgWidth * columns) / (columns - 1);
      mb = mr;

      if ((index + 1) % columns === 0) mr = 0;
      if (index + 1 > lastRow) mb = 0;
    }

    return (
      <div
        className="img-container"
        style={{
          ...imgContainerStyle,
          marginBottom: mb === 0 ? 0 : `${mb}%`,
          marginRight: mr === 0 ? 0 : `${mr}%`
        }}
        key={_id}
      >
        <img
          style={imgStyle}
          src={`http://localhost:5000/uploads/${imgSrc}`}
          alt={imgSrc}
        />
      </div>
    );
  });

  return (
    // <div style={galleryStyle} className={`gallery-container d-flex flex-wrap justify-content-${justifyType}`}>
    <div
      style={galleryStyle}
      className={`gallery-container d-flex flex-wrap justify-content-${justifyType}`}
    >
      {imgs}
    </div>
  );
};

export default Gallery;
