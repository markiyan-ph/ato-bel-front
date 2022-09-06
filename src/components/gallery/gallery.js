import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getServerAPI } from "../../tools/helpers";
import "./gallery.scss";

/**
 *
 * @param {
 * images: list of images
 * imageCardClick: on click function
 * addNewProjectClick: on click function, to add new project
 * showDescription: define if description should be shown
 * infinitiveScroll: boolean
 * infinitiveScrollParams: {setPage: function, isLoading:boolean, pageNum: number}
 * } param0
 */
const Gallery = ({
  images,
  imageCardClick = null,
  addNewProjectClick = null,
  showDescription = false,
  infinitiveScroll = false,
  infinitiveScrollParams = {}
}) => {
  const {isLoading, pageNum, setPage} = infinitiveScrollParams;
  const observer = infinitiveScroll ? useRef() : null;
  const {i18n} = useTranslation();
  const lang = i18n.language;
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

    const imageTitle = (
      <div className="img-text-over" >
        <div>
          <span>{title[lang]}</span>
          {imageTitleDescription}
        </div>
      </div>
    );

    const clickFunction = _id === "AddNewProject" ? addNewProjectClick : imageCardClick;
    
    const projectData = (
      <div
        ref={ images.length === index+1 ? lastItemRef : null }
        className="img-card"
        key={_id}
        onClick={clickFunction ? () => clickFunction(_id) : null}
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

    return projectData;
  });

  return (
    <div
      className="gallery-container"
    >
      {imgs}
    </div>
  );
};

export default Gallery;
