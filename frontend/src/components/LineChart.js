import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineChart = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 20, right: 20, bottom: 30, left: 50 }}
    xScale={{ type: "linear" }}
    yScale={{ type: "linear" }}
    curve="monotoneX"
    enableGridX={true}
    enableGridY={true}
    colors={{ scheme: "dark2" }}
    lineWidth={1}
    pointSize={4}
    theme={{
      textColor: "rgba(255,255,255,.6)",
      fontFamily: "Roboto",
      tooltip: {
        container: {
          backgroundColor: "#121212",
          background:
            "linear-gradient(rgba(255,255,255,.24), rgba(255,255,255,.24))",
        },
      },
    }}
  />
);

export default LineChart;
