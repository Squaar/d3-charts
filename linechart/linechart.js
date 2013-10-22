var data = [1, 5, 3, 6, 2];
var dataHeaders = ["a", "b", "c", "d", "e"];

var margin = {top: 30, right: 30, bottom: 30, left:30},
	width = 600 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
  	.attr("transform", "translate("+margin.left+","+margin.top+")");

var y = d3.scale.linear()
	.domain(d3.extent(data))
	.range([height, 0]);
	

var x = d3.scale.ordinal()
	.domain(d3.range(data.length))
	.rangeBands([0, width]);

//horizontal lines
svg.selectAll("line")
	.data(y.ticks(10))
  .enter().append("line")
	.attr("x1", 0)
	.attr("x2", width)
	.attr("y1", y)
	.attr("y2", y)
	.style("stroke", "#ccc");

//function to calculate the x,y points of each line
var lineFunction = d3.svg.line()
	.x(function(d,i){ return x(i);})
	.y(function(d,i){ return y(d);})
	.interpolate("cardinal");

//make the paths
var paths = svg.selectAll(".paths")
	.data(data)
  .enter().append("path")
  	.attr("d", function(d){ console.log(d); return lineFunction(d); })
  	.attr("fill", "none");