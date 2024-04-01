import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VNPAY from "../../assets/images/VNPAY.jpg";
import { useSum, useVoucher } from "../../store";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { addVoucher } from "../../services/ApiServices";

import { getAllVoucherByUserId } from "../../services/ApiServices";
import { toast } from "react-toastify";

export default function ImgMediaCard() {
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleVoucherSelect = (voucher) => {
    setSelectedVoucher(voucher);
    handleCloseModal();
  };
  const { priceSum } = useSum();
  const { sumVoucher } = useVoucher();
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
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
  const discountCode = selectedVoucher?.voucherCode;
  useEffect(() => {
    getListVoucher(userId);
  }, [loading]);

  const getListVoucher = async (userId) => {
    try {
      const response = await getAllVoucherByUserId(userId);
      if (response.status === 200) {
        setdata(response.data);
      } else {
        console.error("Can not Load cart! ");
      }
    } catch (error) {
      toast.error("Khoong load dc cart");
    }
  };

  const addVoucherCode = async () => {
    try {
      const response = await addVoucher(id, discountCode);
      console.log("addvoucher", id, discountCode);
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
  console.log(addVoucherCode);
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
          Mã giảm giá: {selectedVoucher?.voucherCode ?? ""}
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
                  {data.map((ele) => {
                    return (
                      <Grid item xs={6}>
                        <Card
                          sx={{ border: "1px solid #ccc", p: 2 }}
                          className="voucher-item"
                          onClick={() => handleVoucherSelect(ele)}
                        >
                          <h2>{ele.voucherCode}</h2>
                          <p>Giảm giá {ele.discountPercentage}%</p>
                        </Card>
                      </Grid>
                    );
                  })}
                  {/* Thêm các voucher khác tại đây */}
                </Grid>
              </Box>
            </Typography>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
}