var dataHeaders = ["colA","colB", "colC"];
var data = [ 
	[1,2,3],
	[9,3,1]
];  //each array corresponds to a line and must have length == dataHeaders.length

var margin = {top: 30, right: 30, bottom: 10, left: 30},
	width = 700 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg") //containerID is div that the chart goes in
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
  	.attr("transform", "translate("+margin.left+","+margin.top+")");

//x axis scale measures distances between y axes
var x = d3.scale.ordinal()
	.rangePoints([0, width], 0) //second number is padding from sides
	.domain(d3.range(dataHeaders.length));

var y = {}; //each index corresponds to a separate linear scale for each vertical axis.

//set up y axis scales
for(var i=0; i<dataHeaders.length; i++){
	y[i] = d3.scale.linear()
		.domain(d3.extent(data, function(j){ return j[i];})) //for each array j in data, return j[i]
		.range([height, 0]);
}

//function to calculate the x,y points of each line
var lineFunction = d3.svg.line()
	.x(function(d,i){ return x(i);})
	.y(function(d,i){ return y[i](d)})
	.interpolate("linear");

//make the paths
var paths = svg.selectAll(".paths")
	.data(data)
  .enter().append("path")
  	.attr("d", function(d){ return lineFunction(d); })
  	.attr("fill", "none");

//draw the y axes
var axis = d3.svg.axis().orient("left");

var g = svg.selectAll(".axis")
    .data(dataHeaders)
  .enter().append("g")
    .attr("class", "axis")
    .attr("transform", function(d,i) { return "translate(" + x(i) + ")"; })
	.each(function(d,i){ d3.select(this).call(axis.scale(y[i])); })
  .append("text")
  	.attr("text-anchor", "middle")
  	.attr("y", -9)
  	.text(String);