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
  Typography,
  CircularProgress,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";
import PieChart from "../components/PieChart.js";
import LineChart from "../components/LineChart.js";
import Location from "./Location.js";
import Pie from "./Pie.js";
import Time from "./Time.js";
import BarChart from "../components/BarChart.js";
import io from "socket.io-client";
import Map from "../components/Map.js";
import { data } from "../TempData.js";

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
  minWidth: "400px",
  margin: "20px",
};

//socket.io
// const socket = io("/");
const socket = io("http://localhost:3001");

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

  //line data
  const [lineData, setLineData] = useState(null);

  // getting data from backend
  useEffect(() => {
    socket.emit("dashboard");
    socket.on("pie", (data) => {
      setPieData(data);
    });
    socket.on("line", (data) => {
      setLineData(data);
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
          <List style={{ width: "250px" }}>
            <ListItem button onClick={() => props.history.push("/")}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => props.history.push("/dashboard")}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => props.history.push("/about")}>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
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
              <LineChart data={lineData} />
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
              <BarChart data={data} />
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <Paper
              classes={{ root: classes.paperTheme }}
              style={tileStyle}
              onClick={() => setPieOpen(true)}
            >
              <Typography variant="h5" align="center">
                Polarity Distribution
              </Typography>
              <div style={{ height: "90%" }}>
                <PieChart data={pieData} interactive={false} />
              </div>
            </Paper>
          </Grid>
        </Grid>
        <Location open={isLocationOpen} toggle={setLocationOpen} />
        <Pie open={isPieOpen} toggle={setPieOpen} data={pieData} />
        <Time open={isTimeOpen} toggle={setTimeOpen} />
      </div>
    );
  }
};

export default Dashboard;
