import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import PropTypes from "prop-types";
import { purple } from "./purpleTheme";
export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={purple}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
AppTheme.propTypes = {
  children: PropTypes.object,
};
