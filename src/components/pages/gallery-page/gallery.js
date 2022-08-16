import React, { useEffect, useState } from "react";
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
  
  const [pageNum, setPage] = useState(1);
  const projects = useSelector(state => state.projects);
  const listOfPhoto = projects?.projectsList;
  const onImageCardClick = (id) => navigate(id);

  useEffect(() => {
    if (pageNum <= projects?.pages && pageNum > projects?.lastPage) {
      fetchProjects(10, +pageNum);
    } 
  }, [pageNum]);

  return (
    <Content classNames={"flex-child"}>
      <Gallery
        images={listOfPhoto}
        imageCardClick={onImageCardClick}
        infinitiveScroll = {true}
        infinitiveScrollParams = {{
          setPage: setPage,
          isLoading: projects.loading,
          pageNum: pageNum > projects?.lastPage ? +pageNum : +projects?.lastPage
        }}
      />
    </Content>
  );
};

export default GalleryPage;