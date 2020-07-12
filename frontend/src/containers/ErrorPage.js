import React from "react";
import { Button, Typography, Grid, makeStyles } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#42a5f5",
  },
});

const ErrorPage = (props) => {
  const classes = useStyles();
  return (
    <Grid
      style={{ height: "100%", widh: "100%" }}
      direction="column"
      alignItems="center"
      justify="center"
      container
    >
      <Typography variant="h1">Error 404</Typography>
      <Typography variant="h5">Page not found</Typography>
      <Button
        className={classes.button}
        variant="contained"
        startIcon={<HomeIcon />}
        style={{ margin: "10px" }}
        onClick={() => props.history.push("/")}
      >
        Go back home
      </Button>
    </Grid>
  );
};

export default ErrorPage;
