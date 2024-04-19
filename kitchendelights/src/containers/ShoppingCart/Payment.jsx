import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VNPAY from "../../assets/images/VNPAY.jpg";
import { useSum, useVoucher, voucherCode } from "../../store";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import {
  addVoucher,
  getListCart,
  getAllVoucherByUserId,
  checkInteraction,
  createVoucher,
} from "../../services/ApiServices";
import { toast } from "react-toastify";
import { getURL } from "../../services/Payment";

export default function ImgMediaCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [URL, setURL] = useState("");
  console.log("URL", URL);
  const { setVoucher, voucher } = voucherCode();
  const { sumPrice, priceSum } = useSum();
  const { setSumVoucher, sumVoucher } = useVoucher();
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const amount = sumVoucher;
  const getUserIdFromCookie = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "userId") {
        return value;
      }
    }
    return null;
  };
  const userId = getUserIdFromCookie();
  const id = getUserIdFromCookie();
  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    getListVoucher(userId);
  }, [userId]);

  const handleVoucherSelect = (voucher) => {
    handleCloseModal();
    addVoucherCode(voucher.voucherCode);
  };
  const getListCarts = async (id) => {
    try {
      const response = await getListCart(id);
      if (response.status === 200) {
        setVoucher(response.data.items[0]?.voucherCode ?? "");
        setSumVoucher(response.data.totalPricePostVoucher);
        sumPrice(response.data.totalPricePreVoucher);
      } else {
        console.error("Can not Load cart! ");
      }
    } catch (error) {
      toast.error("Khoong load dc cart");
    }
  };
  const handleReturnUrl = () => {
    if (amount) {
      window.location.href = URL;
    }
  };

  useEffect(() => {
    if (amount) {
      VNPAYReturn(amount);
    }
  }, [amount]);
  useEffect(() => {
    // render sang URLVNPAY
    if (URL) {
      window.location.href = URL;
    }
  }, []);
  const VNPAYReturn = async (amount) => {
    try {
      const response = await getURL(amount);
      if (response.status === 200) {
        debugger;
        setURL(response.data);
        // console.log("data", response);
      } else {
        console.error("Không lấy được URL ");
      }
    } catch (error) {
      // toast.error("Khoong load dc listbookmark");
    }
  };

  const getListVoucher = async (userId) => {
    try {
      const response = await getAllVoucherByUserId(userId);
      if (response.status === 200) {
        setdata(response.data);
      } else {
      }
    } catch (error) {}
  };

  const addVoucherCode = async (voucherCode) => {
    try {
      const response = await addVoucher(id, voucherCode);
      getListCarts(id);

      toast.success("Add thành công");
      if (response.status === 200) {
        console.log("add thanh cong");
      } else {
        console.log("ko add dc");
      }
    } catch (error) {
      console.error("ko add dc", error);
    }
  };

  return (
    <Card
      sx={{
        height: 600,

        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold" }}
        >
          Hình thức thanh toán
        </Typography>
      </CardContent>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          style={{ maxWidth: "100%", objectFit: "contain" }}
        /> */}
        <img
          src={VNPAY}
          alt="Image VNPAY"
          style={{ width: "350px", height: "240px" }}
        />
      </div>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="large"
          sx={{
            border: "2px solid #000",
            borderRadius: "20px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#000",
              color: "#fff",
            },
            color: "#000",
          }}
          //  onClick={handlePayment}
          onClick={handleReturnUrl}
        >
          Thanh toán qua VNPAY
        </Button>
      </CardActions>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h7" component="div">
          Tạm tính:  {priceSum}
        </Typography>
        <Typography gutterBottom variant="h7" component="div">
          Thành tiền: {sumVoucher}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          gutterBottom
          variant="h7"
          component="div"
          sx={{ marginLeft: 1 }}
        >
          Mã giảm giá: {voucher}
        </Typography>
        <Button
          size="small"
          sx={{
            border: "2px solid #000",
            fontWeight: "bold",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: "#000",
              color: "#fff",
            },
            color: "#000",
            marginBottom: 2,
          }}
          onClick={handleOpenModal}
        >
          Chọn mã giảm giá
        </Button>
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              borderRadius: 4,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Chọn mã giảm giá
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 4 }}>
              <Box sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  {data.length === 0 ? (
                    <Grid item xs={12}>
                      {" "}
                      {/* Đảm bảo chiếm hết cả hàng nếu không có phần tử */}
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h6"
                        paragraph={true}
                        fontWeight="bold"
                      >
                        Bạn chưa sở hữu mã giảm giá nào
                      </Typography>
                    </Grid>
                  ) : (
                    data.map((ele, index) => (
                      <Grid item xs={6} key={index}>
                        <Card
                          sx={{ border: "1px solid #ccc", p: 2 }}
                          className="voucher-item"
                          onClick={() => handleVoucherSelect(ele)}
                        >
                          <h2>{ele.voucherCode}</h2>
                          <p>Giảm giá {ele.discountPercentage}%</p>
                        </Card>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Box>
            </Typography>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
}
