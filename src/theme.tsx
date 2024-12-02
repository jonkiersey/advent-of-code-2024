import { createTheme } from "@mui/material/styles";
import { grey, blue } from "@mui/material/colors";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: blue[500],
        },
        secondary: {
          light: grey[400],
          main: grey[600],
          dark: grey[800],
          contrastText: grey[100],
        },
        background: {
          default: "#ffffff",
          paper: "#f5f5f5",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: blue[200],
        },
        secondary: {
          light: grey[200],
          main: grey[400],
          dark: grey[600],
          contrastText: grey[800],
        },
        background: {
          default: "#121212",
          paper: "#1d1d1d",
        },
      },
    },
  },
});

export default theme;
