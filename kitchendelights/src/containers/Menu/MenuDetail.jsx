import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import styled from "@emotion/styled";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { deleteMenu, updateMenu } from "../../services/ApiServices";
import { useNavigate } from "react-router-dom";
import { getMenuById } from "../../services/ApiServices";
import { set } from "date-fns";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { removeRecipeFromMenu } from "../../services/ApiServices";


function MenuDetail({ menuId }) {

  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [menu, setMenu] = useState({});
  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [listRecipe, setListRecipe] = useState([]);

  const getMenuInFomation = async (menuId) => {
    try {
      const response = await getMenuById(menuId);
      if (response.status === 200) {
        setMenu(response.data);
        setMenuName(response.data?.menuName);
        setMenuDescription(response.data?.menuDescription);
        setListRecipe(response.data?.recipes);
      } else {
        console.log('loi status', response);
      }
    } catch (error) {
      console.error('loi khi get menu', error);
    }
  };

  const onAddNew = () => {
    navigate("/ViewListRecipes");
  };

  const handleEditMenu = async () => {
    try {
      const response = await updateMenu(menuId, menuName, menuDescription);
      if (response.status === 200) {
        console.log('edit thanh cong', response);
      } else {
        console.log('ko edit thanh cong', response);
      }
    } catch (error) {
      console.error('loi khi edit menu', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    console.log('edit', isEditing);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  //mở đóng dialog xác nhận xóa menu
  const handleOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteMenu(menuId);
      if (response.status === 200) {
        navigate('/UserProfile');
        console.log('xoa thanh cong', response);
        setOpenDialog(false);
      } else {
        console.log(menuId);
        console.log('ko xoa thanh cong', response);
      }
    } catch (error) {
      console.error('loi khi xoa menu', error);
    }
  };

  const handleDeleteRecipeFromMenu = async (recipeId) => {
    try {
      const response = await removeRecipeFromMenu(menuId, recipeId);
      if (response.status === 200) {
        console.log('remove recipe from menu', menuId, recipeId);
        getMenuInFomation(menuId);
      } else {
        console.log('ko remove thanh cong', response);
      }
    } catch (error) {
      console.error('loi khi remove recipe from menu', error);
    }
  };

  useEffect(() => {
    setIsEditing(false);
    getMenuInFomation(menuId);

    console.log(menu);
    console.table(menu);
  }, [menuId]);

  return (
    <div>
      <Paper elevation={2} style={{ marginLeft: '20px', marginTop: '32px', height: '800px', width:'1100px', overflow:'auto' }}>
        {isEditing ? (
          <>
            <TextField sx={{ display: "block", fontSize: '46px', fontWeight: 'bold', marginLeft: '5%', marginTop: '20px', color: '#000000' }}
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              variant="standard"
              size="medium"
              type="input"
              placeholder="Tên menu"
            ></TextField>
            <TextField sx={{ display: 'block', fontSize: '20px', marginLeft: '5%', marginTop: '20px', color: '#000000' }}
              value={menuDescription}
              onChange={(e) => setMenuDescription(e.target.value)}
              variant="standard"
              size="small"
              type="input"
              placeholder="Mô tả về menu của bạn"
            ></TextField>

            <Button onClick={(e) => {
              handleEditMenu();
              console.log(menuDescription);
              console.log(menuName);
              setIsEditing(false);
            }}
              size="small" variant="contained"
              sx={{
                marginLeft: '75%',
                bgcolor: "#ff5e00",
                borderRadius: "10px",
                width: "100px",
                height: "35px",
                color: "white",
              }}>Lưu</Button>
            <Button onClick={handleCancelClick} size="small" variant="contained"
              sx={{
                marginLeft: '10px',
                bgcolor: "#ff5e00",
                borderRadius: "10px",
                width: "100px",
                height: "35px",
                color: "white",
              }}>Hủy</Button>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '5%' }}>
                <Typography sx={{ whiteSpace: 'nowrap', fontSize: '46px', fontWeight: '', marginLeft: '5%', marginTop: '20px', color: '#000000' }}>
                  {menuName}
                </Typography>
                <Typography sx={{ fontSize: '20px', marginLeft: '5%', marginTop: '20px', color: '#000000' }}>
                  {menuDescription}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', marginRight: '10%', marginTop: '5%' }}>
                <IconButton sx={{ marginRight: '40%' }}>
                  <EditIcon sx={{ fontSize: '30px' }} onClick={handleEditClick} />
                </IconButton>
                <IconButton sx={{ marginRight: '5%' }}>
                  <DeleteForeverOutlinedIcon sx={{ fontSize: '30px' }} onClick={handleOpen} />
                </IconButton>
              </Box>
            </Box>

          </>
        )}

        <Divider sx={{ marginTop: '10px' }} />

        <Box sx={{ marginTop: '20px' }}>
          <Grid container spacing={3} sx={{ marginLeft: '10px', marginRight: '10px' }}>
            {/* Danh sách công thức */}
            {listRecipe.map((item, index) => (
              <Grid item lg={3} md={6} xs={12} key={index}>
                <Card sx={{ maxWidth: 345, position: "relative" }}>
                  <CardMedia
                    component={"img"}
                    height={140}
                    image={item.featuredImage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.recipeTitle}
                    </Typography>
                    <Rating
                      name="simple-controlled"
                      value={item.recipeRating}
                      size="small"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ marginTop: "8px" }}
                      >
                        <Avatar sx={{ width: 24, height: 24 }} />
                        <Typography>{item.userName}</Typography>
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "8px",
                      }}
                    >
                      <Link to={`/RecipeDetail/${item.recipeId}`}>
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#ff5e00",
                            color: "white",
                            borderRadius: 3,
                            width: 75,
                          }}
                        >
                          Xem
                        </Button>
                      </Link>
                      <Button
                        sx={{
                          bgcolor: "#ff5e00",
                          color: "white",
                          borderRadius: 3,
                          width: 75,
                        }}
                        variant="contained"
                        onClick={() => handleDeleteRecipeFromMenu(item.recipeId)}
                      >
                        Xoá
                      </Button>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: -2,
                      position: "absolute",
                      top: 0,
                      right: 0,
                    }}
                  ></CardActions>
                </Card>
              </Grid>
            ))}
            {/* Card thêm mới công thức */}
            <Grid item lg={3} md={6} xs={12}>
              <Card
                sx={{
                  textAlign: "center",
                  backgroundColor: "#f0f0f0",
                  cursor: "pointer",
                }}
                onClick={onAddNew}
              >
                <CardContent>
                  <AddCircleIcon style={{ fontSize: 48, color: "#3f51b5" }} />
                  <Typography variant="h6" color="textSecondary" component="div">
                    Thêm công thức
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>




        {/* Dialog to confirm delete menu */}
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Xác nhận xóa Menu"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có chắc chắn muốn xóa Menu này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmDelete}>Có</Button>
            <Button onClick={handleClose} autoFocus>
              Không
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}

export default MenuDetail;