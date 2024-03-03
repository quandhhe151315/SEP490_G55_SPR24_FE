import {
  Box,
  createTheme,
  useMediaQuery,
  type PaletteMode,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Editor from '../Richtext/Editor.tsx';
import React from 'react';

const App = ({title, setContent, handleCreateNews}) => {
  const systemSettingsPrefersDarkMode = useMediaQuery(
    "(prefers-color-scheme: dark)"
  );
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(
    systemSettingsPrefersDarkMode ? "dark" : "light"
  );
  
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          secondary: {
            main: "#42B81A",
          },
        },
      }),
    [paletteMode]
  );
  return (
      <Box sx={{ p: 3, maxWidth: 1207, margin: "0 auto" }}>
        <Editor title={title} setContent={setContent} handleCreateNews={handleCreateNews}/>
      </Box>
  );
};

export default App;