import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { ResponsivePieCanvas } from "@nivo/pie";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#64b5f6",
    // background: "linear-gradient(rgba(255,255,255,.16), rgba(255,255,255,.16))",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const PieChart = ({ data, Pos }) => (
  <ResponsivePieCanvas
    data={data}
    margin={{ top: 50, bottom: 30 }}
    pixelRatio={1}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: "dark2" }}
    borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
    radialLabelsSkipAngle={10}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor="#ffffff"
    radialLabelsLinkOffset={0}
    radialLabelsLinkDiagonalLength={16}
    radialLabelsLinkHorizontalLength={24}
    radialLabelsLinkStrokeWidth={1}
    radialLabelsLinkColor={{ from: "color" }}
    slicesLabelsSkipAngle={10}
    slicesLabelsTextColor="#ffffff"
    animate={true}
    motionStiffness={90}
    motionDamping={15}
    theme={{
      fontSize: 14,
      tooltip: {
        container: {
          backgroundColor: "#121212",
          background:
            "linear-gradient(rgba(255,255,255,.24), rgba(255,255,255,.24))",
        },
      },
      legends: {
        text: {
          fontSize: 14,
        },
      },
    }}
  />
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Pie = ({ open, toggle, data }) => {
  const classes = useStyles();

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => toggle(false)}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => toggle(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Pie Chart
          </Typography>
        </Toolbar>
      </AppBar>
      <div
        style={{
          height: "100%",
          background:
            "linear-gradient(rgba(255,255,255,.12), rgba(255,255,255,.12))",
          backgroundColor: "#121212",
          justifyItems: "center",
        }}
      >
        <div
          style={{
            height: "70%",
          }}
        >
          <PieChart data={data} />
        </div>
        <Typography align="center">
          Pie Chart showing number of sentiments from each category
        </Typography>
      </div>
    </Dialog>
  );
};

export default Pie;
