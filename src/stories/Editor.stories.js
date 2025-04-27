import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

export default {
  title: 'Components/Editor',
  component: SunEditor,
};

export const Default = () => (
  <SunEditor
    setOptions={{
      height: '200px',
      buttonList: [
        ['undo', 'redo'],
        ['font', 'fontSize'],
        ['bold', 'underline', 'italic'],
        ['link', 'image'],
        ['preview']
      ],
    }}
    placeholder="Start typing..."
  />
);