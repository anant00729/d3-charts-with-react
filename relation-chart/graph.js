const dims = { width: 1100, height: 500 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 100)
  .attr("height", dims.height + 100);

const graph = svg.append("g").attr("transform", "translate(50,50)");

const stratify = d3
  .stratify()
  .id((d) => d.name)
  .parentId((d) => d.parent);

const tree = d3.tree().size([dims.width, dims.height]);

const color = d3.scaleOrdinal([
  "gray",
  "maroon",
  "navy",
  "olive",
  "orange",
  "purple",
  "silver",
]);

const update = (data) => {
  // remove current nodes
  graph.selectAll(".node").remove();
  graph.selectAll(".link").remove();

  // update ordinal scale
  color.domain(data.map((i) => i.department));

  // get updated root node data
  const rootNode = stratify(data);

  const treeData = tree(rootNode);

  //get node selection and join data
  const nodes = graph.selectAll(".node").data(treeData.descendants());

  const links = graph.selectAll(".link").data(treeData.links());

  console.log(`treeData.links()`, treeData.links());

  links
    .enter()
    .append("path")
    // .transition()
    // .duration(300)
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#aaa")
    .attr("stroke-width", 2)
    .attr(
      "d",
      d3
        .linkVertical()
        .x((d) => d.x)
        .y((d) => d.y)
    );

  // create enter node groups
  const enterNodes = nodes
    .enter()
    .append("g")
    .attr("class", "node")
    .attr("transform", (d) => `translate(${d.x},${d.y})`);

  // append rects to enter nodes
  enterNodes
    .append("rect")
    .attr("fill", (d) => color(d.data.department))
    .attr("stroke", "#555")
    .attr("stroke-width", 2)
    .attr("height", 50)
    .attr("width", (d) => d.data.name.length * 20)
    .attr("transform", (d) => {
      let x = d.data.name.length * 10;
      return `translate(${-x}, -32)`;
    });

  enterNodes
    .append("text")
    .attr("text-anchor", "middle")
    .attr("fill", "white")
    .text((d) => d.data.name);
};

let data = [];
db.collection("employees").onSnapshot((res) => {
  data = res.docs.map((d) => ({ ...d.data(), id: d.id }));
  update(data);
});
