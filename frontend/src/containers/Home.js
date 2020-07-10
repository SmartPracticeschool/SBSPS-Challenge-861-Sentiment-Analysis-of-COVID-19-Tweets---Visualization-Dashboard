import React from "react";
import "../styles/Home.css";
import { Typography, Grid, Button } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info";

const Home = (props) => {
  return (
    <div id="background">
      <Grid
        style={{ height: "100%" }}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h3" align="center">
          Sentiment Analysis of COVID-19 Tweets
        </Typography>
        <br />
        <Grid item spacing={5}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DashboardIcon />}
            style={{ margin: "10px" }}
            onClick={() => props.history.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<InfoIcon />}
            style={{ margin: "10px" }}
            onClick={() => props.history.push("/about")}
          >
            About
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
