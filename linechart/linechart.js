var data = [ 
	[1,2,3],
	[9,3,1],
	[2,10,1]
];
var dataHeaders = ["a", "b", "c", "d", "e"];

var margin = {top: 30, right: 30, bottom: 30, left:30},
	width = 600 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
  	.attr("transform", "translate("+margin.left+","+margin.top+")");

//calculate min and max
var min = Number.MAX_VALUE;
var max = Number.MIN_VALUE;
for(var i=0; i<data.length; i++){
	if(d3.min(data[i]) < min)
		min = d3.min(data[i]);
	if(d3.max(data[i]) > max)
		max = d3.max(data[i]);
}

var y = d3.scale.linear()
	.domain([min, max])
	.range([height, 0]);
	

var x = d3.scale.ordinal()
	.domain(d3.range(dataHeaders.length))
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
	.y(function(d,i){ return y(d)})
	.interpolate("cardinal");

//make the paths
var paths = svg.selectAll(".paths")
	.data(data)
  .enter().append("path")
  	.attr("d", function(d){ console.log(lineFunction(d)); return lineFunction(d); })
  	.attr("fill", "none");
