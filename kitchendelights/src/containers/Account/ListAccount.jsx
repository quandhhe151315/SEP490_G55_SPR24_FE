import React, { useEffect, useState } from "react";
import DashboardMenu from "../../components/Dashboard/Menu/DashboardMenu";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { listUsers } from "../../services/ApiServices";
import { banOrUnbanAccount } from "../../services/UserServices";
import { useSnackbar } from "../../components/Snackbar/Snackbar";

export default function ListAccount() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [rows, setRows] = useState([]);
  const { showSnackbar } = useSnackbar();

  const getListUser = async () => {
    try {
      const response = await listUsers();
      if (response.status === 200) {
        setData(response.data);
        console.log("Load news successful! ");
      } else {
        console.error("Can not Load news! ");
      }
    } catch (error) {
      console.error("Can not load news data!", error);
    }
  };

  useEffect(() => {
    getListUser();
    setRows(
      data.map((item) => ({
        id: item.userId,
        email: item.email,
        lastName: item.lastName,
        middleName: item.middleName,
        firstName: item.firstName,
        phone: item.phone,
        // address: item.address,
        role: item.role.roleName,
        status: item.status.statusId,
      }))
    );
  }, [data]);

  const handleEdit = (id) => {
    navigate(`/ChangeRole/${id}`);
  };

  const handleBan = async (id) => {
    try {
      const response = await banOrUnbanAccount(id);
      if (response.status === 200) {
        showSnackbar("Ban tài khoản thành công!", "success");
      } else {
      }
    } catch (error) {
      showSnackbar("Ban tài khoản không thành công!", "error");
    }
  };

  const goToCreateAccount = () => {
    navigate("/CreateAccount");
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "firstName", headerName: "Tên", width: 130 },
    { field: "middleName", headerName: "Tên Đệm", width: 130 },
    { field: "lastName", headerName: "Tên Họ", width: 130 },

    {
      field: "fullName",
      headerName: "Tên đầy đủ",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 220,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.middleName || ""} ${
          params.row.lastName || ""
        }`,
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 200,
      sortable: false,
    },
    // { field: 'address', headerName: 'Địa chỉ', width: 270, sortable: false },

    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            color:
              params.row.status === 1
                ? "green"
                : params.row.status === 2
                ? "red"
                : params.row.status === 3
                ? "gray"
                : "",
          }}
        >
          {params.row.status === 1
            ? "Hoạt động"
            : params.row.status === 2
            ? "Banned"
            : params.row.status === 3
            ? "Không hoạt động"
            : ""}
        </div>
      ),
    },

    { field: "role", headerName: "Role", width: 130, sortable: false },
    {
      field: "action",
      headerName: "Hành động",
      width: 185,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="outlined"
            startIcon={<EditIcon sx={{ marginLeft: "10px" }} />}
            onClick={() => handleEdit(params.row.id)}
            sx={{ height: "37px" }}
          ></Button>
          {params.row.status === 1 ? (
            <Button
              variant="outlined"
              color="error"
              sx={{ marginLeft: "20px" }}
              onClick={() => handleBan(params.row.id)}
            >
              Ban
            </Button>
          ) : params.row.status === 2 ? (
            <Button
              variant="outlined"
              sx={{ marginLeft: "20px" }}
              onClick={() => handleBan(params.row.id)}
            >
              Unban
            </Button>
          ) : (
            <Button variant="outlined" sx={{ marginLeft: "20px" }} disabled>
              Bị xóa
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Box>
        <Box sx={{ display: "flex" }}>
          <DashboardMenu dashboardTitle={"Quản lý người dùng"} />

          <DataGrid
            sx={{ marginTop: "64px" }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#ff5e00",
            borderRadius: "15px",
            marginLeft: "1720px",
            color: "white",
          }}
          onClick={goToCreateAccount}
        >
          Tạo tài khoản mới
        </Button>
      </Box>
    </div>
  );
}
