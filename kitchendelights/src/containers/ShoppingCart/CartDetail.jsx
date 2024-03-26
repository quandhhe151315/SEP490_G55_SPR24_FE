import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeCart, getListCart } from "../../services/ApiServices";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import CardMedia from "@mui/material/CardMedia";
import { useCount, useSum } from "../../store";

export default function CartDetail() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  const { countRecipe } = useCount();
  const { sumPrice } = useSum();

  useEffect(() => {
    const sum = data?.reduce((total, item) => total + item.recipePrice, 0);
    sumPrice(sum);
  }, [data, loading]);
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
    countRecipe(data.length);
  }, [data, loading]);

  useEffect(() => {
    getListCarts(id);
  }, [loading]);

  const getListCarts = async (id) => {
    try {
      const response = await getListCart(id);
      if (response.status === 200) {
        setdata(response.data);
        console.log("data", response.data);
        console.log("Load cart successful! ");
      } else {
        console.error("Can not Load cart! ");
      }
    } catch (error) {
      toast.error("Khoong load dc cart");
    }
  };
  const handleDelete = async (recipeId) => {
    try {
      const response = await removeCart(userId, recipeId);
      console.log(userId, recipeId);

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

  //Table
  const columns = [
    {
      field: "featuredImage",
      headerName: "ID",
      width: 90,
      renderCell: (params) => {
        console.log("params", params);
        return <CardMedia component={"img"} image={params.row.featuredImage} />;
      },
    },
    {
      field: "recipeTitle",
      headerName: " Ten cong thuc",
      width: 398,
      // editable: true,
    },
    {
      field: "recipePrice",
      headerName: "Gia",
      width: 398,
      // editable: true,
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => {
        console.log("params", params);
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
      <Box sx={{}}>
        <DataGrid
          sx={{ minHeight: "600px" }}
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
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}
