import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import * as actions from "../../store/actions";
import Content from "../content";
import "./project-details.scss";

// const projectDetailsObj = {
//   detailMainImage: '/uploads/63581e7be801e095c85b4d5b/project-main-img/MG_HEADER_1920x587.jpeg',
//   projectInfo: {
//     title: 'Villa Magnolia',
//     text: 'The project is located in Lviv (Ukraine), in the south-eastern district of the city, just 7 km away from the city center. The designed area is part of a mixed-use urban block, that needs both densification and intensification. It is directly adjacent to the major city road from the South and surrounded by now degraded green area of former cooperative gardens from the other sides.',
//     specifications: [
//       {
//         _id: Date.now(),
//         name: 'Location',
//         value: 'Lviv, Ukraine',
//       },
//       {
//         _id: Date.now(),
//         name: 'Year',
//         value: '2016',
//       },
//       {
//         _id: Date.now(),
//         name: 'Area',
//         value: '0,000 m²',
//       },
//       {
//         _id: Date.now(),
//         name: 'Client',
//         value: 'Vash Dim',
//       },
//     ],
//   },
//   images: [
//     {
//       _id: Date.now(),
//       img: '/uploads/63581e7be801e095c85b4d5b/project-img/b051b5b7eb61becdeaae058b1015d412',
//       imgTitle: 'Magnolia day light',
//       imgDescription:
//         'Cupidatat aliquip commodo deserunt minim ad ut veniam eu ipsum fugiat minim. Fugiat do velit magna laboris adipisicing dolor excepteur sunt in do esse consequat. Ullamco cupidatat laborum duis minim nisi adipisicing anim ullamco in ullamco magna sit dolore aliquip. Voluptate nulla ea ex velit proident.',
//     },
//     {
//       _id: Date.now(),
//       img: '/uploads/633aeab5b5da11ddf089bbce/project-img/e80ef1e6427656e4a83e847f2f10f349',
//       imgTitle: 'Not Magnolia at all',
//       imgDescription: '',
//     },
//   ],
// };

// console.log(projectDetailsObj);

const ProjectsDetails = () => {
  const { id } = useParams();
  const {data} = useSelector((state) => state.projectData);
  const {isAdmin} = useSelector((state) => state.authorization);
  const dispatch = useDispatch();
  const [showEditor, setShowEditor] = useState(false);

  // setTimeout(() => {setShowEditor(true);}, 0);

  useEffect(() => {
    dispatch(actions.fetchProjectDetails(id));
    // eslint-disable-next-line
  }, [id]);

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
      className="sun-mark"
      height="auto"
      autoFocus={true}
      placeholder="Please type here..."
      setContents={data}
      // appendContents={data}
      disableToolbar={!isAdmin}
      disable={!isAdmin}
      hideToolbar={!isAdmin}
      onLoad={() => setShowEditor(true)}
      setOptions={{
        buttonList: buttonList,
        // mode: "inline",
        callBackSave: (data) => {
          dispatch(actions.updateProjectDetails(id, data));
        },
        stickyToolbar: "75px",
        toolbarWidth: "auto",
        resizingBar: false,
        showPathLabel: false,
        imageUploadUrl: `/api/projects/editor/images/${id}`,
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
        {/* {loading ? <h3>Loading...</h3> : null} */}
        <div className="editor-wrapper" style={showEditor ? {display: 'block'} : {display: 'none'}}>
          {editor}
        </div>
      </div>
    </Content>
  );
};

export default ProjectsDetails;
