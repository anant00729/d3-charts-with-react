const dims = { height: 300, width: 300, radius: 150 };
const center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

const svg = d3
  .select(".canvas")
  .append("svg")
  .attr("width", dims.width + 150)
  .attr("height", dims.height + 150);

const graph = svg
  .append("g")
  .attr("transform", `translate(${center.x},${center.y})`);

const pie = d3
  .pie()
  .sort(null)
  .value((d) => d.cost);

const color = d3.scaleOrdinal(d3["schemeSet3"]);

// const angles = pie([
//   { name: "rent", cost: "500" },
//   { name: "pepse", cost: "120" },
//   { name: "cola", cost: "432" },
// ]);

// legend setup
const legendGroup = svg
  .append("g")
  .attr("transform", `translate(${dims.width + 40}, 10)`);

const legend = d3.legendColor().shape("circle").shapePadding(10).scale(color);

const tip = d3
  .tip()
  .attr("class", "tip card")
  .html((d) => {
    let content = `<div class="name">${d.data.name}</div>`;
    content += `<div class="cost">${d.data.cost}</div>`;
    content += `<div class="delete">Click slice to delete</div>`;
    return content;
  });

graph.call(tip);

const update = (data) => {
  // update color scale domain
  color.domain(data.map((d) => d.name));

  // // update and call legend
  legendGroup.call(legend);
  legendGroup.selectAll("text").attr("fill", "white");

  // join enhanced (pie) data to path element
  const paths = graph.selectAll("path").data(pie(data));

  // handle the exit selection
  paths.exit().remove();

  // handle the current DOM path updates
  paths
    .attr("d", arcPath)
    .transition()
    .duration(750)
    .attrTween("d", arcTweenUpdate);

  paths
    .enter()
    .append("path")
    .attr("class", "arc")
    .attr("d", arcPath)
    .attr("stroke", "#fff")
    .attr("stroke-width", 3)
    .attr("fill", (d) => color(d.data.name))
    .each((d) => {
      this._current = d;
    })
    .transition()
    .duration(750)
    .attrTween("d", arcTweenEnter);

  // add events
  graph
    .selectAll("path")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("click", handleClick);
};

function handleClick(d, i) {
  const id = i.data.id;
  db.collection("expenses").doc(id).delete();
}

function handleMouseOut(d, i, n) {
  tip.hide();
  d3.select(this)
    .transition("changeSliceFill")
    .duration(300)
    .attr("fill", color(i.data.name));
}

function handleMouseOver(d, i, n) {
  tip.show(i, this);
  d3.select(this)
    .transition("changeSliceFill")
    .duration(300)
    .attr("fill", "#fff");
}

const arcPath = d3
  .arc()
  .outerRadius(dims.radius)
  .innerRadius(dims.radius / 2);

// data array and firestore
let data = [];
db.collection("expenses").onSnapshot((res) => {
  // const expenseList = res.docChanges().map((d) => {
  //   const doc = { ...d.doc.data(), id: d.doc.id };
  //   return doc;
  // });
  data = res.docs.map((d) => ({ ...d.data(), id: d.id }));
  update(data);
});

const arcTweenEnter = (d) => {
  let i = d3.interpolate(d.endAngle, d.startAngle);
  return (t) => {
    d.startAngle = i(t);
    return arcPath(d);
  };
};

// use function keyboard to allow use of 'this'
const arcTweenUpdate = (d) => {
  // console.log(`this._current`, this._current);
  // console.log(`d`, d);
  // interpolate between two objects
  let i = d3.interpolate(this._current, d);
  // update the current prop with new udpated data
  this._current = d;

  return (t) => {
    return arcPath(i(t));
  };
};
