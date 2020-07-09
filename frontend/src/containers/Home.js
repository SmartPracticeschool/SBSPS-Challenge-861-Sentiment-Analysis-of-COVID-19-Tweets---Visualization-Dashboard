import React from "react";
import "../styles/Home.css";
import { Typography, Grid, Button } from "@material-ui/core";

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.history.push("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </Grid>
    </div>
  );
};

export default Home;
