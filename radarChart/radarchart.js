//http://bl.ocks.org/mbostock/3048740


var dataHeaders = ["colA", "colB", "colC"];
var data = [
	[1,2,3],
	[9,3,1],
	[5,7,3]
];

var margin = {top: 10, right: 10, bottom: 10, left: 10},
		width = 500 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var innerRadius = 0;
var outerRadius = d3.min([width, height]);

var axes = [];

for(var i=0; i<dataHeaders.length; i++){
	axes[i] = d3.scale.linear()
		.domain(d3.extent(data[i]))
		.range([innerRadius, outerRadius]);
}

var theta = d3.scale.linear()
		.domain(d3.range(dataHeaders.length))
		.range([0, 2*Math.PI]);

var x = function(radius, theta){
	return radius*Math.cos(theta);
};
var y = function(radius, theta){
	return radius*Math.sin(theta);
};

//function to calculate the x,y points of each line
var lineFunction = d3.svg.line()
	.x(function(d,i){ return x(axes[i](d), theta(i));})
	.y(function(d,i){ return y(axes[i](d), theta(i));})
	.interpolate("linear");

//make the paths
var paths = svg.selectAll(".paths")
	.data(data)
  .enter().append("path")
  	.attr("d", function(d){ return lineFunction(d); })
  	.attr("fill", "none");

// svg.selectAll(".axis")
// 		.data(dataHeaders)
// 	.enter().append("g")
// 		.attr("class", "axis")
// 		.attr("transform", function(d,i) { return "translate(" + x(width/2 + innerRadius, theta(i)) + "," + y(height/2 + innerRadius, theta(i)) + ")rotate(" + theta(i) * 180 / Math.PI + ")"; })
// 		//.attr("transform", function(d,i) { return "rotate(" + theta(i) * 180 / Math.PI + ")"; })
// 		//.attr("transform", function(d,i) { return "translate(" + x(width/2 + innerRadius, theta(i)) + "," + y(height/2 + innerRadius, theta(i)) + ")";})
// 	.each(function(d,i){ d3.select(this).call(d3.svg.axis()
// 		.orient("left")
// 		.scale(axes[i]));})
// 	.append("text")
// 		.attr("y", -outerRadius+6)
// 		.attr("text-anchor", "middle")
// 		.text(String);