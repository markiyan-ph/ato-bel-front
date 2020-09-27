import React, { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Content from "../content";
import * as actions from "../../store/actions";

import "./project-details.scss";

const ProjectsDetails = (props) => {
  const id = props.match.params.id;
  const projects = useSelector(state => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchProjectById(id));
    
    // eslint-disable-next-line
  }, [id]);

  const project = projects.projectsList[0] ?? {};

  return (
    <Content classNames={"flex-child"}>
      <div className="project-details">
        <h1>Hello Project Details! Your Id is {id}</h1>
        ${JSON.stringify(project)}
      </div>
    </Content>
  );
};

export default ProjectsDetails;
