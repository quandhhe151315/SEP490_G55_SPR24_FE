import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ToggleSwitch () {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <div>
 <FormControlLabel
      control={<Switch checked={isToggled} onChange={handleToggle} sx={{ '& .Mui-checked': {
        color: '#ff5e00', // Set the color when the switch is checked to orange
      }, '& .Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#ff5e00', // Set the track color when the switch is checked to orange
      }}}/>}
    
    />
   
    </div>
   
    
     


  );
};

