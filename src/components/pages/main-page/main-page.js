import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "../../slider";
import { getRandomInt } from "../../../tools/helpers";
import "./main-page.scss";

class MainPage extends Component {

  state = {
    projectId: null,
    loadProjects: false
  };

  componentDidMount() {
    const {
      projects: { projectsList },
      onFetchRandomProject
    } = this.props;

    if (projectsList.length === 0) {
      onFetchRandomProject();
      this.setState({ loadProjects: true });
    } else {
      const randProject = getRandomInt(0, projectsList.length);
      this.setState(({projectId}) => {
        const id = projectId ? projectId : projectsList[randProject]._id;
        return { projectId: id };
      });
    }
  }

  componentDidUpdate(prevState) {
    const {
      projects: { projectsList },
      onFetchProjects
    } = this.props;

    const { loadProjects } = this.state;

    if (prevState.projects.projectsList.length !== projectsList.length) {
      if (projectsList.length === 1 && loadProjects) {
        onFetchProjects();
        this.setState({ projectId: projectsList[0]._id });
      }
    }
  }

  render() {
    const {
      projects: { loading, projectsList }
    } = this.props;
    const { projectId } = this.state;
    const content =
      !loading && projectId ? (
        <Slider slides={projectsList} slideId={projectId} />
      ) : (
        <p>Loading... </p>
      );

    return <div className="main-page">{content}</div>;
  }
}
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
