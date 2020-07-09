import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.css";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#121212",
    },
  },
  typography: {
    color: "rgba(255, 255, 255, 0.87);",
  },
  paper: {
    root: {
      backgroundColor: "#121212",
      background:
        "linear-gradient(rgba(255,255,255,.16), rgba(255,255,255,.16))",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
