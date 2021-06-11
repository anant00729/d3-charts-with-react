const margin = {
  top: 40,
  bottom: 50,
  left: 100,
  right: 20,
};

const graphWidth = 560 - margin.left - margin.right;
const graphHeight = 400 - margin.top - margin.bottom;

const canvas = d3
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

const update = (data) => {
  console.log(`data`, data);
};
