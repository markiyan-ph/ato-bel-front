import React, { useCallback, useRef } from "react";
import { getServerAPI } from "../../tools/helpers";
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
 * infinitiveScroll: boolean
 * infinitiveScrollParams: {setPage: function, isLoading:boolean, pageNum: number}
 * } param0
 */
const Gallery = ({
  images,
  columns = 3,
  containerHeight = 100,
  placement = "between",
  titlePlacement = "over",
  imageCardClick = null,
  showDescription = false,
  infinitiveScroll = false,
  infinitiveScrollParams = {}
}) => {
  let imgWidth = 30,
    justifyType = placement === "between" ? "between" : "start",
    galleryStyle = placement === "between" ? {} : { marginBottom: "2rem" };
  
  
  // eslint-disable-next-line no-unused-vars
  const {isLoading, pageNum, setPage} = infinitiveScrollParams;
  const observer = infinitiveScroll ? useRef() : null;
  const lastItemRef = infinitiveScroll ? useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(pageNum+1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading]) : null;

  // Change width depend on amount of pictures in a row
  switch (columns) {
    case 1:
      imgWidth = 100;
      break;

    case 2:
      imgWidth = 48;
      break;

    case 3:
      imgWidth = 27;
      break;

    case 4:
      imgWidth = 22;
      break;

    case 5:
      imgWidth = 17;
      break;

    default:
      imgWidth = 31;
      break;
  }

  // Define size of image using container width and container padding bottom
  const imgCardStyle = {
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

    const imageTitleDescription = showDescription ? <span><br />{description}</span> : null;

    const imageTitle = (
      <div
        className={
          titlePlacement === "over" ? "img-text-over" : "img-text-below"
        }
      >
        <div>
          <span>{title}</span>
          {imageTitleDescription}
        </div>
      </div>
    );

    return (
      <div
        ref={ images.length === index+1 ? lastItemRef : null }
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
            src={`${getServerAPI()}/uploads/${imgSrc}`}
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
