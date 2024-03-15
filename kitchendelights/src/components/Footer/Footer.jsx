import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#f8f8f8', p: 3, height: '200px' }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box sx={{marginLeft:10, marginRight:20}}>
                        <Typography variant="h6" gutterBottom sx={{fontSize:17}}>
                            Kitchen Delights
                        </Typography>
                        <Typography variant="body2" gutterBottom sx={{fontSize:14}} >
                            Kitchen Delights is a recipe management application that allows you to create, store, and manage your recipes.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography gutterBottom sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                Kitchen Delights
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                About us
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                Careers
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                Contact us
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                Feedback
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography gutterBottom sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                Legal
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                Terms
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                Conditions
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                Cookies
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                Copyright
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography gutterBottom sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
                                Follow
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                Facebook
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                Twitter
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:12}}>
                                Instagram
                            </Typography>
                            <Typography variant="body2" gutterBottom sx={{fontSize:14}}>
                                Youtube
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;
