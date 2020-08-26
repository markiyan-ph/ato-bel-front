import React from "react";
import "./gallery.scss";

/**
 *
 * @param {
 * images: list of images
 * columns: amount of gallery columns
 * containerHeight: height of container in %. Max 100% then container is square
 * placement: relation of image placement
 * titlePlacement: position of image title. Below image or over image.
 * imageCardClick: on click function
 * } param0
 */
const Gallery = ({
  images,
  columns = 3,
  containerHeight = 100,
  placement = "between",
  titlePlacement = "over",
  imageCardClick = null
}) => {
  let imgWidth = 30,
    // imgPaddingBot = 30,
    justifyType = placement === "between" ? "between" : "start",
    galleryStyle = placement === "between" ? {} : { marginBottom: "2rem" };

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

  // imgPaddingBot = (imgWidth * relationship.height) / relationship.width;

  // Define size of image using container width and container padding bottom
  const imgCardStyle = {
    // paddingBottom: `${imgPaddingBot}%`,
    width: `${imgWidth}%`,
  };

  const imgs = images.map(({ _id, imgSrc, title, description }, index) => {
    let imgStyle = {},
      mr,
      mb,
      lastRowStartIndex;

    if (placement === "order" && columns !== 1) {
      columns = columns > 5 ? 3 : columns;
      const lastRowAmount = images.length % columns;
      const lastRow = lastRowAmount === 0 ? columns : lastRowAmount;
      lastRowStartIndex = images.length - lastRow;
      mr = (100 - imgWidth * columns) / (columns - 1);
      mb = mr;

      if ((index + 1) % columns === 0) mr = 0;
      if (index + 1 > lastRowStartIndex) mb = 0;
    }

    const imageTitle = (
      <div
        className={
          titlePlacement === "over" ? "img-text-over" : "img-text-below"
        }
      >
        <div>
          <span>{title}</span>
          <span>{description}</span>
        </div>
      </div>
    );

    return (
      <div
        className="img-card"
        key={_id}
        style={{
          ...imgCardStyle,
          marginBottom: mb === 0 ? 0 : `${mb}%`,
          marginRight: mr === 0 ? 0 : `${mr}%`,
        }}
        onClick={imageCardClick ? () => imageCardClick(_id) : null}
      >
        <div
          className="img-container"
          style={{ paddingBottom: `${containerHeight}%` }}
        >
          <img
            style={imgStyle}
            src={`http://localhost:5000/uploads/${imgSrc}`}
            alt={imgSrc}
          />
          {titlePlacement === "over" ? imageTitle : null}
        </div>
        {titlePlacement === "over" ? null : imageTitle}
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
