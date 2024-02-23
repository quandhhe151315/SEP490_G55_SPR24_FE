import React from 'react'
import { Button } from '@mui/material'

function ClassicButton(props) {
    const { text, width, height } = props;

    return (
        <Button 
            variant="contained" 
            sx={{ 
                bgcolor: "#ff5e00", 
                borderRadius: '15px' , 
                width: width || '180px',
                height: height || '42px',
                color: 'white' 
            }}
        >
            {text}
        </Button>
    );
}

export default ClassicButton
