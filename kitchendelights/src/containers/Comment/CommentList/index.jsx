import DashboardMenu from "../../../components/Dashboard/Menu/DashboardMenu";
import { Box,Stack } from "@mui/material";
import ListTable from "./ListTable";
export default function ListCommentDashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
    <DashboardMenu dashboardTitle="Quản lý Bình luận" />
    <Stack sx={{width:'100%',marginTop:'100px'}}> 
    <ListTable />
    </Stack>
 
  </Box>
  );
}
