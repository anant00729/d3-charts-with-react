import * as d3 from "d3";
const MARGIN = { TOP: 10, BOTTOM: 50, LEFT: 70, RIGHT: 10 };
const WIDTH = 550 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class DotD3Chart {
  constructor(element, data, updateActiveName) {
    const self = this;
    self.updateActiveName = updateActiveName;

    self.svg = d3
      .select(element)
      .append("svg")
      .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
      .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
      .append("g")
      .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

    self.x = d3.scaleLinear().range([0, WIDTH]);

    self.y = d3.scaleLinear().range([HEIGHT, 0]);

    self.xAxisGroup = self.svg
      .append("g")
      .attr("transform", `translate(0,${HEIGHT})`);
    self.yAxisGroup = self.svg.append("g");

    self.svg
      .append("text")
      .attr("x", WIDTH / 2)
      .attr("y", HEIGHT + 40)
      .attr("fontsize", 20)
      .attr("text-anchor", "middle")
      .text("Age");

    self.svg
      .append("text")
      .attr("x", -HEIGHT / 2)
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Height in cm")
      .attr("transform", `rotate(-90)`);

    self.update(data);
  }

  update(newData) {
    this.data = newData;
    const { x, y, data, svg, xAxisGroup, yAxisGroup, updateActiveName } = this;
    x.domain([0, d3.max(data, (d) => Number(d.age))]);
    y.domain([0, d3.max(data, (d) => Number(d.height))]);

    const xAxisCall = d3.axisBottom(x);
    const yAxisCall = d3.axisLeft(y);

    xAxisGroup.transition(1000).call(xAxisCall);
    yAxisGroup.transition(1000).call(yAxisCall);

    // JOIN
    const circles = svg.selectAll("circle").data(data, (d) => d.name);

    // EXIT
    circles.exit().transition(1000).attr("cy", y(0)).remove();

    // UPDATE
    circles
      .transition(1000)
      .attr("cx", (d) => x(d.age))
      .attr("cy", (d) => y(d.height));

    // ENTER
    circles
      .enter()
      .append("circle")
      .attr("cy", y(0))
      .attr("cx", (d) => x(d.age))
      .attr("r", 5)
      .attr("fill", "grey")
      .on("click", (d, data) => {
        updateActiveName(data.name);
      })
      .transition(1000)
      .attr("cy", (d) => y(d.height));
  }
}
