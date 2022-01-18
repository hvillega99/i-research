const pieContainer = document.getElementById('grafica-documentos-area');
fetch('/api/publications/areas/inst')
.then(response => response.json())
.then(data => {

    console.log(data);

    const labels = [];
    const values = [];

    data.map(item => {
                labels.push(item['Subject areas']);
                values.push(item['Documents']);
            })

    var width = 400
    var height = 300

    var radius = Math.min(width, height) / 2

    var svg = d3.select(pieContainer)
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data

// set the color scale
var color = d3.scaleOrdinal()
  .domain(labels)
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(values))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(0)
    .outerRadius(radius)
  )
  .attr('fill', function(d){ return(color(d.data.key)) })
  .attr("stroke", "black")
  .style("stroke-width", "1px")
  .style("opacity", 0.7)

})

const infoPublicaciones = document.getElementById('info-pie');
    infoPublicaciones.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
    title="Cantidad de publicaciones indexadas de la institución\npor cada área de conocimiento."></img>`;