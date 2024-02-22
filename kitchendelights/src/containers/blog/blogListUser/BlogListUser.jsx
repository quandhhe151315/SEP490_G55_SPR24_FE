import { Container, Grid } from "@mui/material";
import AvatarMenu from "../../../components/Account/AvatarMenu";
import BlogItem from "../blogList/BlogItem";

export default function BlogListUser() {
  return (
    <div>
     
        <Grid container spacing={2}>
       
       <Grid item xs={2}>
           <AvatarMenu/>
       </Grid>
       
       
      
     </Grid>
       
     
    </div>
  );
}
