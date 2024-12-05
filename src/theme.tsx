import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00ff2a",
    },
    secondary: {
      main: "#f5c400",
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          textDecoration: "none",
          "&:hover": {
            color: theme.palette.primary.main,
          },
        }),
      },
    },
  },
});

export default theme;
