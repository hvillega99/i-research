const pieContainer = document.getElementById('grafica-documentos-area');
fetch('/api/publications/areas/inst')
.then(response => response.json())
.then(data => {

    //console.log(data);

    let labels = [];
    let labelsOthers = [];
    let values = [];
    let valuesOthers = [];
    let percents = [];
    let totalOthers = 0;
    let totalPercent = 0;

    data.map(item => {
                if(item['Documents'] <= 130) {
                  labelsOthers.push(`${item['Subject areas']}: ${item['Documents']}`);
                  valuesOthers.push(item['Documents']);
                  totalOthers += parseInt(item['Documents']);
                  p = parseFloat(item["Percent"].toFixed(2));
                  totalPercent += p;
                }
                else{
                  labels.push(item['Subject areas']);
                  values.push(item['Documents']);
                  percents.push(`${item['Percent'].toFixed(2)}%`);
                }
            })
    labelsOthers.push('total');
    labels.push(labelsOthers.join(' - '));
    values.push(totalOthers.toString());
    percents.push(`${totalPercent}%`);

    // console.log(labels);
    // console.log(values);
    // console.log(labelsOthers);
    // console.log(valuesOthers);

var width = 380
var height = 500

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
// var radius = Math.min(width, height) / 2
var radius = 190

// append the svg object to the div
var svg = d3.select(pieContainer)
.append("svg")
// .attr("width", width)
// .attr("height", height)
.attr("viewBox", `-70 60 ${height} ${width}`)
// .attr("preserveAspectRatio", "xMidYMin meet")
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// set the color scale
var color = d3.scaleOrdinal()
.domain(labels)
//.range(['#FFCD78','#C6DDAF','#9ACC91','#72B081','#C5EBCA','#FDDAE3','#F2BAD1','#F2AECB','#DB97C6','#AB91C4'])
.range(['#009ece', '#b93a3f', '#7e9e55', '#9463af', '#d14905', '#88e9d2', '#9c2027', '#d8bf32', '#e18f6f', '#5d181b', '#2d8a20'])

// Compute the position of each group on the pie:
var pie = d3.pie()
.sort(null) // Do not sort group by size
.value(function(d) {return d.value; })
var data_ready = pie(d3.entries(values))

// The arc generator
var arc = d3.arc()
.innerRadius(0)         // This is the size of the donut hole
.outerRadius(radius * 0.8)

//Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
.innerRadius(radius * 0.9)
.outerRadius(radius * 0.9)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
.selectAll('allSlices')
.data(data_ready)
.enter()
.append('path')
.attr('d', arc)
.attr('fill', function(d){ return(color(d.data.key)) })
.attr("stroke", "white")
.style("stroke-width", "2px")
.style("opacity", 0.7)

//Add the polylines between chart and labels:
svg
.selectAll('allPolylines')
.data(data_ready)
.enter()
.append('polyline')
.attr("stroke", function(d){ return(color(d.data.key)) })
.style("fill", "none")
.attr("stroke-width", 2)
.attr('points', function(d) {
  var posA = arc.centroid(d) // line insertion in the slice
  var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
  var posC = outerArc.centroid(d); // Label position = almost the same as posB
  var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
  posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
  return [posA, posB, posC]
})

//Add the polylines between chart and labels:
svg
.selectAll('allLabels')
.data(data_ready)
.enter()
.append('text')
.text( function(d) { /*console.log(d.data.value) ;*/ return percents[d.data.key] } )
.attr('transform', function(d) {
    var pos = outerArc.centroid(d);
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
    return 'translate(' + pos + ')';
})
.style('text-anchor', function(d) {
    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
    return (midangle < Math.PI ? 'start' : 'end')
})

var div = d3.select(pieContainer).append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);

path = d3.selectAll('path').style('fill',function(d,i){return color[i]})
  path.on("mouseover",handlemouseover);
  path.on('mouseout',handlemouseout);

  function handlemouseover() {
    d3.select(this).attr('M',function(d){
      d3.select(this).transition().duration('50').style('opacity','.85')
      div.transition().duration('50').style('opacity', '1')
      div.html(labels[d.data.key] + ": " + d.data.value).style("left", (d3.event.pageX + 10) + "px").style("top", (d3.event.pageY - 15) + "px");
      return d.value
    });
  }

  function handlemouseout() {
    d3.select(this).transition().duration('50').style('opacity','1');
    div.transition().duration('50').style('opacity', '0')
  }     

})

const infoPublicaciones = document.getElementById('info-pie');
    infoPublicaciones.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
    data-value="Cantidad de publicaciones indexadas de la institución por cada área de conocimiento."
    title="Cantidad de publicaciones indexadas de la institución\npor cada área de conocimiento."></img>`;