import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DashboardMenu from "../../components/Dashboard/Menu/DashboardMenu";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PostAdd from "@mui/icons-material/PostAdd";
import { getNumberRevenueInThisMonth, getNumberRevenueInFiveMonth, getNumberUserCreatedInThisMonth, getNumberRecipeCreatedInThisMonth, getNumberOfRecipesAreBoughtInThisMonth, getNumberOfUserEachRole } from "../../services/ApiServices";
import { useState } from "react";


function DashBoard() {

    const [numberRevenueInThisMonth, setNumberRevenueInThisMonth] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [months, setMonths] = useState([null]);
    const [revenues, setRevenues] = useState([null]);
    const [NumberUserCreatedInThisMonth, setNumberUserCreatedInThisMonth] = useState(0);
    const [NumberRecipeCreatedInThisMonth, setNumberRecipeCreatedInThisMonth] = useState(0);
    const [NumberRecipeBoughtThisMonth, setNumberRecipeBoughtThisMonth] = useState(0);
    const [numberUser, setNumberUser] = useState(0);
    const [numberChef, setNumberChef] = useState(0);
    const [numberWriter, setNumberWriter] = useState(0);

    const GetNumberRevenueInThisMonth = async () => {
        try {
            const response = await getNumberRevenueInThisMonth();
            if (response.status === 200) {
                setRevenue(response.data.revenue);
                setNumberRevenueInThisMonth(response.data);
                console.log("get revernue success");
            } else {
                console.log("get revernue fail");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GetNumberRevenueInFiveMonth = async () => {
        try {
            const response = await getNumberRevenueInFiveMonth();
            if (response.status === 200) {
                const month = response.data.map((item) => item.month).reverse();
                const revenue = response.data.map((item) => item.revenue).reverse();

                setMonths(month);
                setRevenues(revenue);
                console.log("get revernue success");
            } else {
                console.log("get revernue fail");
            }
        } catch (error) {
            console.log(error);
        }

    }

    const GetNumberUserCreatedInThisMonth = async () => {
        try {
            const response = await getNumberUserCreatedInThisMonth();
            if (response.status === 200) {
                setNumberUserCreatedInThisMonth(response.data);
                console.log("get Created user success");
            } else {
                console.log("get Created User fail");
            }
        } catch (error) {
            console.log(error);
        }

    }

    const GetNumberRecipeCreatedInThisMonth = async () => {
        try {
            const response = await getNumberRecipeCreatedInThisMonth();
            if (response.status === 200) {
                setNumberRecipeCreatedInThisMonth(response.data);
                console.log("get create recipe success");
            } else {
                console.log("get Created recipe fail");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GetNumberOfRecipeBoughtThisMonth = async () => {
        try {
            const response = await getNumberOfRecipesAreBoughtInThisMonth();
            if (response.status === 200) {
                setNumberRecipeBoughtThisMonth(response.data);
                console.log("get number recipe bought success");
            } else {
                console.log("get number recipe bought fail");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const GetNumberOfUserEachRole = async () => {
        try {
            const response = await getNumberOfUserEachRole();
            if (response.status === 200) {

                const data = response.data;

                const userRole = data.find((item) => item.role === "Users");
                const chefRole = data.find((item) => item.role === "Chef");
                const writerRole = data.find((item) => item.role === "Writer");

                setNumberUser(userRole ? userRole.numberOfUser : 0);
                setNumberChef(chefRole ? chefRole.numberOfUser : 0);
                setNumberWriter(writerRole ? writerRole.numberOfUser : 0);
                console.log("get number user each role success");
            }

        } catch (error) {
            console.log(error);
        }
    }
    console.log();
    useEffect(() => {
        GetNumberRevenueInThisMonth();
        GetNumberRevenueInFiveMonth();
        GetNumberUserCreatedInThisMonth();
        GetNumberRecipeCreatedInThisMonth();
        GetNumberOfRecipeBoughtThisMonth();
        GetNumberOfUserEachRole();
    }, []);
    return (

        <Box sx={{ display: 'flex' }}>
            <DashboardMenu dashboardTitle={"Dashboard"} />
            <Grid sx={{ marginLeft: '30px', marginTop: '80px' }}>
                <Paper elevation={2} sx={{ border: '1px solid #bfb8b8', width: '1300px', height: '700px', backgroundColor: '#F1F1F1' }}>
                    <Grid container spacing={2} sx={{ marginTop: '1px' }}>
                        <Grid item xs={3}>
                            <Paper elevation={2} sx={{ marginLeft: '10px', height: '180px', border: '1px solid #bfb8b8', backgroundColor: '#FFFFFF' }}>
                                <Typography sx={{ marginTop: '10px', marginLeft: '10px', color: '#7E909A', fontWeight: 'bold' }}>
                                    CÔNG THỨC ĐÃ BÁN
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '40px', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: 'Bold', fontSize: '28px' }}>
                                        {NumberRecipeBoughtThisMonth}
                                    </Typography>
                                    <ShoppingCartOutlinedIcon sx={{ fontSize: '60px', marginRight: '15px' }} />
                                </Box>

                                <Box sx={{ display: 'flex', marginTop: '20px', marginLeft: '25px', }}>

                                    <Typography sx={{ marginLeft: '20px' }}>
                                        (Tháng này)
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper elevation={2} sx={{ height: '180px', border: '1px solid #bfb8b8', backgroundColor: '#FFFFFF', overflow: 'auto' }}>
                                <Typography sx={{ marginTop: '10px', marginLeft: '10px', color: '#7E909A', fontWeight: 'bold' }}>
                                    DOANH THU
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '20px', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: 'Bold', fontSize: '28px' }}>
                                        {revenue.toLocaleString()}
                                    </Typography>
                                    <SavingsOutlinedIcon sx={{ fontSize: '60px', marginRight: '15px' }} />
                                </Box>

                                <Box sx={{ display: 'flex', marginTop: '20px', marginLeft: '25px', }}>
                                    <Typography sx={{ color: numberRevenueInThisMonth.increase ? '#6AB187' : 'red' }}>
                                        {numberRevenueInThisMonth.percent}%
                                    </Typography>
                                    <Typography sx={{ marginLeft: '20px' }}>
                                        (Tháng này)
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper elevation={2} sx={{ height: '180px', border: '1px solid #bfb8b8', backgroundColor: '#FFFFFF' }}>
                                <Typography sx={{ marginTop: '10px', marginLeft: '10px', color: '#7E909A', fontWeight: 'bold' }}>
                                    TÀI KHOẢN MỚI ĐÃ TẠO
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '40px', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: 'Bold', fontSize: '28px' }}>
                                        {NumberUserCreatedInThisMonth}
                                    </Typography>
                                    <PersonAddAltOutlinedIcon sx={{ fontSize: '60px', marginRight: '15px' }} />
                                </Box>

                                <Box sx={{ display: 'flex', marginTop: '20px', marginLeft: '25px', }}>

                                    <Typography sx={{ marginLeft: '20px' }}>
                                        (Tháng này)
                                    </Typography>
                                </Box>

                            </Paper>
                        </Grid>
                        <Grid item xs={3}>
                            <Paper elevation={2} sx={{ marginRight: '10px', height: '180px', border: '1px solid #bfb8b8', backgroundColor: '#FFFFFF' }}>
                                <Typography sx={{ marginTop: '10px', marginLeft: '10px', color: '#7E909A', fontWeight: 'bold' }}>
                                    CÔNG THỨC MỚI ĐÃ TẠO
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginLeft: '40px', justifyContent: 'space-between' }}>
                                    <Typography sx={{ fontWeight: 'Bold', fontSize: '28px' }}>
                                        {NumberRecipeCreatedInThisMonth}
                                    </Typography>
                                    <PostAdd sx={{ fontSize: '60px', marginRight: '15px' }} />
                                </Box>

                                <Box sx={{ display: 'flex', marginTop: '20px', marginLeft: '25px', }}>

                                    <Typography sx={{ marginLeft: '20px' }}>
                                        (Tháng này)
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                        <Grid item xs={6}>
                            <Paper elevation={2} sx={{ marginLeft: '10px', height: '450px', border: '1px solid #bfb8b8', backgroundColor: '#FFFFFF' }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography sx={{ marginTop: '10px', marginLeft: '10px', color: '#7E909A', fontWeight: 'bold' }}>
                                            BIỂU ĐỒ DOANH THU CÁC THÁNG
                                        </Typography>
                                        <Box>
                                            <BarChart
                                                sx={{ marginTop: '20px', marginLeft: '40px' }}
                                                xAxis={[{ scaleType: 'band', data: months }]}
                                                series={[{ data: revenues }]}
                                                width={650}
                                                height={400}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={2} sx={{ marginRight: '10px', height: '450px', border: '1px solid #bfb8b8', backgroundColor: '#FFFFFF' }}>
                                <Typography sx={{ marginTop: '10px', marginLeft: '10px', color: '#7E909A', fontWeight: 'bold' }}>
                                    BIỂU ĐỒ TỈ LỆ NGƯỜI DÙNG
                                </Typography>
                                <Box sx={{ marginTop: '50px', marginLeft: '20px', display:'flex', width:'100%'}}>
                                    <PieChart
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: numberUser, label: 'User' },
                                                    { id: 1, value: numberChef, label: 'Chief' },
                                                    { id: 2, value: numberWriter, label: 'Writer' },
                                                ],
                                            },
                                        ]}
                                        width={600}
                                        height={300}
                                    />
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>

        </Box>
    );
}

export default DashBoard;