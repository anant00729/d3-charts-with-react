// import { transition } from "d3-transition";

// const data = [
//   { width: 200, height: 200, fill: "pink" },
//   { width: 100, height: 60, fill: "purple" },
//   { width: 50, height: 30, fill: "skyblue" },
//   { width: 20, height: 20, fill: "green" },
// ];

// const svg = d3.select("svg");

// d3.json("planets.json").then((data) => {
//   const circles = svg.selectAll("circle").data(data);

//   circles
//     .enter()
//     .append("circle")
//     .attr("cy", 200)
//     .attr("cx", (d) => d.distance)
//     .attr("r", (d) => d.radius)
//     .attr("fill", (d) => d.fill);
// });

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", 600)
  .attr("height", 600);

// margins and dimensions
const margin = {
  top: 100,
  right: 100,
  left: 100,
  bottom: 100,
};

const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left},${margin.top})`);

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0,${graphHeight})`);
const yAxisGroup = graph.append("g");

// scales
const y = d3.scaleLinear().range([graphHeight, 0]);
const x = d3.scaleBand().range([0, 500]).paddingInner(0.2).paddingOuter(0.2);

// create the axies
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  // .ticks(3)
  .tickFormat((d) => `${d} orders`);

// // update the x-axis text
// xAxisGroup
//   .selectAll("text")
//   .attr("transform", "rotate(-40)")
//   .atrr("text-anchor", "end")
//   .atrr("fill", "green");

// const t = transition().duration(500);

// update function
const updates = (data) => {
  // udapting scales domain
  y.domain([0, d3.max(data, (d) => d.orders)]);
  x.domain(data.map((d) => d.name));

  // join the data
  const rects = graph.selectAll("rect").data(data);

  // remove exit selection
  rects.exit().remove();

  // update current shapes in doc
  rects
    .attr("width", x.bandwidth)
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name));
  // .transition()
  // .duration(500)
  // .attr("y", (d) => y(d.orders))
  // .attr("height", (d) => graphHeight - y(d.orders));

  // update the enter selection
  rects
    .enter()
    .append("rect")
    .attr("width", x.bandwidth)
    .attr("height", 0)
    .attr("fill", "orange")
    .attr("x", (d) => x(d.name))
    .attr("y", graphHeight)
    .merge(rects)
    .transition()
    .duration(500)
    .attr("y", (d) => y(d.orders))
    .attr("height", (d) => graphHeight - y(d.orders));

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);
};

// d3.json("menu.json").then((data) => {
// db.collection("dishes")
//   .get()

let data = [];
db.collection("dishes").onSnapshot(({ docs }) => {
  // console.log(`res`, res);
  // data = res.docChanges().map((c) => c.doc.data());
  data = docs.map((d) => d.data());
  // d3.interval(() => {
  //   data[0].orders += 50;
  //   // data.pop();
  //   updates(data);
  // }, 1000);
  updates(data);
  // const y = d3
  //   .scaleLinear()
  //   .domain([0, d3.max(data, (d) => d.orders)])
  //   .range([graphHeight, 0]);

  // const x = d3
  //   .scaleBand()
  //   .domain(data.map((d) => d.name))
  //   .range([0, 500])
  //   .paddingInner(0.2)
  //   .paddingOuter(0.2);

  // const min = d3.min(data, (d) => d.orders);
  // const max = d3.max(data, (d) => d.orders);
  // const extent = d3.extent(data, (d) => d.orders);

  // const rects = graph.selectAll("rect").data(data);
  // rects
  //   .attr("width", x.bandwidth)
  //   .attr("height", (d) => graphHeight - y(d.orders))
  //   .attr("fill", "orange")
  //   .attr("x", (d) => x(d.name))
  //   .attr("y", (d) => y(d.orders));

  // rects
  //   .enter()
  //   .append("rect")
  //   .attr("width", x.bandwidth)
  //   .attr("height", (d) => graphHeight - y(d.orders))
  //   .attr("fill", "orange")
  //   .attr("x", (d) => x(d.name))
  //   .attr("y", (d) => y(d.orders));
  // create and call the axes
  // const xAxis = d3.axisBottom(x);
  // const yAxis = d3
  //   .axisLeft(y)
  //   .ticks(3)
  //   .tickFormat((d) => `${d} orders`);

  // xAxisGroup.call(xAxis);
  // yAxisGroup.call(yAxis);

  // xAxisGroup
  //   .selectAll("text")
  //   .attr("transform", "rotate(-40)")
  //   .atrr("text-anchor", "end")
  //   .atrr("fill", "green");
});
