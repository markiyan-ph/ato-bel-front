import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import EditTool from "./edit-tool";
import EditPanel from './edit-panel';
import { ModalForm, TagsForm } from '../modal-forms';
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
  infinitiveScrollParams = {},
  isAdmin = false
}) => {
  const {isLoading, pageNum, setPage} = infinitiveScrollParams;
  const observer = infinitiveScroll ? useRef() : null;
  const {i18n} = useTranslation();
  const lang = i18n.language;
  const [show, popup] = useState(false);
  const modalOpen = () => popup(true);
  const modalClose = () => popup(false);
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

  const tagsForm = <TagsForm />;
  
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

        {(isAdmin && _id !== "AddNewProject") ? <EditTool /> : null}
      
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
    <div className="gallery">
      {isAdmin ? <EditPanel openForm={modalOpen} /> : null}
      <ModalForm show={show} modalClose={modalClose} form={tagsForm} />
      <div
        className="gallery-container"
      >
        {imgs}
      </div>
    </div>
  );
};

export default Gallery;
