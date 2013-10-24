var data = [ 
	[1,2,3,12],
	[9,20,1,-5],
	[2,10,1,16],
	[12,12,12,14]
];
var xData = [1,2,3,4,5,6,7,8,9,10];
xData = xData.slice(0, data[0].length);

var margin = {top: 40, right: 30, bottom: 30, left:40},
	width = 600 - margin.left - margin.right,
	height = 400 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
  	.attr("transform", "translate("+margin.left+","+margin.top+")");

//calculate min and max
var max = d3.max(data, function(data){
	return d3.max(data);
});

var min = d3.min(data, function(data){
	return d3.min(data);
});

var y = d3.scale.linear()
	.domain([min, max])
	.range([height, 0]);
	

var x = d3.scale.ordinal()
	.domain(d3.range(xData.length))
	.rangePoints([0, width]);

var color = d3.scale.category10()
	.domain(data.length);

//horizontal lines
svg.selectAll("line")
	.data(y.ticks(10))
  .enter().append("line")
	.attr("x1", 0)
	.attr("x2", width)
	.attr("y1", y)
	.attr("y2", y)
	.attr("class", "horizontal-line")
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
  	.attr("d", function(d){return lineFunction(d);})
	.attr("stroke", function(d,i){return color(i);})
  	.attr("fill", "none");

//draw the y axis
var yAxis = svg.append("g")
	.attr("class", "axis")
  .call(d3.svg.axis().orient("left").scale(y));
  //.append("text")
	//.attr("text-anchor", "middle")
	//.attr("y", -20)
	//.attr("x", 5)
	//.text(String);

//draw the x axis
var xAxis = svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(0, " + height + ")")
  .call(d3.svg.axis().orient("bottom").scale(x));
