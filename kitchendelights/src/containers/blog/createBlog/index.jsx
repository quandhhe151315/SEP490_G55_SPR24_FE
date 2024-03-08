import { Stack, Box, Grid} from "@mui/material";
import CreateFormItem from "./CreateFormItem";

export default function CreateBlog() {
  
  return (
    <Box>
      <Stack sx={{width:'50%',display:'flex',alignItems:'center',margin:'0 auto'}}>
        <CreateFormItem/>
      </Stack> 
    </Box>
  );
}
