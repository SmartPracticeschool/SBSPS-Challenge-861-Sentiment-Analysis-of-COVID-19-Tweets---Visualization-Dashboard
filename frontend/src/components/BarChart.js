import React from "react";
import { ResponsiveBarCanvas } from "@nivo/bar";

const BarChart = ({ data }) => (
  <ResponsiveBarCanvas
    data={data}
    // keys={["positive"]}
    indexBy="sentiment"
    margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
    pixelRatio={1}
    padding={0.15}
    innerPadding={0}
    minValue="auto"
    maxValue="auto"
    groupMode="stacked"
    layout="vertical"
    reverse={false}
    colors={{ scheme: "dark2" }}
    colorBy="index"
    borderWidth={0}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    enableGridX={false}
    enableGridY={true}
    enableLabel={true}
    labelSkipWidth={12}
    labelSkipHeight={12}
    // labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    isInteractive={true}
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
      // legends: {
      //   text: {
      //     fontSize: 14,
      //   },
      // },
    }}
  />
);
export default BarChart;
