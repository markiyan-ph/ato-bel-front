import React from "react";
import Content from "../content";

import "./project-details.scss";

const ProjectsDetails = (props) => {
  const id = props.match.params.id;
  
  return (
    <Content classNames={"flex-child"}>
      <h1>Hello Project Details! Your Id is {id}</h1>
    </Content>
  );
};

export default ProjectsDetails;
