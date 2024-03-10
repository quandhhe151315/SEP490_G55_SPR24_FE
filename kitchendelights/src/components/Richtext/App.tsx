import React from 'react';
import {
  Box,
  createTheme,
  useMediaQuery,
  type PaletteMode,
} from "@mui/material";
import { ReactElement , useMemo, useState, useRef } from "react";
import {Editor} from '../Richtext/Editor.tsx';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ClassicButton from "../Button/ClassicButton.jsx";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Modal } from "@mui/material";
import useExtensions from "../Richtext/useExtension.ts";
import {
  RichTextEditor,
  RichTextReadOnly,
  type RichTextEditorRef,
} from "mui-tiptap";

const AppCreateNews = ({title, setContent, handleCreateNews}) => {
  const systemSettingsPrefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(
    systemSettingsPrefersDarkMode ? "dark" : "light"
  );
  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          secondary: {
            main: "#42B81A",
          },
        },
      }),
    [paletteMode]
  );
  return (
      <Box sx={{ p: 3, maxWidth: 1207, margin: "0 auto" }}>
        <Editor title={title} setContent={setContent} handleCreateNews={handleCreateNews}/>
      </Box>
  );
};

const TitleContentUI = ({ text, children }) => {
  return (
    <Typography>
      <span style={{ color: '#ff5e00', fontWeight: 'bold', fontSize: '20px' }}>
        {text}
      </span>
      {children}
    </Typography>
  );
};

const AppCreateRecipe = () => {
  const [rowsNL, setRowsNL] = useState<ReactElement[]>([]);
  const [rowsBL, setRowsBL] = useState<ReactElement[]>([]);

  const [title, setTitle] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [imageIntro, setImageIntro] = useState('');
  const [timeAmountPrepare, setTimeAmountPrepare] = useState('');
  const [timeUnitPrepare, setTimeUnitPrepare] = useState('');
  const [timeAmountCook, setTimeAmountCook] = useState('');
  const [timeUnitCook, setTimeUnitCook] = useState('');
  const [amountPeopleEat, setAmountPeopleEat] = useState('');
  const [videoCooking, setVideoCooking] = useState('');

  const [recipeContent, setRecipeContent] = useState(new Array(4).fill(''));
  const [recipeLength, setRecipeLength] = useState(3);

  const rteRef = useRef<RichTextEditorRef>(null);
  const handleAddRowClickNL = () => {
    setRowsNL(prevRows => [...prevRows, 
    <Grid container spacing={2} sx={{marginTop: '2px', marginLeft: '2px'}}>
      <Grid item xs={6}>
      <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Chọn nguyên liệu" InputProps={{sx: {borderRadius: '15px'}}} />
      </Grid>
      <Grid item xs={6}>
      <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập định lượng (ví dụ: 300g)" InputProps={{sx: {borderRadius: '15px'}}} />
      </Grid>
    </Grid>
    ]);
  };

  const handleAddRowClickBL = () => {
    handleCreateNewRecipeContent();
    handleCreateNewRecipeContent();
    setRowsBL(prevRows => [...prevRows, 
    <Grid container spacing={2} sx={{marginTop: '2px', marginLeft: '2px'}}>
      <Grid item xs={6}>
      <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Ghi chi tiết cách làm" InputProps={{sx: {borderRadius: '15px'}}} onChange={(event) => handleChangeRecipeContent(recipeLength + 1, event.target.value)}/>
      </Grid>
      <Grid item xs={6}>
      <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Thêm ảnh cho từng bước" InputProps={{sx: {borderRadius: '15px'}}} onChange={(event) => handleChangeRecipeContent(recipeLength + 2, event.target.value)}/>
      </Grid>
    </Grid>
    ]);
    setRecipeLength(recipeLength + 2);
  };

  const handleChangeRecipeContent = (id, value) => {
    setRecipeContent(prevRecipeContent => {
      if (prevRecipeContent.length > 0) {
        const updatedRecipeContent = [...prevRecipeContent];
        updatedRecipeContent[id] = value;
        return updatedRecipeContent;
      } else {

        return prevRecipeContent;
      }
    });
  }

  const handleCreateNewRecipeContent = () => {
    setRecipeContent(prevRecipeContent => [...prevRecipeContent,'']);
  }

  const systemSettingsPrefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );

  // const contentRes =
  // '<h2><span style="font-size: 18px">' + title + '</span></h2><p></p><ul><li><p><span style="font-size: 18px">Thời gian chuẩn bị: ' + timeAmountPrepare + " " + timeUnitPrepare +'</span></p><p></p></li><li><p><span style="font-size: 18px">Thời gian nấu: '+ timeAmountCook + " " + timeUnitCook + '</span></p><p></p></li><li><p><span style="font-size: 18px">Khẩu phần ăn: '+ amountPeopleEat +' người</span></p></li></ul><p></p>';
    
  // const contentRecipes =
  // '<p><strong><span style="font-size: 18px">Bước 1: </span></strong><span style="font-size: 18px">Bạn bắc lên bếp 1 nồi nước và cho vào nồi hành tím đã đập dập rồi nấu trên bếp ở nhiệt độ cao. Khi nước sôi, bạn cho thịt bò và xương heo đã sơ chế vào và chần khoảng 3 phút để loại bỏ mùi hôi. Sau đó, bạn vớt thịt ra và cho ngay vào </span><a target="_blank" rel="noopener" href="https://www.dienmayxanh.com/chen-bat-to-canh"><span style="font-size: 18px">tô</span></a><span style="font-size: 18px"> nước lạnh. </span><span style="color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 18px">Không nên chọn mua xương heo có màu tái, mùi hôi lạ và khi cầm lên thì thấy nhớt.</span></p><p></p><img height="auto" style="text-align: center; aspect-ratio: 1.74672 / 1" src="blob:http://localhost:3000/4bf33ca2-8317-4e7c-8c0d-a9253fb836c1" alt="so-che-cac-nguyen-lieu-khac-30.jpg" width="800"></li></ul><p></p>' + 
  // '<p><strong><span style="font-size: 18px">Bước 2: </span></strong><span style="font-size: 18px">Bạn bắc lên bếp 1 nồi nước và cho vào nồi hành tím đã đập dập rồi nấu trên bếp ở nhiệt độ cao. Khi nước sôi, bạn cho thịt bò và xương heo đã sơ chế vào và chần khoảng 3 phút để loại bỏ mùi hôi. Sau đó, bạn vớt thịt ra và cho ngay vào </span><a target="_blank" rel="noopener" href="https://www.dienmayxanh.com/chen-bat-to-canh"><span style="font-size: 18px">tô</span></a><span style="font-size: 18px"> nước lạnh. </span><span style="color: rgb(51, 51, 51); font-family: Arial, Helvetica, sans-serif; font-size: 18px">Không nên chọn mua xương heo có màu tái, mùi hôi lạ và khi cầm lên thì thấy nhớt.</span></p><p></p><img height="auto" style="text-align: center; aspect-ratio: 1.47059 / 1" src="blob:http://localhost:3000/683877f0-d2e5-425f-b8dc-6fc428a55469" alt="so-che-va-chan-thit.jpg" width="800"></li></ul><p></p>';
  let contentRecipes = '';

  const handleCreateNewRecipe = () => {
    
    // console.log(title + introduction + "/" + timeAmountPrepare + timeUnitPrepare + "/" + timeAmountCook + timeUnitCook + "/" + amountPeopleEat + videoCooking);
    recipeContent.forEach((value, index) => {
      let num = index + 1;
      contentRecipes += '<p><strong><span style="font-size: 18px">Bước '+ num +': </span></strong><span style="font-size: 18px">'+ value +'</span></p><p></p><img height="auto" style="text-align: center; aspect-ratio: 1.74672 / 1" src="blob:http://localhost:3000/4bf33ca2-8317-4e7c-8c0d-a9253fb836c1" alt="so-che-cac-nguyen-lieu-khac-30.jpg" width="800"></li></ul><p></p>';
      // console.log(`Giá trị của phần tử thứ ${index} là: ${value}`);
    });

    console.log(contentRecipes);
  }

  const [open, setOpen] = useState(false);
  const [submittedContent, setSubmittedContent] = useState("");
  const handleCloseRawNews = () => {
    setOpen(false);
  };
  const handleOpenRawNews = () => {
    setOpen(true);
  };

  const extensions = useExtensions({
    placeholder: "Nội dung của bạn ...",
  });
  

  return (
    <>
      <Box sx={{ p: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TitleContentUI text="Tiêu đề">
            <TextField value={title} onChange={(event) => setTitle(event.target.value)} required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập tiêu đề" InputProps={{sx: {borderRadius: '15px'}}} />
            </TitleContentUI>
          </Grid>
          <Grid item xs={6}>
            <TitleContentUI text="Miêu tả sơ bộ">
            <TextField value={introduction} onChange={(event) => setIntroduction(event.target.value)} required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập miêu tả" InputProps={{sx: {borderRadius: '15px'}}} />
            </TitleContentUI>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{marginTop: '1%'}}>
          <Grid item xs={12}>
            <TitleContentUI text="Ảnh giới thiệu">
            <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Chọn ảnh" InputProps={{sx: {borderRadius: '15px'}}} />
            </TitleContentUI>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{marginTop: '5%'}}>
          <Grid item xs={6}>

            <TitleContentUI text="Thời gian chuẩn bị món">
            <TextField value={timeAmountPrepare} onChange={(event) => setTimeAmountPrepare(event.target.value)} required id="outlined-required" sx={{ width: '70%'}} placeholder="Nhập thời gian" InputProps={{sx: {borderRadius: '15px'}}} />
            <Select 
              onChange={(event) => setTimeUnitPrepare(event.target.value)}
              value={timeUnitPrepare} 
              sx={{ width: '25%',  borderRadius: '15px', marginLeft: '5%'}}  
              >
              <MenuItem value={"Phút"}>Phút</MenuItem>
              <MenuItem value={"Giờ"}>Giờ</MenuItem>
              <MenuItem value={"Ngày"}>Ngày</MenuItem>
            </Select>
            </TitleContentUI>
            
          </Grid>
          <Grid item xs={6}>
            <TitleContentUI text="Thời gian nấu món ăn">

            <TextField value={timeAmountCook} onChange={(event) => setTimeAmountCook(event.target.value)} required id="outlined-required" sx={{ width: '70%'}} placeholder="Nhập thời gian" InputProps={{sx: {borderRadius: '15px'}}} />
            <Select 
              onChange={(event) => setTimeUnitCook(event.target.value)}
              value={timeUnitCook} 
              sx={{ width: '25%',  borderRadius: '15px', marginLeft: '5%'}}  
              >
              <MenuItem value={"Phút"}>Phút</MenuItem>
              <MenuItem value={"Giờ"}>Giờ</MenuItem>
              <MenuItem value={"Ngày"}>Ngày</MenuItem>
            </Select>

            </TitleContentUI>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{marginTop: '1%'}}>
          <Grid item xs={6}>
            <TitleContentUI text="Số người phục vụ">
            <TextField value={amountPeopleEat} onChange={(event) => setAmountPeopleEat(event.target.value)} required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập số người phục vụ" InputProps={{sx: {borderRadius: '15px'}}} />
            </TitleContentUI>
          </Grid>
          <Grid item xs={6}>
            <TitleContentUI text="Link video nấu ăn">
            <TextField value={videoCooking} onChange={(event) => setVideoCooking(event.target.value)} required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập link video nấu ăn" InputProps={{sx: {borderRadius: '15px'}}} />
            </TitleContentUI>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{marginTop: '5%'}}>
          <Grid item xs={12}>
            <Typography sx={{ color: '#ff5e00', fontWeight: 'bold', fontSize: '20px', marginBottom: '1%'}}>
              Nguyên liệu
            </Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '1%'}}>
            Nhập một thành phần trên mỗi dòng. Bao gồm số lượng (ví dụ: cốc, thìa) và bất kỳ chế phẩm đặc biệt nào (ví dụ: rây, làm mềm, cắt nhỏ). Sử dụng các tiêu đề tùy chọn để sắp xếp các phần khác nhau của công thức (ví dụ: Bánh, Kem phủ kem, Nước sốt).
            </Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '1%'}}>
            Hãy ấn nút “thêm dòng nguyên liệu” để hiện thêm nguyên liệu và nhập định lượng cần dùng cho từng bước. 
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={6}>
      <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Chọn nguyên liệu" InputProps={{sx: {borderRadius: '15px'}}} />
      </Grid>
      <Grid item xs={6}>
      <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập định lượng (ví dụ: 300g)" InputProps={{sx: {borderRadius: '15px'}}} />
      </Grid>
            </Grid>
            <Grid container spacing={2} sx={{marginTop: '1%'}}>
            <Grid item xs={6}>
      <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Chọn nguyên liệu" InputProps={{sx: {borderRadius: '15px'}}} />
      </Grid>
      <Grid item xs={6}>
      <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập định lượng (ví dụ: 300g)" InputProps={{sx: {borderRadius: '15px'}}} />
      </Grid>
            </Grid>

            {rowsNL.map((rowsNL, index) => (
              <Grid container spacing={2} sx={{ marginTop: '1%' }} key={index}>
                {rowsNL}
              </Grid>
            ))}
            <ClassicButton text="Thêm dòng nguyên liệu" top="1%" width="20%" onClick={handleAddRowClickNL} />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{marginTop: '5%'}}>
          <Grid item xs={12}>
            <Typography sx={{ color: '#ff5e00', fontWeight: 'bold', fontSize: '20px', marginBottom: '1%'}}>
              Cách làm
            </Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '1%'}}>
            Giải thích cách thực hiện công thức nấu ăn của bạn, bao gồm nhiệt độ lò nướng, thời gian nướng hoặc nấu cũng như kích thước chảo, v.v. Sử dụng các tiêu đề tùy chọn để sắp xếp các phần khác nhau của công thức (ví dụ: Chuẩn bị, Nướng, Trang trí).
            </Typography>
            <Typography sx={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '1%'}}>
            Hãy nhập cách làm xuống ô bên dưới hoặc thêm vài cách bằng cách ăn nút “thêm cách làm” và thêm ảnh nếu cần cho từng bước.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
              <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Ghi chi tiết cách làm" InputProps={{sx: {borderRadius: '15px'}}} onChange={(event) => handleChangeRecipeContent(0, event.target.value)}/>
              </Grid>
              <Grid item xs={6}>
              <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Thêm ảnh cho từng bước" InputProps={{sx: {borderRadius: '15px'}}} onChange={(event) => handleChangeRecipeContent(1, event.target.value)}/>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{marginTop: '1%'}}>
              <Grid item xs={6}>
              <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Ghi chi tiết cách làm" InputProps={{sx: {borderRadius: '15px'}}} onChange={(event) => handleChangeRecipeContent(2, event.target.value)}/>
              </Grid>
              <Grid item xs={6}>
              <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Thêm ảnh cho từng bước" InputProps={{sx: {borderRadius: '15px'}}} onChange={(event) => handleChangeRecipeContent(3, event.target.value)}/>
              </Grid>
            </Grid>

            {rowsBL.map((rowsBL, index) => (
              <Grid container spacing={2} sx={{ marginTop: '1%' }} key={index}>
                {rowsBL}
              </Grid>
            ))}
            <ClassicButton text="Thêm bước làm" top="1%" width="20%" onClick={handleAddRowClickBL} />
          </Grid>
        </Grid>
        <ClassicButton text="Xem truớc công thức nấu ăn" width="25%" left="75%" top="5%" onClick={() => {
          handleCreateNewRecipe();
                    setSubmittedContent(
                      contentRecipes
                    );
                    handleOpenRawNews();
                  }}/>
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
              <ClassicButton text="Tạo mới công thức nấu ăn" left="1000px" top="30px" />
            </Box>
          </Modal>
        </>
      )}
      </>
  );
};


export {AppCreateRecipe, AppCreateNews};