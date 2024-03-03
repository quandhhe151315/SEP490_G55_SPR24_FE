import { Box } from "@mui/material";
import React from "react";

function Layoutspacing({children}) {
  return (
    <Box
      sx={{ flexGrow: 1, minWidth: "1350px" }}
      marginLeft="auto"
      marginRight="auto"
      paddingLeft={35}
      paddingRight={35}
      color="primary"
    >
      {children}
    </Box>
  );
}

export default Layoutspacing;
