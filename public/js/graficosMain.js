const thecheckD = document.querySelector(".check")
thecheckD.addEventListener("click", idiomaD)
var gf1;
var gf2;
var tjp;

const grafica1 = document.getElementById("grafica-citaciones");
fetch('/api/espol/metricas/citationCount')
.then(response => response.json())
.then(dataset => {
    if(!dataset.error){
        //IDIOMA
        var cit_main_pub = 'Citaciones'
        var cit_main_title = '"Citaciones de las publicaciones de la institución\nde los últimos seis años.\nEstos son siempre los años en los que se publicaron\nlos artículos y no se refieren a los años en los que se\nrecibieron las citas."'
        var text_titlegf1 = 'Citaciones por año'
        if(thecheck.checked){
            cit_main_pub = 'Citations'
            cit_main_title = '"Citations of the institution’s publications for the last six years. These are always years in which the articles were published and do not refer to the years the citations were received."'
            text_titlegf1 = 'Citations per year'
        }

        //FIN DE IDIOMA

        const years = Object.keys(dataset);
        const values = years.map(year => dataset[year]);
        const maxValue = Math.max.apply( Math, values );
        gf1 = new Chart(grafica1, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: cit_main_pub,
                    data: values,
                    backgroundColor: values.map(item => 'rgba(33, 58, 143, 0.2)'),
                    borderColor: values.map(item => 'rgba(34, 50, 101, 1)'),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: maxValue < 20? 1:0
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
    
        const infoCitaciones = document.getElementById('info-citaciones')
        infoCitaciones.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top" 
        data-value="Citaciones de las publicaciones de la institución de los últimos seis años. Estos son siempre los años en los que se publicaron los artículos y no se refieren a los años en los que se recibieron las citas."
        title=${cit_main_title}></img>`;
    
        const title = document.getElementById('title-citaciones');
        title.textContent = text_titlegf1;
    }else{
        console.error('citaciones por año no disponibles');
    }
})

const grafica2 = document.getElementById("grafica-publicaciones");
fetch('/api/espol/metricas/documentCount')
.then(response => response.json())
.then(dataset => {

    if(!dataset.error){
        //IDIOMA
        var main_pub = 'Publicaciones'
        var main_title = '"Cantidad de publicaciones indexadas de la institución\npor cada uno de los últimos seis años."'
        var text_titlegf2 = 'Publicaciones por año'
        if(thecheck.checked){
            main_pub = 'Publications'
            main_title = '"Number of indexed publications of the institution for each of the last six years."'
            text_titlegf2 = 'Publications per year'
        }
        //FIN DE IDIOMA
        const years = Object.keys(dataset);
        const values = years.map(year => dataset[year]);
        const maxValue = Math.max.apply( Math, values );
        gf2 = new Chart(grafica2, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: main_pub,
                    data: values,
                    backgroundColor: values.map(item => 'rgba(33, 58, 143, 0.2)'),
                    borderColor: values.map(item => 'rgba(34, 50, 101, 1)'),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: maxValue < 20? 1:0
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });
    
        const infoPublicaciones = document.getElementById('info-publicaciones');
        infoPublicaciones.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
        data-value="Cantidad de publicaciones indexadas de la institución por cada uno de los últimos seis años."
        title=${main_title}></img>`;
    
        const title = document.getElementById('title-publicaciones');
        title.textContent = text_titlegf2;
    }else{
        console.error('publicaciones por año no disponibles');
    }
})



const tjpContainer = document.getElementById('grafica-tjp');
fetch('api/espol/metricas/topJournalPercentiles')
.then(response => response.json())
.then(data => {
    
    
    if(!data.error){
        //IDIOMA
        var top_percentile = labels_tjp=['Percentil 1','Percentil 5','Percentil 10','Percentil 25']
        var topTitle = '"Cantidad de publicaciones de la institución que se\nencuentran en el 1%, 5%, 10% ó 25% superior de las\nrevistas indexadas más citadas."'
        var text_titleTjp = 'Publicaciones en revistas de alto impacto'
        if(thecheck.checked){
            topTitle = '"The number of publications of the institution that are in the top 1%, 5%, 10%, or 25% of the most cited indexed journals."'
            top_percentile = ['Percentile 1','Percentile 5','Percentile 10','Percentile 25']
            text_titleTjp = 'Publications in high-impact magazines'
        }
        //FIN DE IDIOMA
        
        const years = Object.keys(data[0]["percentageByYear"]);
        const datasets = [];
    
        data.map(item => {
            datasets.push(Object.values(item["valueByYear"]))
        })
    
    
        tjp = new Chart(tjpContainer, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [
                        {
                            label: top_percentile[0],
                            data: datasets[0],
                            backgroundColor: years.map(item => '#CCEDE4'),
                            borderWidth: 1
                        },
    
                        {
                            label: top_percentile[1],
                            data: datasets[1],
                            backgroundColor: years.map(item => '#A6D2E1'),
                            borderWidth: 1
                        },
    
                        {
                            label: top_percentile[2],
                            data: datasets[2],
                            backgroundColor: years.map(item => '#A8A6DB'),
                            borderWidth: 1
                        },
    
                        {
                            label: top_percentile[3],
                            data: datasets[3],
                            backgroundColor: years.map(item => '#D3BAE9'),
                            borderWidth: 1
                        },
                ]
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
    
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                legend: {
                    display: true
                }
            }
    
        })
    
        const infoPublicaciones = document.getElementById('info-tjp');
        infoPublicaciones.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
        data-value="Cantidad de publicaciones de la institución que se encuentran en el 1%, 5%, 10% o 25% superior de las revistas indexadas más citadas."
        title=${topTitle}></img>`;
        
        const titleTjp = document.getElementById('title-tjp');
        titleTjp.textContent = text_titleTjp;
    }else{
        console.error('publicaciones en revistas de alto impacto no disponibles');
    }

})

async function idiomaD(){
    var labels_tjp;
    if(thecheck.checked){
        labels_tjp=['Percentile 1','Percentile 5','Percentile 10','Percentile 25']
        gf1.data.datasets[0].label="Citations"
        gf2.data.datasets[0].label="Publications"
    }
    else{
        labels_tjp=['Percentil 1','Percentil 5','Percentil 10','Percentil 25']
        gf1.data.datasets[0].label="Citaciones"
        gf2.data.datasets[0].label="Publicaciones"
    }

    
    for (var i = 0; i < tjp.data.datasets.length; i++) {
        tjp.data.datasets[i].label = labels_tjp[i]
    }

    tjp.update();
    
    //console.log(tf.data.datasets[0].label);
}