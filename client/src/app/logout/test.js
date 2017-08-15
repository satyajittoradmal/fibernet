var jsonData;
var formattedData = [];
var hoverLine;
var hoverLineGroup;
$(document).ready(function () {
	jsonData = {
		"records": [
			{
				"kind": "clinical_notes",
				"date": "2017-05-13T12:44:38",
				"authorID": "111",
				"authorName": "Dr. John Smith",
				"uid": "1",
				"content": "<ul>Clinical Notes 1<br></ul>"
			},
			{
				"kind": "nursing_notes",
				"date": "2017-04-12T11:07:00",
				"authorID": "222",
				"authorName": "Ns. Maggie",
				"uid": "2",
				"content": "<ul>Nursing Notes 1<br></ul>"
			},
			{
				"kind": "nursing_notes",
				"date": "2017-04-12T10:37:00",
				"authorID": "222",
				"authorName": "Ns. Maggie",
				"uid": "3",
				"content": "<ul>Nursing Notes 2<br></ul>"
			},
			{
				"kind": "clinical_notes",
				"date": "2017-04-10T17:21:42",
				"authorID": "111",
				"authorName": "Dr. John Smith",
				"uid": "4",
				"content": "<ul>Clinical Notes 2<br></ul>"
			},
			{
				"kind": "nursing_notes",
				"date": "2017-04-08T15:19:11",
				"authorID": "222",
				"authorName": "Ns. Maggie",
				"uid": "5",
				"content": "<ul>Nursing Notes 3<br></ul>"
			},
			{
				"kind": "clinical_notes",
				"date": "2017-04-05T10:33:33",
				"authorID": "111",
				"authorName": "Dr. John Smith",
				"uid": "6",
				"content": "<ul>Clinical Notes 3<br></ul>"
			},
			{
				"kind": "nursing_notes",
				"date": "2017-04-05T09:20:00",
				"authorID": "222",
				"authorName": "Ns. Maggie",
				"uid": "7",
				"content": "<ul>Nursing Notes 4<br></ul>"
			},
			{
				"kind": "clinical_notes",
				"date": "2017-04-02T13:21:44",
				"authorID": "111",
				"authorName": "Dr. John Smith",
				"uid": "8",
				"content": "<ul>Clinical Notes 4<br></ul>"
			},
			{
				"kind": "clinical_notes",
				"date": "2017-04-01T09:33:01",
				"authorID": "111",
				"authorName": "Dr. John Smith",
				"uid": "9",
				"content": "<ul>Clinical Notes 5<br></ul>"
			},
			{
				"kind": "nursing_notes",
				"date": "2017-04-01T09:10:34",
				"authorID": "222",
				"authorName": "Ns. Maggie",
				"uid": "10",
				"content": "<ul>Nursing Notes 5<br></ul>"
			},
			{
				"kind": "clinical_notes",
				"date": "2017-03-30T11:12:11",
				"authorID": "111",
				"authorName": "Dr. John Smith",
				"uid": "11",
				"content": "<ul>Clinical Notes 6<br></ul>"
			},
			{
				"kind": "nursing_notes",
				"date": "2017-03-28T14:56:05",
				"authorID": "222",
				"authorName": "Ns. Maggie",
				"uid": "12",
				"content": "<ul>Nursing Notes 6<br></ul>"
			},
			{
				"kind": "clinical_notes",
				"date": "2017-03-20T17:46:02",
				"authorID": "111",
				"authorName": "Dr. John Smith",
				"uid": "13",
				"content": "<ul>Clinical Notes 7<br></ul>"
			},
			{
				"kind": "clinical_notes",
				"date": "2017-03-18T21:57:22",
				"authorID": "111",
				"authorName": "Dr. John Smith",
				"uid": "14",
				"content": "<ul>Clinical Notes 8<br></ul>"
			},
			{
				"kind": "nursing_notes",
				"date": "2017-03-18T18:45:52",
				"authorID": "222",
				"authorName": "Ns. Maggie",
				"uid": "15",
				"content": "<ul>Nursing Notes 7<br></ul>"
			},
			{
				"kind": "clinical_notes",
				"date": "2017-03-18T13:00:08",
				"authorID": "111",
				"authorName": "Dr. John Smith",
				"uid": "16",
				"content": "<ul>Clinical Notes 9<br></ul>"
			}
		]
	}
	data = jsonData.records;
	parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;
	parseDate1 = d3.time.format("%Y-%m-%d").parse;

	loadLineChart();

	$("input[type=checkbox]").change(function () {
		//$("#histoGraph").empty();
		updateData();
	});
	svg.on('click', function () {
		//var xPosition = x.invert(d3.mouse(this)[0]);
		var mouse_x = d3.mouse(this)[0];
		console.log("mouse_x==" + mouse_x);
		hoverLine.attr("x1", mouse_x).attr("x2", mouse_x);
		hoverLine.attr("y1", 0).attr("y2", height);
		hoverLineGroup.style("opacity", 1);
	});



});

function loadLineChart() {
	//get formatted data depending on checkbox selection.
	formattedData = []
	if (document.getElementById('clinicalNotes').checked || document.getElementById('nursingNotes').checked) {
		formattedData = getFormattedData();
	}

	var margin = { top: 30, right: 20, bottom: 30, left: 50 };
	width = 900 - margin.left - margin.right;
	height = 270 - margin.top - margin.bottom;

	x = d3.time.scale().range([width, 0]);
	y = d3.scale.linear().range([height, 0]);

	xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks(7);
	xAxis.tickFormat(d3.time.format('%Y-%m-%d'))

	yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(5);

	//create SVG.    
	svg = d3.select("body")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	valueline = d3.svg.line()
		.interpolate("basis")
		.x(function (d) { return x(d.date); })
		.y(function (d) { return y(d.noNotes); });

	// define the area
	area = d3.svg.area()
		.interpolate("basis")
		.x(function (d) { return x(d.date); })
		.y0(height)
		.y1(function (d) { return y(d.noNotes); });


	svg.append("rect")
		.attr("class", "overlay")
		.attr("width", width)
		.attr("height", height)

	// Hover line. 
	hoverLineGroup = svg.append("g")
		.attr("class", "hover-line");

	hoverLine = hoverLineGroup
		.append("line")
		.attr("x1", 10).attr("x2", 10)
		.attr("y1", 0).attr("y2", height).on('mouseover',function(){
			alert('on mouse event');
		});

	// Hide hover line by default.
	hoverLineGroup.style("opacity", 1e-6);



	// Scale the range of the data
	x.domain(d3.extent(formattedData, function (d) { return d.date; }));
	y.domain([0, d3.max(formattedData, function (d) { return d.noNotes; })]);

	svg.append("path")
		.datum(formattedData)
		.attr("class", "area")
		.attr("d", area);

	svg.append("path").attr("class", "line")      // Add the valueline path.
		.attr("d", valueline(formattedData));

	svg.append("g")         // Add the X Axis
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")         // Add the Y Axis
		.attr("class", "y axis")
		.call(yAxis);

	var brush = d3.svg.brush().x(x);
	brush.extent([[100], [100]]).on("brush", function () {
		// alert("brush function");
		extent = brush.extent();
		console.log(extent);
		endg
			.data(extent)
			.attr("transform", function (d, i) {
				console.log("in brush");
				console.log(d);
				return "translate(" + x(d) + "," + 0 + ")";
			});
	});

	/*var focus = svg.append("g");
	focus.append("path")
			.attr("class", "area")
			.style({"fill": "#ccc"})
			.datum(formattedData)
			.attr("d", area);
	
	focus.append("path")
			.attr("class", "line")
			.style({
				"fill": "none",
				"stroke": "#000",
				"stroke-width": "2"
			})
			.datum(formattedData)
			.attr("d", valueline);
	
	focus.append("g")
			.attr("class","x brush")
			.call(brush)
			.selectAll("rect")
			.attr("height", height)
			.style({
				"fill": "#69f",
				"fill-opacity": "0.3"	
	
			});*/
	svg
		.append("g")
		//.attr("class", "x brush")
		.call(brush)
		.selectAll("rect")
		.attr("height", height)
		.style({
			"fill": "#69f",
			"fill-opacity": "0.3"

		});


	var extent = brush.extent();

	var endg = svg
		.selectAll(".end")
		.data(extent)
		.enter()
		.append("g")
		.attr("class", function (d, i) { return "end " + "e" + i; })
		.attr("transform", function (d, i) {
			console.log("in before brush");
			console.log(d);
			return "translate(" + x(d[0]) + "," + 0 + ")";
		})
		;

	endg
		.append("line")
		.attr("width", 10)
		;
}

function getFormattedData() {
	// var groups = jsonData['records'].map(function(value, index) {
	groups = jsonData['records'].filter(function (obj) {
		var kind = obj.kind;
		if (kind == 'clinical_notes' && document.getElementById('clinicalNotes').checked) {
			return true;
		}
		if (kind == 'nursing_notes' && document.getElementById('nursingNotes').checked) {
			return true;
		}
		return false;

	}).map(function (value, index) {
		var dateStr = value['date'];
		var dt = parseDate(dateStr);
		console.log(dt);
		var formattedDateStr = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
		console.log(formattedDateStr);
		return formattedDateStr;
	});

	group_count = {};
	groups.forEach(function (value, index) {
		if (value in group_count) {
			group_count[value] += 1;
		} else {
			group_count[value] = 1;
		}
	});


	formattedData = [];
	for (var key in group_count) {
		formattedData.push({
			"date": key,
			"noNotes": group_count[key]
		});
	}

	// Get the data
	formattedData.forEach(function (d) {
		d.date = parseDate1(d.date);
		d.noNotes = +d.noNotes;
	});
	return formattedData;
}


function updateData() {
	formattedData = []
	if (document.getElementById('clinicalNotes').checked || document.getElementById('nursingNotes').checked) {
		formattedData = getFormattedData();
	}

	x.domain(d3.extent(formattedData, function (d) { return d.date; }));
	y.domain([0, d3.max(formattedData, function (d) { return d.noNotes; })]);
	var svg = d3.select("body").transition();

	svg.select(".area")
		.attr("d", area(formattedData));
	// Make the changes
	svg.select(".line")   // change the line
		.attr("d", valueline(formattedData));
	svg.select(".x.axis") // change the x axis
		.call(xAxis);
	svg.select(".y.axis") // change the y axis
		.call(yAxis);

}