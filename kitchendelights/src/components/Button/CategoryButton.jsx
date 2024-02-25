import { Button } from "@mui/material";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
function CategoryButton(props){
    const{text,height,width,marginLeft,marginRight,marginTop,marginBottom,onClick}=props;
    
    return(
        <Button
            variant="contained"
            sx={{
                backgroundColor:'#553C9A',
                borderRadius:'10px',
                width: width ,
                height: height ,
                color:'#FFFFFF',
                marginLeft:marginLeft,
                marginRight: marginRight,
                marginTop: marginTop,
                marginBottom: marginBottom,
                fontSize:'14px',
                textAlign:'center'
            }}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}


export default CategoryButton