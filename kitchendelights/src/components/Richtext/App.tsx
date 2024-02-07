import {
  Box,
  createTheme,
  useMediaQuery,
  type PaletteMode,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Editor from '../Richtext/Editor.tsx';

export default function App() {
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
        <Editor />
      </Box>
  );
}
