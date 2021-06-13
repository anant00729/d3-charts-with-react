// import react, { Component } from "react";
// import D3Chart from "./D3Chart";

// class ChartWrapper extends Component {
//   componentDidMount() {
//     this.setState({ chart: new D3Chart(this.refs.chart) });
//   }

//   shouldComponentUpdate() {
//     return false;
//   }

//   componentWillReceiveProps(nextProps) {
//     this.state.chart.update(nextProps.gender);
//   }

//   render() {
//     return <div ref="chart"></div>;
//   }
// }

// export default ChartWrapper;

import React, { useRef, useState, useEffect } from "react";
import D3Chart from "./D3Chart";

const ChartWrapper = ({ gender }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState(null);
  const [currentGender, setGender] = useState(null);

  useEffect(() => {
    if (!chart && !currentGender) {
      setChart(new D3Chart(chartArea.current));
      setGender(gender);
    } else {
      if (currentGender !== gender) {
        chart.update(gender);
        setGender(gender);
      }
    }
  }, [chart, gender, currentGender]);

  return <div className="chart-area" ref={chartArea}></div>;
};

export default ChartWrapper;
