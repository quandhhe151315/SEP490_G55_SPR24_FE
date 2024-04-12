import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeCart, getListCart } from "../../services/ApiServices";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import CardMedia from "@mui/material/CardMedia";
import {
  useCount,
  useSum,
  useVoucher,
  useName,
  useCart,
  voucherCode,
} from "../../store";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function CartDetail() {
  const [data, setdata] = useState([]);
  const [data1, setdata1] = useState();
  const [loading, setloading] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { countRecipe } = useCount();
  const { sumPrice } = useSum();
  const { setSumVoucher } = useVoucher();
  const { setuserName } = useName();
  const { setDataCart } = useCart();
  const { setVoucher } = voucherCode();
  useEffect(() => {
    setuserName(data1?.userName);
  }, [data1, loading]);
  useEffect(() => {
    setSumVoucher(data1?.totalPricePostVoucher);
  }, [data1, loading]);
  useEffect(() => {
    const sum = data1?.totalPricePreVoucher;
    sumPrice(sum);
    console.log("sum", sum);
  }, [data1, loading]);
  useEffect(() => {
    countRecipe(data1?.count);
    setVoucher(data1?.items[0]?.voucherCode ?? "");
  }, [data1, loading]);

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

  useEffect(() => {
    getListCarts(id);
  }, [loading]);

  const getListCarts = async (id) => {
    try {
      const response = await getListCart(id);
      if (response.status === 200) {
        setdata(response.data.items);
        setdata1(response.data);
        setDataCart(response.data);

        console.log("data", response.data.items);
        console.log("data1", response.data);
        console.log("Load cart successful! ");
      } else {
        console.error("Can not Load cart! ");
      }
    } catch (error) {}
  };
  const handleDelete = async (recipeId) => {
    try {
      const response = await removeCart(userId, recipeId);

      if (response.status === 200) {
        toast.success("Xoá thành công ");

        setloading(!loading);
      } else {
        toast.error("Khoong load dc list");
      }
    } catch (error) {
      console.error("ko xoá dc", error);
    }
  };

  const columns = [
    {
      field: "featuredImage",
      headerName: "",
      width: 200,
      renderCell: (params) => {
        return (
          <CardMedia
            component="img"
            image={params.row.featuredImage}
            style={{
              width: isSmallScreen ? 60 : 120,
              height: "auto",
            }}
          />
        );
      },
    },
    {
      field: "recipeTitle",
      headerName: "Tên công thức",

      headerClassName: "header-bold",
      width: isSmallScreen ? 200 : 400,
    },
    {
      field: "recipePrice",

      headerName: "Giá",
      width: isSmallScreen ? 125 : 250,
    },
    {
      field: "edit",
      headerName: "Xoá",
      width: isSmallScreen ? 40 : 60,
      renderCell: (params) => {
        return (
          <button onClick={() => handleDelete(params.row.recipeId)}>
            <DeleteIcon />
          </button>
        );
      },
    },
  ];
  return (
    <div>
      <DataGrid
        sx={{ minWidth: "940px", minHeight: "600px" }}
        rows={data}
        getRowId={(row) => row.recipeId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        // disableRowSelectionOnClick
      />
    </div>
  );
}
