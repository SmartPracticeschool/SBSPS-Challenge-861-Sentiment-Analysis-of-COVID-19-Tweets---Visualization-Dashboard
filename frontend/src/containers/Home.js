import React from "react";
import "../styles/Home.css";
import { Typography, Grid, Button } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";

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
        <Grid item>
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
            startIcon={<GroupIcon />}
            style={{ margin: "10px" }}
            onClick={() => props.history.push("/team")}
          >
            Meet the Team
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
