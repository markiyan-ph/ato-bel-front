import React, { useCallback, useRef } from "react";
import { getServerAPI } from "../../tools/helpers";
import "./gallery.scss";

/**
 *
 * @param {
 * images: list of images
 * imageCardClick: on click function
 * showDescription: define if description should be shown.
 * infinitiveScroll: boolean
 * infinitiveScrollParams: {setPage: function, isLoading:boolean, pageNum: number}
 * } param0
 */
const Gallery = ({
  images,
  imageCardClick = null,
  showDescription = false,
  infinitiveScroll = false,
  infinitiveScrollParams = {}
}) => {
  const {isLoading, pageNum, setPage} = infinitiveScrollParams;
  const observer = infinitiveScroll ? useRef() : null;
  const spaceBetween = 5; // space between cards in px
  const columns = 4; // amount of columns
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

  const imgs = images.map(({ _id, imgSrc, title, description }, index) => {
    const imageTitleDescription = showDescription ? <span><br />{description}</span> : null;
    let pr = spaceBetween,
      pb = index + 1 > images.length - columns ? 0 : spaceBetween;

    const imageTitle = (
      <div className="img-text-over" >
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
        onClick={imageCardClick ? () => imageCardClick(_id) : null}
        style={{paddingRight: `${pr}px`, paddingBottom: `${pb}px`}}
      >
        <div
          className="img-container"
        >
          <img
            src={`${getServerAPI()}/uploads/${imgSrc}`}
            alt={imgSrc}
          />
          {imageTitle}
        </div>
      </div>
    );
  });

  return (
    <div
      className="gallery-container d-flex flex-wrap justify-content-between"
    >
      {imgs}
    </div>
  );
};

export default Gallery;
