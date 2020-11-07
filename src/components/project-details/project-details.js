import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import * as actions from "../../store/actions";
import Content from "../content";
import "./project-details.scss";


const ProjectsDetails = () => {
  const { id } = useParams();
  console.log(id);
  // const id = props.match.params.id;
  // const projects = useSelector((state) => state.projects);
  const data = useSelector((state) => state.projectData.data);
  const loading = useSelector((state) => state.projectData.loading);
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
      disable={false}
      showToolbar={true}
      setOptions={{
        buttonList: buttonList,
        // mode: "inline",
        callBackSave: (content) => {
          console.log(JSON.stringify(content));
        },
        stickyToolbar: "75px",
        toolbarWidth: "auto",
        resizingBar: false,
        showPathLabel: false,
        imageUploadUrl: "http://localhost:5000/api/projects/editor/images",
        defaultStyle:
          'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; font-size: 1.3em;',
      }}
      // onChange={(content) => { console.log(JSON.stringify(content)); }}
    />
  );

  return (
    <Content classNames={"flex-child"}>
      <div className="project-details">
        <h1>Hello Project Details! Your Id is {id}</h1>
        {loading ? <h3>Loading...</h3> : editor}
      </div>
    </Content>
  );
};

export default ProjectsDetails;
