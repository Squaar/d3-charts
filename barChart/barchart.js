var data = [1, 1, 2, 4, 4, 5, 20];
var xLabels = [0, 1, 2, 3, 4, 5, 6];
var margin = {top: 10, right: 5, bottom: 30, left: 20},
	width = 160 - margin.left - margin.right,
	height = 450 - margin.top - margin.bottom;

if(data.length > xLabels.length){
	console.error("Data array too long, slicing...");
	data = data.slice(0, xLabels.length);
}

if(data.length < xLabels.length){
	console.error("xLabels array too long, slicing...");
	xLabels = xLabels.slice(0, data.length);
}

//create svg object and set up margins
var chart = d3.select("body").append("svg") //containerID is id of div the chart goes in
	.attr("class", "chart")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
  	.attr("transform", "translate("+margin.left+","+margin.top+")");

var y = d3.scale.linear()
	.domain([0, d3.max(data)])
	.range([height, 0]);

//bars have inverted scale because they "grow" up, not down
var yBars = d3.scale.linear()
	.domain([0, d3.max(data)])
	.range([0, height]);

var x = d3.scale.ordinal()
	.domain(d3.range(data.length))
	.rangeBands([0,width]);

//horizontal lines
chart.selectAll("line")
	.data(y.ticks(10))
  .enter().append("line")
  	.attr("class", "horizontal-line")
	.attr("x1", 0)
	.attr("x2", width)
	.attr("y1", y)
	.attr("y2", y)
	.style("stroke", "#ccc");

//the bars
chart.selectAll("rect")
	.data(data)
  .enter().append("rect")
  	.attr("x", function(d,i){ return x(i); })
  	.attr("y", function(d){ return height-yBars(d); })
  	.attr("width", x.rangeBand())
  	.attr("height", yBars);

//x axis text
var xRule = chart.selectAll(".xRule")
	.data(xLabels)
  .enter().append("text")
  	.attr("class", "rule")
  	//.attr("x", function(d,i){ return x(i); })
  	//.attr("y", height)
  	.attr("dx", 5)
  	.attr("dy", -x.rangeBand()/3)
  	.attr("text-anchor", "front")
  	.text(String);

//value text inside bars -- does not work correctly with current version!!
/*chart.selectAll("text")
	.data(data)
  .enter().append("text")
  	.attr("y", function(d){ return 420-yBars(d); })
  	.attr("x", function(d){ return x(d) + x.rangeBand()/2; })
  	.attr("dy", "1.35em")
  	.attr("dx", ".45em")
  	.attr("text-anchor", "end")
  	.text(String);*/

//rotate x axis text
chart.selectAll("text")
	.attr("transform", function(d,i){ 
		return "translate(" + x(i) + "," + height + ") rotate(90)"; });

//y axis text
chart.selectAll(".yRule")
	.data(y.ticks(10))
  .enter().append("text")
  	.attr("class", "rule")
  	.attr("x", 0)
  	.attr("y", y)
  	.attr("dx", -3)
  	.attr("dy", 3)
  	.attr("text-anchor", "end")
  	.text(String);

//bold bottom line
chart.append("line")
	.attr("x1", 0)
	.attr("x2", width)
	.attr("y1", height)
	.attr("y2", height)
	.style("stroke", "black");
