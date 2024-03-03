import React from 'react'
import { Button } from '@mui/material'

function ClassicButton(props) {
    const { text, width, height, top, left, right, bot, onClick } = props;

    return (
        <Button 
            variant="contained" 
            sx={{ 
                bgcolor: "#ff5e00", 
                borderRadius: '15px' , 
                width: width || '180px',
                height: height || '42px',
                color: 'white',
                marginTop: top,
                marginLeft: left,
                marginRight: right,
                marginBottom: bot,
            }}
            onClick={onClick}
        >
            {text}
        </Button>
    );
}

export default ClassicButton
