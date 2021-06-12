const margin = {
  top: 40,
  bottom: 50,
  left: 100,
  right: 20,
};

const graphWidth = 560 - margin.left - margin.right;
const graphHeight = 400 - margin.top - margin.bottom;

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", graphWidth + margin.left + margin.right)
  .attr("height", graphHeight + margin.top + margin.bottom);

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left},${margin.top})`);

let data = [];
db.collection("activities").onSnapshot(({ docs }) => {
  data = docs.map((d) => d.data());
  update(data);
});

// scales
const x = d3.scaleTime().range([0, graphWidth]);
const y = d3.scaleLinear().range([graphHeight, 0]);

// axes groups
const xAxisGroup = graph
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${graphHeight})`);

const yAxisGroup = graph.append("g").attr("class", "y-axis");

// create line
const line = d3
  .line()
  .x((d) => x(new Date(d.date)))
  .y((d) => y(d.distance));

const path = graph.append("path");

// create dotted line group and append to graph
const dottedLines = graph
  .append("g")
  .attr("class", "lines")
  .style("opacity", 0);

// create x dotted line and append to the dotted group
const xDottedLines = dottedLines
  .append("line")
  .attr("stroke", "#aaa")
  .attr("stroke-width", 1)
  .attr("stroke-dasharray", 4);

// create y dotted line and append to the dotted group
const yDottedLines = dottedLines
  .append("line")
  .attr("stroke", "#aaa")
  .attr("stroke-width", 1)
  .attr("stroke-dasharray", 4);

const update = (data) => {
  data = data.filter((item) => item.activity == activity);

  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  // set scale domains
  x.domain(d3.extent(data, (d) => new Date(d.date)));
  y.domain([0, d3.max(data, (d) => d.distance)]);

  // update line path element
  path
    .data([data])
    .attr("fill", "none")
    .attr("stroke", "#00bfa5")
    .attr("stroke-width", 2)
    .attr("d", line);

  // create circles for objects
  const circles = graph.selectAll("circle").data(data);

  // remove unwanted points
  circles.exit().remove();

  // udpate current points
  circles
    .attr("cx", (d) => x(new Date(d.date)))
    .attr("cy", (d) => y(d.distance));

  // add new circles
  circles
    .enter()
    .append("circle")
    .attr("r", 4)
    .attr("cx", (d) => x(new Date(d.date)))
    .attr("cy", (d) => y(d.distance))
    .attr("fill", "#ccc");

  graph
    .selectAll("circle")
    .on("mouseover", handleMouseOver)
    .on("mouseleave", handleMouseOut);

  // create axes
  const xAxis = d3.axisBottom(x).ticks(4).tickFormat(d3.timeFormat("%b %d"));
  const yAxis = d3
    .axisLeft(y)
    // .ticks(4)
    .tickFormat((d) => `${d}m`);

  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  // rotate axis text
  xAxisGroup
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .attr("text-anchor", "end");
};

function handleMouseOver(d, i, n) {
  d3.select(this).transition().duration(100).attr("r", 8).attr("fill", "#fff");

  xDottedLines
    .attr("x1", x(new Date(i.date)))
    .attr("x2", x(new Date(i.date)))
    .attr("y1", graphHeight)
    .attr("y2", y(i.distance));

  yDottedLines
    .attr("x1", 0)
    .attr("x2", x(new Date(i.date)))
    .attr("y1", y(i.distance))
    .attr("y2", y(i.distance));

  dottedLines.style("opacity", 1);
}
function handleMouseOut(d, i, n) {
  d3.select(this).transition().duration(100).attr("r", 4).attr("fill", "#ccc");
  dottedLines.style("opacity", 0);
}
