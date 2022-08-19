import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  styles: {
    global: {
      "input:disabled": {
        bg: "gray.100",
        color: "gray.600",
        border: "1px solid #CBD5E0",
      },
      "select:disabled": {
        bg: "gray.100",
        color: "gray.600",
        border: "1px solid #CBD5E0",
      },
      ".paginationPageItem": {
        padding: "0.5em 1em",
      },
      ".paginationPageLink": {
        color: "#171923",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "19px",
      },
      ".turbusPaginationActive": {
        border: "3px solid #006aed",
        borderRadius: "100%",
      },
      ".condorPaginationActive": {
        border: "3px solid #FFC629",
        borderRadius: "100%",
      },
      ".paginationContainer": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1em",
        listStyle: "none",
        flexDirection: "row",
      },
    },
  },
  colors: {
    primary: {
      50: "#ebf8ff",
      100: "#bee3f8",
      200: "#90cdf4",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#3182ce",
      600: "#2b6cb0",
      700: "#2c5282",
      800: "#2a4365",
      900: "#1a365d",
    },
    secondary: {
      50: "#ebf8ff",
      100: "#bee3f8",
      200: "#90cdf4",
      300: "#63b3ed",
      400: "#4299e1",
      500: "#3182ce",
      600: "#2b6cb0",
      700: "#2c5282",
      800: "#2a4365",
      900: "#1a365d",
    },
    navBar: "#006aed",
    matchedText: "#333",
    bus: {
      first: "#4dc9ec",
      second: "#f2714f",
      third: "#77c369",
      fourth: "#e2d666",
      fifth: "#f077a5",
      sixth: "#5bc5c4",
    },

    black: "#16161d",
    placeholder: "#718096",
    borders: "#cbd5e0",
    activegray: "#edf2f7",
    gray: {
      50: "#f2f2f2",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#262626",
      900: "#0d0d0d",
    },
  },
  fonts,
  breakpoints,
});

export default theme;
