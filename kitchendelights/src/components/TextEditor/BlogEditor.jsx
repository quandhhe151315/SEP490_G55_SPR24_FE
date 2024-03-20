import { Stack } from "@mui/material";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useSWR, { mutate } from "swr";
import styles from "./editor.module.css";

function BlogEditor({ onChange, value, style }) {
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
    <ReactQuill
      modules={module}
      theme="snow"
      style={{ height: "400px", ...style }}
      value={value}
      onChange={onChange}
      className={styles.fixHeightCk}
    />
  );
}
export default BlogEditor;
