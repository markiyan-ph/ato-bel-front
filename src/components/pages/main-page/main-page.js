import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "../../slider";
import { getRandomInt } from '../../../tools/helpers';
import "./main-page.scss";

const MainPage = ({
  projects: { loading, projectsList },
  onFetchProjects,
  onFetchRandomProject
}) => {

  const [projectId, setProjectId] = useState(null);

  useEffect(() => {

    if (projectsList.length === 0) {
      onFetchRandomProject();
      
    } else if (projectsList.length === 1) {
      onFetchProjects();
      setProjectId(projectsList[0]._id);
    
    } else {
      const randProject = getRandomInt(0, projectsList.length);
      setProjectId((prevState) => prevState ? prevState : projectsList[randProject]._id); 
    }
  }, [projectsList, onFetchRandomProject, onFetchProjects]);

  const content = !loading && projectId ? (
    <Slider slides={projectsList} slideId={projectId} />
  ) : (
    <p>Loading... </p>
  );

  return <div className="main-page">{content}</div>;
};

const mapStateToProps = state => {
  return {
    projects: state.projects,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchProjects: () => dispatch(actions.fetchProjects()),
    onFetchRandomProject: () => dispatch(actions.fetchRandomProject())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
