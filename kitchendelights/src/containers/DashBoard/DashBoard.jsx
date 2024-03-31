import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DashboardMenu from "../../components/Dashboard/Menu/DashboardMenu";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BarChart } from '@mui/x-charts/BarChart';


function DashBoard() {



    return (

        <Box sx={{ display: 'flex' }}>
            <DashboardMenu dashboardTitle={"Dashboard"} />
            <Grid sx={{ marginLeft: '30px', marginTop: '80px' }}>
                <Paper elevation={2} sx={{ borderRadius: '15px', border: '1px solid #bfb8b8', width: '1350px', height: '700px', backgroundColor: '#FFFFFF' }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                                width={500}
                                height={300}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

        </Box>
    );
}

export default DashBoard;