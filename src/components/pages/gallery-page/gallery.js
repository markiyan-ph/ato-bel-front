import React, { Component } from "react";
import Content from "../../content";
import Gallery from "../../gallery";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { withRouter } from 'react-router-dom';
import { compose } from "redux";

class GalleryPage extends Component {

  componentDidMount() {
    const {
      onFetchProjects,
    } = this.props;

    onFetchProjects(2, 1);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const {
  //     projects: { projectsList },
  //   } = this.props;

  //   console.log('====prevState', prevState.projects.length);
  //   console.log('====projectsList',projectsList.length);
  //   if (prevState.projects.length !== projectsList.length) {
  //     this.setState(({projects}) => {
  //       return {
  //         projects: [...projects, ...projectsList]
  //       };
  //     });
  //   }
  // }

  onImageCardClick = (id) => {
    const { history } = this.props;

    history.push(id);
  };

  render() {
    const {
      projectsList,
    } = this.props;
    const listOfPhoto = projectsList;

    return (
      <Content classNames={"flex-child"}>
        <Gallery
          images={listOfPhoto}
          columns={2}
          containerHeight={100}
          placement={"order"}
          imageCardClick={this.onImageCardClick}
        />
      </Content>
    );
  }
}

const mapStateToProps = ({ projects: { projectsList, loading, error } }) => {
  return {
    projectsList,
    loading,
    error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProjects: (page_size, page_num) =>
      dispatch(actions.fetchProjects(page_size, page_num))
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(GalleryPage);
