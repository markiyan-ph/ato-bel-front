import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "../../slider";
import "./main-page.scss";

const MainPage = ({ projects: {loading, projectsList}, onFetchProjects }) => {
  useEffect(() => {
    onFetchProjects();
  }, [onFetchProjects]);

  const content = !loading ? (
    <Slider slides={projectsList} />
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
    onFetchProjects: () => dispatch(actions.fetchProjects())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
