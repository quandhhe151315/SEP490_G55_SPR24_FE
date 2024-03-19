
import { Box,Stack } from "@mui/material";
import BlogListItem from "./BlogListItem";
import DashboardMenu from "../../../../components/Dashboard/Menu/DashboardMenu";
export default function ListBlogDashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
    <DashboardMenu dashboardTitle="Quản lý Blog" />
    <Stack sx={{width:'100%',marginTop:'100px'}}> 
    <BlogListItem />
    </Stack>
 
  </Box>
  );
}
