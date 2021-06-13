import React, { useRef, useState, useEffect } from "react";
import DotD3Chart from "./DotD3Chart";

const DotChartWrapper = ({ data, updateActiveName }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new DotD3Chart(chartArea.current, data, updateActiveName));
    } else {
      chart.update(data);
    }
  }, [chart, data]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default DotChartWrapper;
