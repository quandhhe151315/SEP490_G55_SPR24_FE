import React from 'react';
import { Lock, LockOpen, TextFields } from "@mui/icons-material";
import { Modal, Box, Stack, Typography } from "@mui/material";
import type { EditorOptions } from "@tiptap/core";
import { useCallback, useRef, useState } from "react";
import ClassicButton from '../Button/ClassicButton.jsx'
import {
  LinkBubbleMenu,
  MenuButton,
  RichTextEditor,
  RichTextReadOnly,
  TableBubbleMenu,
  insertImages,
  type RichTextEditorRef,
} from "mui-tiptap";
import EditorMenuControls from "../Richtext/EditorMenuControls.tsx";
import useExtensions from "../Richtext/useExtension.ts";


function fileListToImageFiles(fileList: FileList): File[] {
  return Array.from(fileList).filter((file) => {
    const mimeType = (file.type || "").toLowerCase();
    return mimeType.startsWith("image/");
  });
}

function Editor({ title, setContent, handleCreateNews }) {
  const extensions = useExtensions({
    placeholder: "Add your own content here...",
  });
  const rteRef = useRef<RichTextEditorRef>(null);
  const [isEditable, setIsEditable] = useState(true);
  const [showMenuBar, setShowMenuBar] = useState(true);
  
const exampleContent =
  '<h2><span style="font-size: 18px">Một điều tôi học được khi sống ở khu Canarsie ở Brooklyn, NY là nấu một bữa ăn Ý ngon. Đây là công thức tôi tạo ra sau khi ăn món này ở nhà hàng. Thưởng thức!</span></h2><p></p><ul><li><p><span style="font-size: 18px">Thời gian chuẩn bị: 15 phút</span></p><p></p></li><li><p><span style="font-size: 18px">Thời gian nấu: 15 phút</span></p><p></p></li><li><p><span style="font-size: 18px">Khẩu phần ăn: 4 người</span></p></li></ul><p></p>'
   + '<h4><strong><span style="color: rgb(255, 71, 0); font-size: 30px">Nguyên liệu chế biến:</span></strong></h4><p></p><ul><li><p><span style="font-size: 18px">400g thịt bò</span></p><p></p></li><li><p><span style="font-size: 18px">800g phở</span></p><p></p></li><li><p><span style="font-size: 18px">400g xương heo</span></p><p></p></li><li><p><span style="font-size: 18px">200g hành tây</span></p><p></p></li><li><p><span style="font-size: 18px">200g đường</span></p><p></p></li><li><p><span style="font-size: 18px">100g hành lá</span></p><p></p></li><li><p><span style="font-size: 18px">50g gia vị</span></p></li></ul><p></p><h4><strong><span style="color: rgb(255, 71, 0); font-size: 30px">Cách làm:</span></strong></h4><p></p><ul><li><p><strong><span style="font-size: 18px">Bước 1:</span></strong><span style="font-size: 18px"> Bạn bắc lên bếp 1 nồi nước và cho vào nồi hành tím đã đập dập rồi nấu trên bếp ở nhiệt độ cao. Khi nước sôi, bạn cho thịt bò và xương heo đã sơ chế vào và chần khoảng 3 phút để loại bỏ mùi hôi. Sau đó, bạn vớt thịt ra và cho ngay vào </span><a target="_blank" rel="noopener" href="https://www.dienmayxanh.com/chen-bat-to-canh"><span style="font-size: 18px">tô</span></a><span style="font-size: 18px"> nước lạnh. </span><span style="color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 18px">Không nên chọn mua xương heo có màu tái, mùi hôi lạ và khi cầm lên thì thấy nhớt.</span></p><p></p><img height="auto" style="text-align: center; aspect-ratio: 1.74672 / 1" src="blob:http://localhost:3000/4bf33ca2-8317-4e7c-8c0d-a9253fb836c1" alt="so-che-cac-nguyen-lieu-khac-30.jpg" width="800"></li></ul><p></p><ul><li><p><strong><span style="font-size: 18px">Bước 2: </span></strong><span style="font-size: 18px">Bạn bắc lên bếp 1 nồi nước và cho vào nồi hành tím đã đập dập rồi nấu trên bếp ở nhiệt độ cao. Khi nước sôi, bạn cho thịt bò và xương heo đã sơ chế vào và chần khoảng 3 phút để loại bỏ mùi hôi. Sau đó, bạn vớt thịt ra và cho ngay vào </span><a target="_blank" rel="noopener" href="https://www.dienmayxanh.com/chen-bat-to-canh"><span style="font-size: 18px">tô</span></a><span style="font-size: 18px"> nước lạnh. </span><span style="color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 18px">Không nên chọn mua xương heo có màu tái, mùi hôi lạ và khi cầm lên thì thấy nhớt.</span></p><p></p><img height="auto" style="text-align: center; aspect-ratio: 1.47059 / 1" src="blob:http://localhost:3000/683877f0-d2e5-425f-b8dc-6fc428a55469" alt="so-che-va-chan-thit.jpg" width="800"></li></ul><p></p><ul><li><p><strong><span style="font-size: 18px">Bước 3: </span></strong><span style="font-size: 18px">Bạn bắc lên bếp 1 nồi nước và cho vào nồi hành tím đã đập dập rồi nấu trên bếp ở nhiệt độ cao. Khi nước sôi, bạn cho thịt bò và xương heo đã sơ chế vào và chần khoảng 3 phút để loại bỏ mùi hôi. Sau đó, bạn vớt thịt ra và cho ngay vào </span><a target="_blank" rel="noopener" href="https://www.dienmayxanh.com/chen-bat-to-canh"><span style="font-size: 18px">tô</span></a><span style="font-size: 18px"> nước lạnh. </span><span style="color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 18px">Không nên chọn mua xương heo có màu tái, mùi hôi lạ và khi cầm lên thì thấy nhớt.</span></p></li></ul><p></p><p></p><p></p><p></p>';

  const handleNewImageFiles = useCallback(
    (files: File[], insertPosition?: number): void => {
      if (!rteRef.current?.editor) {
        return;
      }

      // For the sake of a demo, we don't have a server to upload the files to,
      // so we'll instead convert each one to a local "temporary" object URL.
      // This will not persist properly in a production setting. You should
      // instead upload the image files to your server, or perhaps convert the
      // images to bas64 if you would like to encode the image data directly
      // into the editor content, though that can make the editor content very
      // large. You will probably want to use the same upload function here as
      // for the MenuButtonImageUpload `onUploadFiles` prop.
      const attributesForImageFiles = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));

      insertImages({
        images: attributesForImageFiles,
        editor: rteRef.current.editor,
        insertPosition,
      });
    },
    []
  );

  // Allow for dropping images into the editor
  const handleDrop: NonNullable<EditorOptions["editorProps"]["handleDrop"]> =
    useCallback(
      (view, event, _slice, _moved) => {
        if (!(event instanceof DragEvent) || !event.dataTransfer) {
          return false;
        }

        const imageFiles = fileListToImageFiles(event.dataTransfer.files);
        if (imageFiles.length > 0) {
          const insertPosition = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          })?.pos;

          handleNewImageFiles(imageFiles, insertPosition);

          // Return true to treat the event as handled. We call preventDefault
          // ourselves for good measure.
          event.preventDefault();
          return true;
        }

        return false;
      },
      [handleNewImageFiles]
    );

  // Allow for pasting images
  const handlePaste: NonNullable<EditorOptions["editorProps"]["handlePaste"]> =
    useCallback(
      (_view, event, _slice) => {
        if (!event.clipboardData) {
          return false;
        }

        const pastedImageFiles = fileListToImageFiles(
          event.clipboardData.files
        );
        if (pastedImageFiles.length > 0) {
          handleNewImageFiles(pastedImageFiles);
          // Return true to mark the paste event as handled. This can for
          // instance prevent redundant copies of the same image showing up,
          // like if you right-click and copy an image from within the editor
          // (in which case it will be added to the clipboard both as a file and
          // as HTML, which Tiptap would otherwise separately parse.)
          return true;
        }

        // We return false here to allow the standard paste-handler to run.
        return false;
      },
      [handleNewImageFiles]
    );

  const [submittedContent, setSubmittedContent] = useState("");
  const [open, setOpen] = useState(false);
  const handleCloseRawNews = () => {
    setOpen(false);
  };
  const handleOpenRawNews = () => {
    setOpen(true);
  };
  
  return (
    <>
      <Box
        sx={{
          border: '1px solid #c9c9c9',
          borderRadius: '15px',
          paddingLeft: '20px',
          paddingRight: '20px',
          "& .ProseMirror": {
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              scrollMarginTop: showMenuBar ? 50 : 0,
            },
          },
        }}
      >
        <RichTextEditor
          ref={rteRef}
          extensions={extensions}
          content={exampleContent}
          editable={isEditable}
          editorProps={{
            handleDrop: handleDrop,
            handlePaste: handlePaste,
          }}
          renderControls={() => <EditorMenuControls />}
          
          RichTextFieldProps={{
            variant: "standard",
            
            MenuBarProps: {
              hide: !showMenuBar,
            },
            footer: (
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  borderTopStyle: "solid",
                  borderTopWidth: 1,
                  borderTopColor: (theme) => theme.palette.divider,
                  py: 1,
                  px: 1.5,
                }}
              >
                <MenuButton
                  value="formatting"
                  tooltipLabel={
                    showMenuBar ? "Hide formatting" : "Show formatting"
                  }
                  size="small"
                  onClick={() =>
                    setShowMenuBar((currentState) => !currentState)
                  }
                  selected={showMenuBar}
                  IconComponent={TextFields}
                />

                <MenuButton
                  value="formatting"
                  tooltipLabel={
                    isEditable
                      ? "Prevent edits (use read-only mode)"
                      : "Allow edits"
                  }
                  size="small"
                  onClick={() => setIsEditable((currentState) => !currentState)}
                  selected={!isEditable}
                  IconComponent={isEditable ? Lock : LockOpen}
                />

                <ClassicButton text="Lưu bản nháp"
                  onClick={() => {
                    setSubmittedContent(
                      rteRef.current?.editor?.getHTML() ?? ""
                      
                    );
                    setContent(
                      rteRef.current?.editor?.getHTML() ?? ""
                    );
                    handleOpenRawNews();
                  }}
                >
                </ClassicButton>
              </Stack>
            ),
          }}
        >
          {() => (
            <>
              <LinkBubbleMenu />
              <TableBubbleMenu />
            </>
          )}
        </RichTextEditor>
      </Box>
      
      {submittedContent && (
        <>
          <Modal
            open={open}
            onClose={handleCloseRawNews}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 1200,
                height: 700,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                overflowY: 'auto',
                border: '2px solid #ff5e00', 
                borderRadius: '15px',
                padding: '35px',
                
              }}
            >
              <Typography variant="h6" component="h2" gutterBottom sx={{color: '#ff5e00', fontWeight: 'bold', fontSize: '29px', textAlign: 'center'}}>
                {title}
              </Typography>
              <Box mt={3}>
                <RichTextReadOnly
                  content={submittedContent}
                  extensions={extensions}
                />
              </Box>
              <ClassicButton text="Đăng tin tức" left="1000px" top="30px" onClick={handleCreateNews}/>
            </Box>
          </Modal>
        </>
      )}

    </>
  );
}

export {Editor }; 