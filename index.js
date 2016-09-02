/*
	Desenha um gráfico de acordo com o typename passado
 */
function drawRowGraph2(element, typeName, url, pacientid, dataInicio, dataFim, altura, margin) {
	var row = $('<div></div>').attr({
		'id': 'card' + typeName,
		'class': 'card'
	})
	$("#" + element).append(row);

	var collapse = $('<img></img>').attr({
		'id': 'icon' + typeName,
		'class': 'icon2',
		'src': 'arrow_down.png'
	}).width(HEIGHT_LINEAR - 2).height(HEIGHT_LINEAR - 2)

	// Célula de tipo
	var type = $('<div></div>').attr({
		'class': 'type'
	}).click(function () {
		var src = ($('#icon' + typeName).attr('src') === 'arrow_down.png')
			? 'arrow_up.png'
			: 'arrow_down.png'
		$('#icon' + typeName).attr('src', src)
		Gantt_cell2.toggle(400)
	})
	row.append(type)

	var typeName2 = $('<span></span>').attr({ 'id': typeName, 'class': 'infoType' }).text(translate(language, typeName))

	type.append(collapse)
	type.append(typeName2)

	// Célula para apresentar dados
	var Gantt_cell2 = $('<div></div>').attr({
		'id': 'Gantt' + typeName,
		'class': 'Gantt_Graph'
	})

	row.append(Gantt_cell2)

	//$.get(url + 'GetSinaisVitais' + '?Id=' + pacientid + '&DataInicio=' + convertToJSONDate(dataInicio) + '&DataFim=' + convertToJSONDate(adddays(dataFim, 1)), function (data, status) {

	//    var series;
	//    var datasource;
	//    for (obj in data)
	//    {
	//        for (var i = 0; i < data[obj].length; i++) {


	//        }
	//    }
	    
    //})

	//$.get(url + 'GetSinaisVitais2' + '?Id=' + pacientid + '&DataInicio=' + convertToJSONDate(dataInicio) + '&DataFim=' + convertToJSONDate(adddays(dataFim, 1)), function (data) {        

	   
	//})

	new Rickshaw.Graph.Ajax({
	    element: document.getElementById('Gantt' + typeName),
	    renderer: "line",
	    width: days * WIDTH_CELL,
	    height: altura,
        interpolation:"line",
	    padding:
            {
                top:0.02,
                left:0.02,
                right: 0.02,
                bottom:0.02
            },
	    dataURL: url + 'GetSinaisVitais2' + '?Id=' + pacientid + '&DataInicio=' + convertToJSONDate(dataInicio) + '&DataFim=' + convertToJSONDate(adddays(dataFim, 1)),
	    onData: function (d) {
	        for (var i = 0; i < d.length; i++) {
	            for (var j = 0; j < d[i].data.length; j++) {

	                d[i].data[j].x = dateToSeconds( getNewDate(d[i].data[j].x))
	            }
	        }
	        return d
	    },
	    onComplete: function (transport) {

	        var graph = transport.graph;
	        var detail = new Rickshaw.Graph.HoverDetail({ graph: graph });
	        var legend = new Rickshaw.Graph.Legend({ graph: graph });
	        graph.render();
	    },
	});
     

	//drawRickshawGraph('Gantt' + typeName, 120, 0);

	return row
}

/*Draws  Graph with D3 rickshaw*/
function drawRickshawGraph(element, height, margin) {

	var myGraph = new Rickshaw.Graph({
		element: document.getElementById(element),
		width: days * WIDTH_CELL + margin,
		height: height,
		renderer: 'multi',
		series: [
			{
				name: "Series 1",
				color: "steelblue",
				renderer: 'lineplot',
				data: [{ x: 0, y: 10, }, { x: 1, y: 3, }, { x: 2, y: 8, }, { x: 3, y: 15, }, { x: 4, y: 12, },
					{ x: 5, y: 8, }, { x: 6, y: 3, }, { x: 7, y: 5, }, { x: 8, y: 2, }, { x: 9, y: 1, }, { x: 10, y: 4, },
				]
			},
			{
				name: "Series 2",
				color: "green",
				renderer: 'lineplot',
				data: [{ x: 0, y: 5, }, { x: 1, y: 3, }, { x: 2, y: 8, }, { x: 3, y: 6, }, { x: 4, y: 3, },
					{ x: 5, y: 12, }, { x: 6, y: 13, }, { x: 7, y: 14, }, { x: 8, y: 12, }, { x: 9, y: 8, }, { x: 10, y: 9, },
				]
			}]
	});
	myGraph.render();

	return myGraph;
}
