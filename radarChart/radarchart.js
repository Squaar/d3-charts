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

var innerRadius = d3.min([width, height]) / 10;
var outerRadius = d3.min([width, height]) * 9/10;

var axes = {};

for(var i=0; i<dataHeaders.length; i++){
	axes[i] = d3.scale.linear()
		.domain(d3.extent(data, function(j){ return j[i];}))
		.range([-innerRadius, -outerRadius]);
}

var radius = d3.scale.linear()
		.range([0, height/2-10]);

var angle = d3.scale.linear()
		.range([0, 2*Math.PI]);

// var stack = d3.layout.stack()
// 		.offset("zero")
// 		.values(

svg.selectAll(".axis")
		.data(dataHeaders)
	.enter().append("g")
		.attr("class", "axis")
		//.attr("transform", function(d) { return "rotate(" + angle(d) * 180 / Math.PI + ")"; })
	.each(function(d,i){ d3.select(this).call(d3.svg.axis()
		.orient("left")
		.scale(axes[i])); })
	.append("text")
		.attr("y", -outerRadius+6)
		.attr("text-anchor", "middle")
		.text(String);
alert(axes.length);