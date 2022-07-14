const thecheckD = document.querySelector(".check")
thecheckD.addEventListener("click", idiomaD)
var gf1;
var gf2;
var tjp;

const grafica1 = document.getElementById("grafica-citaciones");
fetch('/api/citationsByYearEspol')
.then(response => response.json())
.then(dataset => {
    if(!dataset.error){
        const years = Object.keys(dataset);
        const values = years.map(year => dataset[year]);
        const maxValue = Math.max.apply( Math, values );
        gf1 = new Chart(grafica1, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Citaciones',
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
        title="Citaciones de las publicaciones de la institución\nde los últimos seis años.\nEstos son siempre los años en los que se publicaron\nlos artículos y no se refieren a los años en los que se\nrecibieron las citas."></img>`;
    
        const title = document.getElementById('title-citaciones');
        title.textContent = 'Citaciones por año';
    }else{
        console.error('citaciones por año no disponibles');
    }
})

const grafica2 = document.getElementById("grafica-publicaciones");
fetch('/api/publicationsByYearEspol')
.then(response => response.json())
.then(dataset => {

    if(!dataset.error){
        const years = Object.keys(dataset);
        const values = years.map(year => dataset[year]);
        const maxValue = Math.max.apply( Math, values );
        gf2 = new Chart(grafica2, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Publicaciones',
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
        title="Cantidad de publicaciones indexadas de la institución\npor cada uno de los últimos seis años."></img>`;
    
        const title = document.getElementById('title-publicaciones');
        title.textContent = 'Publicaciones por año';
    }else{
        console.error('publicaciones por año no disponibles');
    }
})



// const pieContainer = document.getElementById("grafica-documentos-area");
// fetch('/api/publications/areas/inst')
// .then(response => response.json())
// .then(data => {
//     const labels = [];
//     const values = [];

//     data.map(item => {
//         labels.push(item['Subject areas']);
//         values.push(item['Documents']);
//     })

//     const pie = new Chart(pieContainer, {
//         type: "pie",
//         data: {
//             labels: labels,
//             datasets: [{
//                 data: values,
//                 backgroundColor: [
//                     '#FFCD78',
//                     '#FCECC0',
//                     '#FFFAEE',
//                     '#C6DDAF',
//                     '#9ACC91',
//                     '#72B081',
//                     '#C5EBCA',
//                     '#FCF9F2',
//                     '#FDDAE3',
//                     '#F2BAD1',
//                     '#F2AECB',
//                     '#DB97C6',
//                     '#AB91C4'
//                 ]
//             }]
//         },

//         options: {
//             responsive: true,
//             legend: {
//                 display:  false,
//             },
//             animation: {
//                 animateScale: true,
//                 animateRotate: true
//             }
//         }
//     })

//     const infoPublicaciones = document.getElementById('info-pie');
//     infoPublicaciones.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
//     title="Cantidad de publicaciones indexadas de la institución\npor cada área de conocimiento."></img>`;
// })

const tjpContainer = document.getElementById('grafica-tjp');
fetch('api/publications/topJournalPercentiles/inst')
.then(response => response.json())
.then(data => {
    
    if(!data.error){
        
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
                            label: 'Percentil 1',
                            data: datasets[0],
                            backgroundColor: years.map(item => '#CCEDE4'),
                            borderWidth: 1
                        },
    
                        {
                            label: 'Percentil 5',
                            data: datasets[1],
                            backgroundColor: years.map(item => '#A6D2E1'),
                            borderWidth: 1
                        },
    
                        {
                            label: 'Percentil 10',
                            data: datasets[2],
                            backgroundColor: years.map(item => '#A8A6DB'),
                            borderWidth: 1
                        },
    
                        {
                            label: 'Percentil 25',
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
        title="Cantidad de publicaciones de la institución que se\nencuentran en el 1%, 5%, 10% ó 25% superior de las\nrevistas indexadas más citadas."></img>`;
        
        const titleTjp = document.getElementById('title-tjp');
        titleTjp.textContent = 'Publicaciones en revistas de alto impacto';
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
    
    //console.log(tf.data.datasets[0].label);
}