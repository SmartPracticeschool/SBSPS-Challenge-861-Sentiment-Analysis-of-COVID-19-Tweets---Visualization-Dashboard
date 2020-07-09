import React from "react";
import { ResponsivePieCanvas } from "@nivo/pie";

const PieChart = ({ data }) => (
  <ResponsivePieCanvas
    data={data}
    margin={{ top: 30, right: 0, bottom: 10, left: 0 }}
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
    interactive={false}
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

export default PieChart;
