import React from "react";
import { ResponsiveBarCanvas } from "@nivo/bar";

const BarChart = ({ data }) => (
  <ResponsiveBarCanvas
    data={data[0]}
    keys={["objectivity", "subjectivity"]}
    indexBy="x"
    margin={{ top: 10, right: 20, bottom: 45, left: 40 }}
    pixelRatio={1}
    padding={0.15}
    innerPadding={0}
    minValue="auto"
    maxValue="auto"
    groupMode="stacked"
    layout="vertical"
    reverse={false}
    colors={{ scheme: "nivo" }}
    colorBy="id"
    borderWidth={0}
    enableGridX={false}
    enableGridY={true}
    enableLabel={true}
    labelSkipWidth={12}
    labelSkipHeight={12}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom",
        direction: "row",
        justify: false,
        itemTextColor: "rgba(255,255,255,.87)",
        translateY: 45,
        itemsSpacing: 2,
        itemDirection: "left-to-right",
        itemWidth: 100,
        itemHeight: 12,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
      },
    ]}
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
      legends: {
        text: {
          fontSize: 14,
        },
      },
    }}
  />
);
export default BarChart;
