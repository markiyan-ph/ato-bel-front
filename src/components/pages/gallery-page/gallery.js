import React, { useEffect, useState } from 'react';
import Content from '../../content';
import Gallery from '../../gallery';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions';
import { useNavigate } from 'react-router-dom';
import { ModalForm, AddProjectForm } from '../../modal-forms';

const GalleryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, popup] = useState(false);
  const {isAdmin} = useSelector(state => state.authorization);
  const modalOpen = () => popup(true);
  const modalClose = () => popup(false);

  const fetchProjects = (page_size, page_num) => {
    dispatch(actions.fetchProjects(page_size, page_num));
  };

  const [pageNum, setPage] = useState(1);
  const projects = useSelector(state => state.projects);
  const listOfPhoto = projects?.projectsList;
  const list = [...listOfPhoto];
  const onImageCardClick = id => navigate(id);
  const addprojectForm = <AddProjectForm />;

  useEffect(() => {
    if (pageNum <= projects?.pages && pageNum > projects?.lastPage) {
      fetchProjects(10, +pageNum);
    }
  }, [pageNum]);

  if (isAdmin && list?.[0]?._id !== "AddNewProject") {
    list.unshift({"_id": "AddNewProject", "title": {uk: "Додати новий проект", en: "Add new project"}, image: "add-512.gif"});
  } 
    
  if (!isAdmin && list?.[0]?._id === "AddNewProject") {
    list.shift();
  }

  return (
    <Content classNames={'flex-child'}>
      <ModalForm show={show} modalClose={modalClose} form={addprojectForm} />
      <Gallery
        images={list.map(project => ({ ...project, imgSrc: `${project._id}/project-img/${project.image}` }))}
        imageCardClick={onImageCardClick}
        addNewProjectClick={modalOpen}
        infinitiveScroll={true}
        infinitiveScrollParams={{
          setPage: setPage,
          isLoading: projects.loading,
          pageNum: pageNum > projects?.lastPage ? +pageNum : +projects?.lastPage,
        }}
        isAdmin={isAdmin}
      />
    </Content>
  );
};

export default GalleryPage;
