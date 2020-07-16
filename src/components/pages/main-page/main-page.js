import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MSlider from "../../slider";
import {
  getRandomInt,
  getIndexById,
  reorderList
} from "../../../tools/helpers";
import "./main-page.scss";

class NewMainPage extends Component {
  state = {
    projectId: null,
    loadProjects: false
  };

  componentDidMount() {
    const {
      projects: { mainPageProjects },
      onFetchRandomProject
    } = this.props;

    if (mainPageProjects.length === 0) {
      onFetchRandomProject();
      this.setState({ loadProjects: true });
    } else {
      const randProject = getRandomInt(0, mainPageProjects.length);
      this.setState(({ projectId }) => {
        const id = projectId ? projectId : mainPageProjects[randProject]._id;
        return { projectId: id };
      });
    }
  }

  componentDidUpdate(prevState) {
    const {
      projects: { mainPageProjects },
      onFetchProjects
    } = this.props;

    const { loadProjects } = this.state;

    if (prevState.projects.mainPageProjects.length !== mainPageProjects.length) {
      if (mainPageProjects.length === 1 && loadProjects) {
        onFetchProjects();
        this.setState({ projectId: mainPageProjects[0]._id });
      }
    }
  }

  render() {
    const {
      projects: { loading, mainPageProjects },
      error
    } = this.props;
    const { projectId } = this.state;
    const slideIndex = getIndexById(mainPageProjects, projectId);

    const orderedProjectList = reorderList(mainPageProjects, slideIndex);

    if (error) {
      return <h5>Just error.</h5>;
    }
    
    const content =
      !loading && projectId ? (
        <MSlider projects={orderedProjectList} />
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
    onFetchProjects: () => dispatch(actions.fetchMainPageProjects()),
    onFetchRandomProject: () => dispatch(actions.fetchRandomProject())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMainPage);
