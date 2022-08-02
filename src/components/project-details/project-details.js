import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import * as actions from "../../store/actions";
import Content from "../content";
import { getServerAPI } from '../../tools/helpers';
import "./project-details.scss";


const ProjectsDetails = () => {
  const { id } = useParams();
  const data = useSelector((state) => state.projectData.data);
  const loading = useSelector((state) => state.projectData.loading);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchProjectDetails(id));
    // eslint-disable-next-line
  }, [id]);

  // const project = projects.projectsList[0] ?? {};

  const buttonList = [
    ["undo", "redo"],
    ["font", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike", "blockquote"],
    ["removeFormat"],
    ["outdent", "indent"],
    // "/", // Line break
    ["align", "horizontalRule", "list", "lineHeight"],
    ["table", "link", "image"], // You must add the 'katex' library at options to use the 'math' plugin. // You must add the "imageGalleryUrl".
    /** ['imageGallery'] */ ["fullScreen", "showBlocks", "codeView", "save"],
    // ["preview", "print"],
    // ["save", "template"],
  ];

  const editor = (
    <SunEditor
      width="100%"
      height="auto"
      autoFocus={true}
      placeholder="Please type here..."
      setContents={data}
      // appendContents={data}
      hide={loading ? true : false}
      disable={!isAdmin}
      hideToolbar={!isAdmin}
      setOptions={{
        buttonList: buttonList,
        // mode: "inline",
        callBackSave: (data) => {
          dispatch(actions.saveProjectDetails(id, data));
        },
        stickyToolbar: "75px",
        toolbarWidth: "auto",
        resizingBar: false,
        showPathLabel: false,
        imageUploadUrl: `${getServerAPI()}/api/projects/editor/images/${id}`,
        defaultStyle:
          'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; font-size: 1.3em;',
      }}
    />
  );

  return (
    <Content classNames={"flex-child"}>
      <button onClick={ () => { setIsAdmin(currState => !currState); } }>Toggle is admin</button>
      <div className="project-details">
        <h1>Hello Project Details! Your Id is {id}</h1>
        {loading ? <h3>Loading...</h3> : null}
        {editor}
      </div>
    </Content>
  );
};

export default ProjectsDetails;
