import React, { useEffect, useState } from 'react';
import Content from '../../content';
import Gallery from '../../gallery';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';
import { useNavigate } from 'react-router-dom';
import AddProject from '../../add-project';

const GalleryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [show, popup] = useState(false);
  const modalOpen = () => popup(true);
  const modalClose = () => popup(false);

  const fetchProjects = (page_size, page_num) => {
    dispatch(actions.fetchProjects(page_size, page_num));
  };

  const [pageNum, setPage] = useState(1);
  const projects = useSelector(state => state.projects);
  const listOfPhoto = projects?.projectsList;
  const onImageCardClick = id => navigate(id);

  useEffect(() => {
    if (pageNum <= projects?.pages && pageNum > projects?.lastPage) {
      fetchProjects(10, +pageNum);
    }
  }, [pageNum]);

  if (isAdmin && listOfPhoto?.[0]?._id !== "AddNewProject") {
    listOfPhoto.unshift({"_id": "AddNewProject", "title": "AddNewProject", image: "add-512.gif"});
  } 
    
  if (!isAdmin && listOfPhoto?.[0]?._id === "AddNewProject") {
    listOfPhoto.shift();
  }

  return (
    <Content classNames={'flex-child'}>
      <button
        onClick={() => {
          setIsAdmin(currState => !currState);
        }}
      >
        Toggle is admin
      </button>

      <AddProject show={show} modalClose={modalClose} />
      <Gallery
        images={listOfPhoto.map(project => ({ ...project, imgSrc: `${project._id}/project-img/${project.image}` }))}
        imageCardClick={onImageCardClick}
        addNewProjectClick={modalOpen}
        infinitiveScroll={true}
        infinitiveScrollParams={{
          setPage: setPage,
          isLoading: projects.loading,
          pageNum: pageNum > projects?.lastPage ? +pageNum : +projects?.lastPage,
        }}
      />
    </Content>
  );
};

export default GalleryPage;
