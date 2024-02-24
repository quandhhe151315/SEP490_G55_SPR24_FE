import { Button } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
function CategoryButton(props){
    const{text,marginLeft,marginRight,marginTop,marginBottom,onclick}=props;
    const navigate = useNavigate();
    const goToCreateCategory = () => {
        navigate('/CreateCategory')
      }
    return(
        <Button
            variant="contained"
            sx={{
                backgroundColor:'#553C9A',
                borderRadius:'10px',
                width: 'auto' ,
                height: 'auto' ,
                color:'#FFFFFF',
                marginLeft:marginLeft,
                marginRight: marginRight,
                marginTop: marginTop,
                marginBottom: marginBottom,
                fontSize:'14px',
                textAlign:'center'
            }}
            onClick={onclick}
        >
            {text}
        </Button>
    );
}


export default CategoryButton