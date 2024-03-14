import React from 'react';
import {
  Box,
  createTheme,
  useMediaQuery,
  type PaletteMode,
} from "@mui/material";
import { ReactElement , useMemo, useState, useRef,useEffect } from "react";
import {Editor} from '../Richtext/Editor.tsx';
import { listAllIngredient } from '../../services/ApiServices.jsx';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ClassicButton from "../Button/ClassicButton.jsx";
import TextField from '@mui/material/TextField';
import { Modal } from "@mui/material";
import useExtensions from "../Richtext/useExtension.ts";
import {
  RichTextReadOnly,
  type RichTextEditorRef,
} from "mui-tiptap";
import Autocomplete from '@mui/material/Autocomplete';
import Cookies from 'js-cookie';

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
  const [featuredImage, setFeaturedImage] = useState('');
  const [timeAmountPrepare, setTimeAmountPrepare] = useState('');
  const [timeAmountCook, setTimeAmountCook] = useState('');
  const [amountPeopleEat, setAmountPeopleEat] = useState('');
  const [videoCooking, setVideoCooking] = useState('');

  type RecipeContent = {
    RecipeStepContent: string,
    RecipeImage: string,

  };
  const [recipeContent, setRecipeContent] = useState<Array<RecipeContent>>(
    Array.from({ length: 2 }, (_, index) => ({ RecipeStepContent: '', RecipeImage: '' }))
  );
  const [recipeLength, setRecipeLength] = useState(1);

  // recipeIngredient data send
  type RecipeIngredient = {
    ingredientId: number,
    unitValue: number,
  };
  const [recipeIngredientDataSend, setRecipeIngredientDataSend] = useState<Array<RecipeIngredient>>(
    Array.from({ length: 2 }, (_, index) => ({ ingredientId: 0, unitValue: 0 }))
  );
  const [recipeIngredientDataSendLength, setRecipeIngredientDataSendLength] = useState(1);
  //

// recipeIngredient data view
  type RecipeIngredientView = {
    ingredientName: string,
    unitValue: number,
  };
  const [recipeIngredientView, setRecipeIngredientView] = useState<Array<RecipeIngredientView>>(
    Array.from({ length: 2 }, (_, index) => ({ ingredientName: '', unitValue: 0 }))
  );
  const [recipeIngredientLength, setRecipeIngredientLength] = useState(1);

  const handleAPICreateNewRecipe = async () => {
    // try {
    //   const response = await createRecipe(Cookies.get('userId'),featuredImage, introduction, videoCooking, title, timeAmountPrepare, timeAmountCook, amountPeopleEat, recipeContent, true, 0, recipeIngredientDataSend);
    //   if (response.status === 200) {
    //     console.log('Create recipe successful! ');
    //   } else {

    //   }
    // } catch (error) {
    //   console.error('Can not create recipe!', error);
    // }
  }

  // data Ingredient
  type Ingredient = {
    ingredientId: number,
    ingredientName: string,
    ingredientUnit: string,
    ingredientStatus: number,
    ingredientMarketplaces: any[]
  };
  const [dataIngredients, setDataIngredients] = useState<Ingredient[]>([]);
  const getListIngredient = async () => {
    try {
      const response = await listAllIngredient();
      if (response.status === 200) {
        setDataIngredients(response.data);
      } else {
        console.error('Can not Load news! ');
      }
    } catch (error) {
      console.error('Can not load news data!', error);
    }
  };
  useEffect(() => {
    getListIngredient();
  }, []);
  
  const rteRef = useRef<RichTextEditorRef>(null);
  const handleAddRowClickNL = () => {
    handleCreateNewRecipeIngredientView();
    handleCreateNewRecipeIngredientDataSend();
    setRowsNL(prevRows => [...prevRows, 
      <Grid container spacing={2} sx={{marginTop: '2px', marginLeft: '2px'}}>
      <Grid item xs={6}>
      <Autocomplete
              disablePortal
              size="small"
              options={dataIngredients}
              getOptionLabel={(option) => option.ingredientName}
              onChange={(event, option) => handleChangeRecipeIngredientName(recipeIngredientLength+1, option?.ingredientId, option?.ingredientName)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.ingredientName}
                </Box>
              )}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Chọn nguyên liệu" sx={{ borderRadius: '15px' }}/>}
            />
      </Grid>
      <Grid item xs={6}>
          <TextField required id="outlined-size-small" size="small" sx={{ width: '100%',}} placeholder="Nhập định lượng (đơn vị là gam)" onChange={(event) => handleChangeRecipeIngredientUnit(recipeIngredientLength + 1, event.target.value)}/>
      </Grid>
  </Grid>
    ]);
    setRecipeIngredientLength(recipeIngredientLength + 1);
    setRecipeIngredientDataSendLength(recipeIngredientDataSendLength + 1);
  };

  const handleChangeRecipeIngredientName = (id,ingredientId, value) => {
    console.log(value);
    setRecipeIngredientDataSend(prevRecipeIngre => {
      if (prevRecipeIngre.length > 0) {
        const updatedRecipeIngre = [...prevRecipeIngre];
        updatedRecipeIngre[id].ingredientId = ingredientId;
        return updatedRecipeIngre;
      } else {

        return prevRecipeIngre;
      }
    });
    setRecipeIngredientView(prevRecipeIngre => {
      if (prevRecipeIngre.length > 0) {
        const updatedRecipeIngre = [...prevRecipeIngre];
        updatedRecipeIngre[id].ingredientName = value;
        return updatedRecipeIngre;
      } else {

        return prevRecipeIngre;
      }
    });
  }

  const handleChangeRecipeIngredientUnit = (id, value) => {
    setRecipeIngredientDataSend(prevRecipeIngre => {
      if (prevRecipeIngre.length > 0) {
        const updatedRecipeIngre = [...prevRecipeIngre];
        updatedRecipeIngre[id].unitValue = value;
        return updatedRecipeIngre;
      } else {

        return prevRecipeIngre;
      }
    });

    setRecipeIngredientView(prevRecipeIngre => {
      if (prevRecipeIngre.length > 0) {
        const updatedRecipeIngre = [...prevRecipeIngre];
        updatedRecipeIngre[id].unitValue = value;
        return updatedRecipeIngre;
      } else {

        return prevRecipeIngre;
      }
    });
  }

  const handleCreateNewRecipeIngredientView = () => {
    setRecipeIngredientView(prevRecipeIngre => [...prevRecipeIngre,{ ingredientName: '', unitValue: 0 }]);
  }

  const handleCreateNewRecipeIngredientDataSend = () => {
    setRecipeIngredientDataSend(prevRecipeIngre => [...prevRecipeIngre,{ ingredientId: 0, unitValue: 0 }]);
  }

  const handleAddRowClickBL = () => {
    handleCreateNewRecipeContent();
    setRowsBL(prevRows => [...prevRows, 
    <Grid container spacing={2} sx={{marginTop: '2px', marginLeft: '2px'}}>
      <Grid item xs={8}>
      <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Ghi chi tiết cách làm" onChange={(event) => handleChangeRecipeContent(recipeLength + 1, event.target.value)}/>
      </Grid>

              <Grid item xs={4}>
              <input
        type="file"
        accept="image/*"
        id={`upload-file-${recipeLength + 1}`}
        style={{ display: 'none' }}
        onChange={(event) => handleFileChange(event, recipeLength + 1)}
      />
                <label htmlFor={`upload-file-${recipeLength + 1}`} className="custom-upload-button">
                  {selectedFileName || 'Chọn ảnh'}
                </label>
              </Grid>

    </Grid>
    ]);
    setRecipeLength(recipeLength + 1);
  };

  const handleChangeRecipeContent = (id, value) => {
    setRecipeContent(prevRecipeContent => {
      if (prevRecipeContent.length > 0) {
        const updatedRecipeContent = [...prevRecipeContent];
        updatedRecipeContent[id].RecipeStepContent = value;
        return updatedRecipeContent;
      } else {

        return prevRecipeContent;
      }
    });
  }

  const handleChangeRecipeImage = (id, value) => {
    setRecipeContent(prevRecipeContent => {
      if (prevRecipeContent.length > 0) {
        const updatedRecipeContent = [...prevRecipeContent];
        updatedRecipeContent[id].RecipeImage = value;
        return updatedRecipeContent;
      } else {
        return prevRecipeContent;
      }
    });
  }

  const handleCreateNewRecipeContent = () => {
    setRecipeContent(prevRecipeContent => [...prevRecipeContent,{ RecipeStepContent: '', RecipeImage: '' }]);
  }

  const systemSettingsPrefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );

  let contentRecipes =
  '<h2><span style="font-size: 18px">' + introduction + '</span></h2><p></p><ul><li><p><span style="font-size: 18px">Thời gian chuẩn bị: ' + timeAmountPrepare + ' phút</span></p><p></p></li><li><p><span style="font-size: 18px">Thời gian nấu: '+ timeAmountCook +' phút</span></p><p></p></li><li><p><span style="font-size: 18px">Khẩu phần ăn: '+ amountPeopleEat +' người</span></p></li></ul><p></p>'
  +'<h4><strong><span style="color: rgb(255, 71, 0); font-size: 30px">Nguyên liệu chế biến:</span></strong></h4></br>';

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

  const [selectedFileName, setSelectedFileName] = useState('');

  const handleFileChange = (event, id) => {

    const file = event.target.files[0];
    if (file) {
      
      setSelectedFileName(file.name);
      if (file.type.startsWith('image/')) {
        handleChangeRecipeImage(id,  URL.createObjectURL(file));
      } else {
      }
    }
};

  const [featuredImageName, setFeaturedImageName] = useState('');
const handleFeaturesImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    
    setFeaturedImageName(file.name);
    if (file.type.startsWith('image/')) {
      setFeaturedImage(URL.createObjectURL(file));
    } else {
    }
  }
};

const handleViewCreateNewRecipe = () => {
    for (let index = 0; index < recipeIngredientView.length; index ++) {
      contentRecipes += '<ul><li><p><span style="font-size: 18px">'+recipeIngredientView[index].ingredientName+' '+recipeIngredientView[index].unitValue+' gam</span></p></li></ul></br>';
    };

    contentRecipes += '</br><h4><strong><span style="color: rgb(255, 71, 0); font-size: 30px">Cách làm:</span></strong></h4></br>';

    let num = 1;
    for (let index = 0; index < recipeContent.length; index ++) {
      contentRecipes += '<p><strong><span style="font-size: 18px">Bước '+ num +': </span></strong><span style="font-size: 18px">'+ recipeContent[index].RecipeStepContent +'</span></p><p></p><img height="auto" style="text-align: center; aspect-ratio: 1.74672 / 1" src='+recipeContent[index].RecipeImage+' alt="Ảnh" width="700"></li></ul><p></p>';
      num ++;
    };
  }

  return (
    <>
      <Box sx={{ p: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TitleContentUI text="Tiêu đề">
            <TextField value={title} onChange={(event) => setTitle(event.target.value)} required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập tiêu đề"/>
            </TitleContentUI>
          </Grid>
          <Grid item xs={4}>
            <Typography sx={{color: '#ff5e00', fontWeight: 'bold', fontSize: '20px'}}>

      Ảnh giới thiệu

      </Typography>
      <input
        type="file"
        accept="image/*"
        id="upload-feature-image"
        style={{ display: 'none' }}
        onChange={(event) => handleFeaturesImageChange(event)}
      />
                <label htmlFor="upload-feature-image" className="custom-upload-button">
                  {featuredImageName || 'Chọn ảnh'}
                </label>
              </Grid>
        </Grid>
        <Grid container spacing={2} sx={{marginTop: '1%'}}>
          <Grid item xs={12}>
            
            <TitleContentUI text="Miêu tả sơ bộ">
            <TextField value={introduction} onChange={(event) => setIntroduction(event.target.value)} required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập miêu tả" />
            </TitleContentUI>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{marginTop: '5%'}}>
          <Grid item xs={6}>

            <TitleContentUI text="Thời gian chuẩn bị món">
            <TextField value={timeAmountPrepare} onChange={(event) => setTimeAmountPrepare(event.target.value)} required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập thời gian (đơn vị là phút)" />
            
            </TitleContentUI>
            
          </Grid>
          <Grid item xs={6}>
            <TitleContentUI text="Thời gian nấu món ăn">

            <TextField value={timeAmountCook} onChange={(event) => setTimeAmountCook(event.target.value)} required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập thời gian (đơn vị là phút)" />
            

            </TitleContentUI>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{marginTop: '1%'}}>
          <Grid item xs={6}>
            <TitleContentUI text="Số người phục vụ">
            <TextField value={amountPeopleEat} onChange={(event) => setAmountPeopleEat(event.target.value)} required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập số người phục vụ" />
            </TitleContentUI>
          </Grid>
          <Grid item xs={6}>
            <TitleContentUI text="Link video nấu ăn">
            <TextField value={videoCooking} onChange={(event) => setVideoCooking(event.target.value)} required id="outlined-required" sx={{ width: '100%'}} placeholder="Nhập link video nấu ăn" />
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
            <Autocomplete
              disablePortal
              size="small"
              options={dataIngredients}
              getOptionLabel={(option) => option.ingredientName}
              onChange={(event, option) => handleChangeRecipeIngredientName(0, option?.ingredientId, option?.ingredientName)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.ingredientName}
                </Box>
              )}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Chọn nguyên liệu" sx={{ borderRadius: '15px' }}/>}
            />
      </Grid>
      
      <Grid item xs={6}>
      <TextField required id="outlined-size-small" size="small" sx={{ width: '100%',}} placeholder="Nhập định lượng (đơn vị là gam)" onChange={(event) => handleChangeRecipeIngredientUnit(0, event.target.value)}/>
      </Grid>

            </Grid>
            <Grid container spacing={2} sx={{marginTop: '1%'}}>
            <Grid item xs={6}>
            <Autocomplete
              disablePortal
              size="small"
              options={dataIngredients}
              getOptionLabel={(option) => option.ingredientName}
              onChange={(event, option) => handleChangeRecipeIngredientName(1, option?.ingredientId, option?.ingredientName)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  {option.ingredientName}
                </Box>
              )}
              sx={{ width: '100%' }}
              renderInput={(params) => <TextField {...params} label="Chọn nguyên liệu" sx={{ borderRadius: '15px' }} />}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField required id="outlined-size-small" size="small" sx={{ width: '100%',}} placeholder="Nhập định lượng (đơn vị là gam)" onChange={(event) => handleChangeRecipeIngredientUnit(1, event.target.value)}/>
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
              <Grid item xs={8}>
              <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Ghi chi tiết cách làm" onChange={(event) => handleChangeRecipeContent(0, event.target.value)}/>
              </Grid>
              <Grid item xs={4}>
              <input
        type="file"
        accept="image/*"
        id="upload-file-0"
        style={{ display: 'none' }}
        onChange={(event) => handleFileChange(event, 0)}
      />
                <label htmlFor="upload-file-0" className="custom-upload-button">
                  {selectedFileName || 'Chọn ảnh'}
                </label>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{marginTop: '1%'}}>
              <Grid item xs={8}>
              <TextField required id="outlined-required" sx={{ width: '100%'}} placeholder="Ghi chi tiết cách làm" onChange={(event) => handleChangeRecipeContent(1, event.target.value)}/>
              </Grid>
              <Grid item xs={4}>
              <input
        type="file"
        accept="image/*"
        id="upload-file-1"
        style={{ display: 'none' }}
        onChange={(event) => handleFileChange(event, 1)}
      />
                <label htmlFor="upload-file-1" className="custom-upload-button" >
                  {selectedFileName || 'Chọn ảnh'}
                </label>
              </Grid>
            </Grid>
            <style>{`
        .custom-upload-button {
          display: inline-block;
          background-color: #ff5e00;
          color: white;
          padding: 21px 40px;
          border-radius: 3px;
          cursor: pointer;
        }
      `}</style>
            {rowsBL.map((rowsBL, index) => (
              <Grid container spacing={2} sx={{ marginTop: '1%' }} key={index}>
                {rowsBL}
              </Grid>
            ))}
            <ClassicButton text="Thêm bước làm" top="1%" width="20%" onClick={handleAddRowClickBL} />
          </Grid>
        </Grid>
        <ClassicButton text="Xem truớc công thức nấu ăn" width="25%" left="75%" top="5%" onClick={() => {
          handleViewCreateNewRecipe();
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
              <ClassicButton text="Tạo mới công thức nấu ăn" left="70%" top="5%" width="30%" onClick={handleAPICreateNewRecipe}/>
            </Box>
          </Modal>
        </>
      )}
      </>
  );
};


export {AppCreateRecipe, AppCreateNews};