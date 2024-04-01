import React, { useEffect, useState } from "react";
import AvatarMenu from "../../components/Account/AvatarMenu";
import Appbar from "../../components/Homepage/Appbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import image1 from "../../assets/images/news1.jpg";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import GetInformationJWT from "../../components/JWT/GetInformationJWT";
import { myProfile } from "../../services/ApiServices";
import Stack from "@mui/material/Stack";

function MyProfile() {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();
  const goToChangeMyProfile = () => {
    navigate("/ChangeMyProfile");
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  useEffect(() => {
    if (id) {
      getInformationProfile();
    }
  }, [id]);

  const getInformationProfile = async () => {
    try {
      const response = await myProfile(id);

      if (response.status === 200) {
        setEmail(response.data?.email);
        setFirstName(response.data?.firstName);
        setMiddleName(response.data?.middleName);
        setLastName(response.data?.lastName);
        setPhoneNumber(response.data?.phone);
        // setAddress(response.data?.addresses);
        setAvatar(response.data?.avatar);
        console.log(response.data);
      } else {
        console.error("Can not get news!");
      }
    } catch (error) {
      console.error("Can not load MyProfile data!", error);
    }
  };

  return (
    <div>
      <GetInformationJWT setId={setId} />
      <Box sx={{ display: "flex" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={2} sx={{ marginTop: "2%" }}>
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                Thông tin cá nhân
              </Typography>
              <Typography sx={{ fontSize: "16px" }}>
                Đây là nơi hiển thị những thông tin cá nhân
              </Typography>
              <Paper
                sx={{
                  marginTop: "3%",
                  borderRadius: "15px",
                  border: "1px solid #bfb8b8",
                  width: "77%",
                  height: "100%",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "20%",
                        marginLeft: "40%",
                      }}
                    >
                      Email:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "30%",
                        marginLeft: "40%",
                      }}
                    >
                      Họ và tên:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "30%",
                        marginLeft: "40%",
                      }}
                    >
                      Mật khẩu:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "30%",
                        marginLeft: "40%",
                      }}
                    >
                      Số điện thoại:{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "30%",
                        marginLeft: "40%",
                      }}
                    >
                      Địa chỉ:{" "}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "15%",
                      }}
                    >
                      {email}{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "22%",
                      }}
                    >
                      {lastName} {middleName} {firstName}{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "22%",
                      }}
                    >
                      ********{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "22%",
                      }}
                    >
                      {phoneNumber}{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginTop: "22%",
                      }}
                    >
                      {address}{" "}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography sx={{ marginTop: "50px" }}>
                      <img
                        src={image1}
                        alt="Image news"
                        style={{
                          width: "100%",
                          height: "100%",
                          overflow: "hidden",
                        }}
                      />
                      <br />
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          marginTop: "5%",
                          marginLeft: "45%",
                        }}
                      >
                        Avatar
                      </Typography>
                    </Typography>
                  </Grid>

                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#ff5e00",
                      marginTop: "5%",
                      marginBottom: "5%",
                      borderRadius: "15px",
                      marginLeft: "40%",
                      width: "20%",
                      height: "20%",
                      color: "white",
                    }}
                    onClick={goToChangeMyProfile}
                  >
                    Đổi thông tin
                  </Button>
                </Grid>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default MyProfile;
