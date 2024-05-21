import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export let theme = createTheme({
  palette: {
    primary: {
      main: "#BF3A00",
      dark: "#464646"
    },
    secondary: {
      main: "#862900",
    },
    grey: {
      main: '#464646',
      dark: '#A1A1A1'
    },
    info: {
      main: '#3C5A9A'
    }

  },
  typography: {
    fontFamily: ["Be Vietnam Pro"].join(","),
  },
});

theme = responsiveFontSizes(theme);
