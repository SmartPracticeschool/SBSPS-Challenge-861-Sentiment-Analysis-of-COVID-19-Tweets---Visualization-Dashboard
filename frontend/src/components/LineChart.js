import React from "react";
import { ResponsiveLine } from "@nivo/line";

const LineChart = ({ data }) => (
  <ResponsiveLine
    data={data[0]}
    margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
    yScale={{ type: "linear" }}
    axisBottom={{
      tickValues: `every ${data[1]} minutes`,
    }}
    curve="monotoneX"
    colors={{ scheme: "dark2" }}
    lineWidth={2}
    pointSize={8}
    isInteractive={true}
    useMesh={true}
    legends={[
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        itemTextColor: "rgba(255,255,255,.87)",
        translateY: 50,
        itemsSpacing: 2,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 12,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
      },
    ]}
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
      legends: {
        text: {
          fontSize: 14,
        },
      },
    }}
  />
);

export default LineChart;
