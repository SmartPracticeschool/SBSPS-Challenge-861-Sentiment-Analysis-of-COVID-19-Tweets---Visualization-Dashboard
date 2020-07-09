import React from "react";
import { ResponsivePieCanvas } from "@nivo/pie";

const PieChart = ({ data, interactive }) => (
  <ResponsivePieCanvas
    data={data}
    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
    pixelRatio={1}
    innerRadius={0.5}
    padAngle={0.7}
    cornerRadius={3}
    colors={{ scheme: "dark2" }}
    borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
    radialLabelsTextXOffset={6}
    radialLabelsTextColor={{ from: "color", modifiers: [] }}
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
    sortByValue={true}
    isInteractive={interactive}
    legends={[
      {
        anchor: "right",
        direction: "column",
        itemWidth: 60,
        itemHeight: 30,
        itemsSpacing: 2,
        symbolSize: 14,
        symbolShape: "circle",
        itemTextColor: "rgba(255,255,255,0.6)",
        translateX: -50,
      },
    ]}
    theme={{
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

export default PieChart;
