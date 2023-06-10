import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'code'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'code',
];

function TextEditor({ content, onChange, placeholder }) {
  return (
    <ReactQuill
      style={{
        backgroundColor: 'white', height: '150px', width: '100%', marginBottom: '20px', border: 'none',
      }}
      theme="snow"
      value={content || ''}
      modules={modules}
      formats={formats}
      onChange={onChange}
      placeholder={placeholder || 'Write something...'}
    />
  );
}

export default TextEditor;
