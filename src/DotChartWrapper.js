import react, { Component } from "react";
import DotD3Chart from "./DotD3Chart";

class DotChartWrapper extends Component {
  componentDidMount() {
    this.setState({
      chart: new DotD3Chart(
        this.refs.chart,
        this.props.data,
        this.props.updateActiveName
      ),
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    this.state.chart.update(nextProps.data);
  }

  render() {
    return <div ref="chart"></div>;
  }
}

export default DotChartWrapper;
