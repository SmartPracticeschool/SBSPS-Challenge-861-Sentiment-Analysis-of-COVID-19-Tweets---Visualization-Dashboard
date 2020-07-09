import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PieChartIcon from "@material-ui/icons/PieChart";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import PieChart from "../components/PieChart.js";
import LineChart from "../components/LineChart.js";
import { LineData } from "../TempData.js";
import Location from "./Location.js";
import Pie from "./Pie.js";
import Time from "./Time.js";
import io from "socket.io-client";

import Map from "../components/Map.js";

const useStyles = makeStyles({
  drawerTheme: {
    backgroundColor: "#121212",
    background: "linear-gradient(rgba(255,255,255,.16), rgba(255,255,255,.16))",
  },
  appbarTheme: {
    background: "linear-gradient(rgba(255,255,255,.16), rgba(255,255,255,.16))",
  },
  dividerColor: {
    backgroundColor: "rgba(255,255,255,.16)",
  },
  paperTheme: {
    backgroundColor: "#121212",
    background: "linear-gradient(rgba(255,255,255,.16), rgba(255,255,255,.16))",
  },
});

const tileStyle = {
  height: "30vh",
  minHeight: "200px",
  minWidth: "500px",
  margin: "20px",
};

//socket.io
const socket = io(`${process.env.REACT_APP_URL}`);

//Dashboard component
const Dashboard = (props) => {
  const classes = useStyles();

  //drawer states and functions
  const [isOpen, setDrawer] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer(isOpen);
  };

  //Location Dialog states and functions
  const [isLocationOpen, setLocationOpen] = useState(false);

  //Pie Chart Dialog states and functions
  const [isPieOpen, setPieOpen] = useState(false);

  //Time ghaph dialog states and functions
  const [isTimeOpen, setTimeOpen] = useState(false);

  //loading
  const [isLoading, setLoading] = useState(true);

  //piechart data
  const [pieData, setPieData] = useState(null);

  // getting data from backend
  useEffect(() => {
    console.log("dash");
    socket.emit("dashboard");
    socket.on("pie", (data) => {
      console.log(data);
      setPieData(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div style={{ height: "100vh", overflowX: "hidden" }}>
        {/* Navbar */}
        <AppBar position="static" classes={{ root: classes.appbarTheme }}>
          <Toolbar variant="dense">
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Dashboard</Typography>
          </Toolbar>
        </AppBar>

        {/* Side navigation drawer */}
        <Drawer
          anchor="left"
          open={isOpen}
          onClose={toggleDrawer(false)}
          classes={{ paper: classes.drawerTheme }}
        >
          <List style={{ width: "auto" }}>
            <ListItem button onClick={() => props.history.push("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <Divider classes={{ root: classes.dividerColor }} />
            <ListItem button onClick={() => props.history.push("/dashboard")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ShowChartIcon />
              </ListItemIcon>
              <ListItemText primary="Time Graph" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Location Based" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <WhatshotIcon />
              </ListItemIcon>
              <ListItemText primary="Heat Map" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PieChartIcon />
              </ListItemIcon>
              <ListItemText primary="Pie Chart" />
            </ListItem>
            <Divider classes={{ root: classes.dividerColor }} />
          </List>
        </Drawer>
        {/* Graph components - tiles */}
        <Grid
          style={{ height: "90vh" }}
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} lg={6}>
            <Paper
              classes={{ root: classes.paperTheme }}
              style={tileStyle}
              onClick={() => setTimeOpen(true)}
            >
              <LineChart data={LineData} />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <Paper
              classes={{ root: classes.paperTheme }}
              style={tileStyle}
              onClick={() => setLocationOpen(true)}
            >
              <Map interactive={false} />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <Paper classes={{ root: classes.paperTheme }} style={tileStyle}>
              Time Graph
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <Paper
              classes={{ root: classes.paperTheme }}
              style={{
                ...tileStyle,
                "&:hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => setPieOpen(true)}
            >
              <PieChart data={pieData} interactive={false} />
            </Paper>
          </Grid>
        </Grid>
        <Location open={isLocationOpen} toggle={setLocationOpen} />
        <Pie open={isPieOpen} toggle={setPieOpen} />
        <Time open={isTimeOpen} toggle={setTimeOpen} />
      </div>
    );
  }
};

export default Dashboard;
