import { Stack } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useSWR, { mutate } from "swr";
function BlogEditor() {
  const [value, setValue] = useState("");
  const [content, setContent] = useState('');
  const handleChange = (html) => {
        setContent(html);
        mutate(html); // Trigger API call with updated content
    };
  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme

    ["clean"], // remove formatting button
  ];

  const module = {
    toolbar: toolbarOptions,
  };
  
  return (
      <ReactQuill modules={module} theme="snow"  style={{ height: '500px' }}  value={content} onChange={handleChange}/>
  );
}
export default BlogEditor;
