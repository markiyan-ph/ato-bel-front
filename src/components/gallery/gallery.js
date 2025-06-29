import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import EditTool from "./edit-tool";
import EditPanel from './edit-panel';
import { ModalForm, TagsForm } from '../modal-forms';
import "./gallery.scss";

/**
 *
 * @param {
 * images: list of images
 * imageCardClick: on click function
 * addNewProjectClick: on click function, to add new project
 * showSubtitle: define if subtitle should be shown
 * infinitiveScroll: boolean
 * infinitiveScrollParams: {setPage: function, isLoading:boolean, pageNum: number}
 * } param0
 */
const Gallery = ({
  images,
  imageCardClick = null,
  addNewProjectClick = null,
  showSubtitle = false,
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
  
  const imgs = images.map(({ _id, imgSrc, title, subtitle }, index) => {
    const imageSubtitle = showSubtitle ? <span className="img-text-subtitle"><br />{subtitle ? subtitle[lang] : null}</span> : null;

    const imageTitle = (
      <div className="img-text-over" >
        <div>
          <span>{title[lang]}</span>
          {imageSubtitle}
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

        {(isAdmin && _id !== "AddNewProject") ? <EditTool projectId={_id} /> : null}
      
        <div
          className="img-container"
        >
          <img
            src={`/${(isAdmin && _id === "AddNewProject") ? 'static' : 'uploads'}/${imgSrc}`}
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
      <ModalForm show={show} modalClose={modalClose} form={tagsForm} formTitle="Tags" />
      <div
        className="gallery-container"
      >
        {imgs}
      </div>
    </div>
  );
};

export default Gallery;
