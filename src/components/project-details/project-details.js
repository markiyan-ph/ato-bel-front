import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Content from "../content";
import * as actions from "../../store/actions";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import InlineEditor from '../../tools/ckeditor5/build/ckeditor';
import "./project-details.scss";

const ProjectsDetails = (props) => {
  const id = props.match.params.id;
  const projects = useSelector(state => state.projects);
  const dispatch = useDispatch();
  const [editorData, setEditorData] = useState(''); 

  const editorConfigurations = {
    simpleUpload: {
      uploadUrl: "http://localhost:5000/api/projects/ckeditor/images",
      withCredentials: false
    },
    image: {
      // Configure the available styles.
      styles: [
        'alignLeft', 'alignCenter', 'alignRight'
      ],

      // Configure the available image resize options.
      resizeOptions: [
        {
          name: 'imageResize:original',
          label: 'Original',
          value: null
        },
        {
          name: 'imageResize:50',
          label: '50%',
          value: '50'
        },
        {
          name: 'imageResize:75',
          label: '75%',
          value: '75'
        }
      ],

      // You need to configure the image toolbar, too, so it shows the new style
      // buttons as well as the resize buttons.
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'imageResize',
        '|',
        'imageTextAlternative'
      ]
    }
  };

  useEffect(() => {
    dispatch(actions.fetchProjectById(id));

    // eslint-disable-next-line
  }, [id]);

  const project = projects.projectsList[0] ?? {};

  const jsonData = {"data":"<p>Hello from CKEditor 5!</p><p>Some new Editor &nbsp;Details.</p><figure class=\"image image_resized image-style-align-right\" style=\"width:26.54%;\"><img src=\"http://localhost:5000/uploads/ckeditor-img/d63df2694a0e968c4d322e74a33b1a6d\"></figure><p>It's quite interesting how will it work with big amount of data and a lot of pictures.</p><p>&nbsp;</p><p>Now we need to define some text</p><figure class=\"image\"><img src=\"http://localhost:5000/uploads/ckeditor-img/f0ee784132ba9a9026cbde0ff53fc54c\"></figure><p>After we can add something else.&nbsp;</p>"};
  
  return (
    <Content classNames={"flex-child"}>
      <div className="project-details">
        <h1>Hello Project Details! Your Id is {id}</h1>
        {JSON.stringify(project)}

        <h2>Using CKEditor 5 build in React</h2>
        <CKEditor
          editor={InlineEditor}
          // data="<p>Hello from CKEditor 5!</p>"
          data={jsonData.data}
          config={editorConfigurations}
          onReady={editor => {
            // editor.isReadOnly = true;
            // You can store the "editor" and use when it is needed.
            const data = editor.getData();
            setEditorData(JSON.stringify(data));
            console.log('Editor is ready to use!', editor);
          }} 
          onChange={(event, editor) => {
            const data = editor.getData();
            setEditorData(JSON.stringify(data));
            console.log(JSON.stringify({data}));
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
        <button onClick={() => {console.log(editorData);}}>Save button</button>
      </div>
    </Content>
  );
};

export default ProjectsDetails;
