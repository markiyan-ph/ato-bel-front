import React, { Component } from "react";
import Content from "../../content";
import Gallery from "../../gallery";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class GalleryPage extends Component {
 
  componentDidMount() {
    const {
      onFetchProjects,
    } = this.props;

    onFetchProjects(2, 2);
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

  render() {
    const {
      projects: { projectsList },
      loading
    } = this.props;
    const listOfPhoto = projectsList;

    return (
      <Content classNames={"flex-child"}>
        <Gallery
          images={listOfPhoto}
          columns={2}
          containerHeight={70}
          placement={"order"}
        />
      </Content>
    );
  }
}

const mapStateToProps = ({ projects, loading, error }) => {
  return {
    projects,
    loading,
    error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchProjects: (page_size, page_num) =>
      dispatch(actions.fetchProjects(page_size, page_num)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryPage);
