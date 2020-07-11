import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  SvgIcon,
  IconButton,
} from "@material-ui/core";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin.svg";
import { ReactComponent as GithubIcon } from "../assets/github.svg";

const useStyles = makeStyles({
  root: {
    width: 300,
    maxWidth: 345,
    height: 400,
    backgroundColor: "#121212",
    background: "linear-gradient(rgba(255,255,255,.16), rgba(255,255,255,.16))",
  },
  content: {
    height: 110,
  },
  media: {
    height: 210,
  },
});

const Profile = ({ name, image, role, github, linkedin, history }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`./assets/${image}.jpg`}
          title={`${name}`}
        />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography
            style={{ color: "rgba(255,255,255,.6)" }}
          >{`${role}`}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {linkedin ? (
          <IconButton
            size="small"
            color="primary"
            onClick={() => window.open(linkedin)}
          >
            <SvgIcon>
              <LinkedInIcon />
            </SvgIcon>
          </IconButton>
        ) : null}

        {github ? (
          <IconButton
            size="small"
            color="primary"
            onClick={() => window.open(github)}
          >
            <SvgIcon>
              <GithubIcon />
            </SvgIcon>
          </IconButton>
        ) : null}
      </CardActions>
    </Card>
  );
};

const Team = (props) => {
  const squad = [
    {
      image: "nipun",
      name: "Nipun Haldar",
      role: "Full-Stack Web Dev · DevOps · Data Analyst",
      linkedin: "https://www.linkedin.com/in/nipunhaldar/",
      github: "https://github.com/nipun24",
    },
    {
      image: "rahul",
      name: "Rahul Hebbar",
      role: "Data Analyst · Backend Developer",
      linkedin: "https://www.linkedin.com/in/p-r-hebbar",
      github: false,
    },
    {
      image: "aditya",
      name: "Aditya Kumar",
      role: "Data Mining · Backend Developer",
      linkedin: "https://www.linkedin.com/in/aditya-kumar-34a901151/",
      github: false,
    },
    {
      image: "keshav",
      name: "Kesava Karri",
      role: "UI/UX Developer",
      linkedin: "https://www.linkedin.com/in/aditya-kumar-34a901151/",
      github: false,
    },
  ];
  return (
    <div style={{ padding: "20px 0 0 0" }}>
      <Typography
        align="center"
        variant="h2"
        style={{ margin: "0px 0 20px 0" }}
      >
        Meet the Team
      </Typography>
      <Grid
        container
        direcion="row"
        justify="space-around"
        alignItems="center"
        style={{ height: "70vh" }}
      >
        {squad.map((member) => {
          return (
            <Grid item style={{ margin: "10px" }}>
              <Profile
                name={member.name}
                image={member.image}
                role={member.role}
                github={member.github}
                linkedin={member.linkedin}
                history={props.history}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Team;
