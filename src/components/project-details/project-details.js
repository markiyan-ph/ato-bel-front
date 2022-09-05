import React, { useEffect } from "react";
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
  const {loading, data} = useSelector((state) => state.projectData);
  const {isAdmin} = useSelector((state) => state.authorization);
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
        font: ['Arial', 'Comic Sans MS', 'Courier New', 'Georgia', 'GothicA1', 'Impact', 'tahoma', 'Trebuchet MS', 'Verdana'],
        defaultStyle:
          'font-family: GothicA1; font-size: 1em;',
      }}
    />
  );

  return (
    <Content classNames={"flex-child"}>
      <div className="project-details">
        <h1>Hello Project Details! Your Id is {id}</h1>
        {loading ? <h3>Loading...</h3> : null}
        {editor}
      </div>
    </Content>
  );
};

export default ProjectsDetails;
