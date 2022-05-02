import React, { useEffect } from "react";
import Content from "../../content";
import Gallery from "../../gallery";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { useNavigate } from 'react-router-dom';

const GalleryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const fetchProjects = (page_size, page_num) => {
    dispatch(actions.fetchProjects(page_size, page_num));
  };
  const listOfPhoto = useSelector(state => state.projects?.projectsList);
  const onImageCardClick = (id) => navigate(id);

  useEffect(() => {
    fetchProjects(2, 1);
  }, []);

  return (
    <Content classNames={"flex-child"}>
      <Gallery
        images={listOfPhoto}
        columns={2}
        containerHeight={100}
        placement={"order"}
        imageCardClick={onImageCardClick}
      />
    </Content>
  );
};

export default GalleryPage;