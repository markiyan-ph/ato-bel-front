import React from "react";
import "./gallery.scss";

const Gallery = ({
  images,
  columns = 3,
  relationship = { height: 1, width: 1 },
  placement = 'between',
}) => {
  let imgWidth = 30,
    imgPaddingBot = 30,
    justifyType = placement === 'between' ? 'between' : 'start';

  // Change width depend on amount of pictures in a row
  switch (columns) {
    case 1:
      imgWidth = 100;
      break;

    case 2:
      imgWidth = placement === "between" ? 48 : 50;
      break;

    case 3:
      imgWidth = placement === "between" ? 30 : 33.33;
      break;

    case 4:
      imgWidth = placement === "between" ? 23 : 25;
      break;

    case 5:
      imgWidth = placement === "between" ? 18 : 20;
      break;

    default:
      imgWidth = placement === "between" ? 30 : 33.33;
      break;
  }

  imgPaddingBot = (imgWidth * relationship.height) / relationship.width;

  // Define size of image using container width and container padding bottom
  const imgSizeStyle = {
    paddingBottom: `${imgPaddingBot}%`,
    width: `${imgWidth}%`
  };

  const imgs = images.map(({ _id, imgSrc }, index) => {
    let imgStyle = {};
    
    if (placement === "order") {
      let pL = 5,
        pR = 5;

      if ((index + 1) % columns === 1) pL = 0;
      if ((index + 1) % columns === 0) pR = 0;

      imgStyle.paddingLeft = `${pL}px`;
      imgStyle.paddingRight = `${pR}px`;
    } else {
      imgSizeStyle.marginBottom = `${2}rem`;
    }
    
    return (
      <div className="img-container" style={imgSizeStyle} key={_id}>
        <img
          style={imgStyle}
          src={`http://localhost:5000/uploads/${imgSrc}`}
          alt={imgSrc}
        />
      </div>
    );
  });

  return (
    <div className={`galery-container d-flex flex-wrap justify-content-${justifyType}`}>
      {imgs}
    </div>
  );
};

export default Gallery;
