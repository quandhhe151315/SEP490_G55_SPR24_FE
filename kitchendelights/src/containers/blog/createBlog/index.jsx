import { Stack, Box, Grid } from "@mui/material";
import CreateFormItem from "./CreateFormItem";
import PrimarySearchAppBar from "../../../components/Homepage/Appbar";

export default function CreateBlog() {
  return (
    <Box>
      <PrimarySearchAppBar />
      <Stack
        sx={{
          width: "70%",
          display: "flex",
          alignItems: "center",
          margin: " auto",
          mt: 4,
        }}
      >
        <CreateFormItem />
      </Stack>
    </Box>
  );
}
