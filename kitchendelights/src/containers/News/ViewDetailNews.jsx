import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography } from "@mui/material";
import { RichTextReadOnly } from "mui-tiptap";
import useExtensions from "../../components/Richtext/useExtension.ts";
import { getNewsById } from '../../services/ApiServices';


const ViewDetailNews = (id) => {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const [submittedContent, setSubmittedContent] = useState("");

  const getDetailNews = async () => {
      try {
        const response = await getNewsById(8);
  
        if (response.status === 200) {
          setSubmittedContent(response.data.newsContent);
          console.log(response.data.newsContent);
        } else {
          console.error('Can not get news!');
        }
      } catch (error) {
        console.error('Can not load news data!', error);
      }
    };

  useEffect(() => {
    getDetailNews();
  }, []);

  return (
    <div>
      <RichTextReadOnly content={submittedContent} extensions={extensions} />
    </div>
  );
}
      


export default ViewDetailNews;
