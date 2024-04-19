import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { checkOut } from "../../services/Payment";
import {
  getListCart,
  deleteVoucher,
  checkInteraction,
  createVoucher,
} from "../../services/ApiServices";
import { voucherCode } from "../../store";
import { toast } from "react-toastify";
export default function Ticket() {
  const [data, setdata] = useState([]);
  const cart = data;
  const { setVoucher, voucher } = voucherCode();
  const [check, setcheck] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState([]);
  const valvnp_TransactionStatusue = searchParams.get("vnp_TransactionStatus");
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
  const id = getUserIdFromCookie();
  const userId = getUserIdFromCookie();
  const type = "purchase";
  useEffect(() => {
    getListCarts(id);
  }, [id]);
  const getListCarts = async (id) => {
    try {
      const response = await getListCart(id);
      if (response.status === 200) {
        setdata(response.data.items);
        console.log("data", response.data.items);
      } else {
        console.error("Can not Load cart! ");
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (valvnp_TransactionStatusue === "00" && cart) {
      handleCheckOut();
    }
  }, [cart, valvnp_TransactionStatusue]);
  const handleDeleteVOucher = async (voucherCode) => {
    try {
      const response = await deleteVoucher(voucherCode);

      if (response.status === 200) {
      } else {
      }
    } catch (error) {}
  };

  const handleCheckOut = async () => {
    try {
      const response = await checkOut(cart);
      if (response.status === 200) {
        if (cart[0].voucherCode) {
          handleDeleteVOucher(cart[0].voucherCode);
        }
        if (userId && type) {
          checkVouchers();
        }
      } else {
        console.log("ko add dc");
      }
    } catch (error) {
      console.error("ko add dc", error);
    }
  };

  const checkVouchers = async () => {
    try {
      const response = await checkInteraction(Number(userId), type);

      if (response.status === 200) {
        setcheck(response.data);
      } else {
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (check) {
      createVouchers();
      toast.success("Chúc mừng bạn đã nhận được voucher giảm giá!");
    }
  }, [check]);
  const createVouchers = async () => {
    try {
      const response = await createVoucher(id);
      if (response.status === 200) {
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    // Lấy tất cả các tham số truy vấn từ URL và chuyển đổi thành mảng
    const paramsArray = Array.from(searchParams.entries());
    setQueryParams(paramsArray);
  }, [searchParams]);
  const handleGoToHistory = () => {
    window.location.href = "/HistoryPayment";
  };
  const handleGoToCart = () => {
    window.location.href = "/ShoppingCart";
  };

  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper style={{ padding: "20px", overflow: "auto" }}>
            {valvnp_TransactionStatusue === "00" ? (
              <h1 style={{ color: "green" }}>Thanh Toán thành công !</h1>
            ) : (
              <h1 style={{ color: "red" }}>Thanh Toán thất bại !</h1>
            )}
            <table>
              <tbody>
                {queryParams.map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {valvnp_TransactionStatusue === "00" ? (
              <Button
                onClick={handleGoToHistory}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  margin: "10px",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Danh sách lịch sử mua hàng
              </Button>
            ) : (
              <Button
                onClick={handleGoToCart}
                style={{
                  backgroundColor: "#008CBA",
                  color: "white",
                  margin: "10px",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Thanh toán lại
              </Button>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
