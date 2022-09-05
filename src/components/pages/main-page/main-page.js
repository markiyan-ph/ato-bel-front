import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import MSlider from "../../slider";
import "./main-page.scss";

const MainPage = () => {
  const dispatch = useDispatch();
  const {
    projects: { mainPageProjects },
  } = useSelector(state => state);
  
  const fetchMainPageProjects = () => dispatch(actions.fetchMainPageProjects());
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

  useEffect(() => {
    fetchMainPageProjects();
  }, [mainPageProjects.length]);

  const initialSlide = randomInt(0, mainPageProjects.length-1);

  const content = mainPageProjects.length > 0 ? 
    (<MSlider 
      projects={
        mainPageProjects.map(
          project => ({...project, imgSrc: `${project._id}/project-main-img/${project.image}`})
        )} 
      showButtons={true} 
      initialSlide={initialSlide}
    />)
    : <p>Loading...</p>;
  
  return content;
};

export default MainPage;
