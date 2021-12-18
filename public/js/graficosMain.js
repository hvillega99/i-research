
const grafica1 = document.getElementById("grafica-citaciones");
fetch('/api/citationsByYearEspol')
.then(response => response.json())
.then(dataset => {
    const years = Object.keys(dataset);
    const values = years.map(year => dataset[year]);
    const maxValue = Math.max.apply( Math, values );
    new Chart(grafica1, {
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
    title="Citaciones de las publicaciones de la institución\nde los últimos seis años.\nEstos son siempre los años en los que se publicaron\nlos artículos y no se refieren a los años en los que se\nrecibieron las citas."></img>`;
})

const grafica2 = document.getElementById("grafica-publicaciones");
fetch('/api/publicationsByYearEspol')
.then(response => response.json())
.then(dataset => {
    const years = Object.keys(dataset);
    const values = years.map(year => dataset[year]);
    const maxValue = Math.max.apply( Math, values );
    new Chart(grafica2, {
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
    title="Cantidad de publicaciones indexadas de la institución\npor cada uno de los últimos seis años."></img>`;
})

const pieContainer = document.getElementById("grafica-documentos-area");
fetch('/api/publications/areas/inst')
.then(response => response.json())
.then(data => {
    const labels = [];
    const values = [];

    data.map(item => {
        labels.push(item['Subject areas']);
        values.push(item['Documents']);
    })

    const pie = new Chart(pieContainer, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#009ece',
                    '#b93a3f',
                    '#7e9e55',
                    '#9463af',
                    '#d14905',
                    '#88e9d2',
                    '#9c2027',
                    '#d8bf32',
                    '#e18f6f',
                    '#5d181b',
                    '#2d8a20',
                    '#EB971B',
                    '#E1E861'
                ]
            }]
        },

        options: {
            responsive: true,
            legend: {
                display:  true,
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    })

    const infoPublicaciones = document.getElementById('info-pie');
    infoPublicaciones.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
    title="Cantidad de publicaciones indexadas de la institución\npor cada área de conocimiento."></img>`;
})

const tjpContainer = document.getElementById('grafica-tjp');
fetch('api/publications/topJournalPercentiles/inst')
.then(response => response.json())
.then(data => {
    

    const years = Object.keys(data[0]["percentageByYear"]);
    const datasets = [];

    data.map(item => {
        datasets.push(Object.values(item["valueByYear"]))
    })


    new Chart(tjpContainer, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                    {
                        label: 'Percentil 1',
                        data: datasets[0],
                        backgroundColor: years.map(item => '#0dcaf0'),
                        borderWidth: 1
                    },

                    {
                        label: 'Percentil 5',
                        data: datasets[1],
                        backgroundColor: years.map(item => '#20c997'),
                        borderWidth: 1
                    },

                    {
                        label: 'Percentil 10',
                        data: datasets[2],
                        backgroundColor: years.map(item => '#198754'),
                        borderWidth: 1
                    },

                    {
                        label: 'Percentil 25',
                        data: datasets[3],
                        backgroundColor: years.map(item => '#ffc107'),
                        borderWidth: 1
                    },
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            },
            legend: {
                display: true
            }
        }

    })

    const infoPublicaciones = document.getElementById('info-tjp');
    infoPublicaciones.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
    title="Cantidad de publicaciones de la institución que se\nencuentran en el 1%, 5%, 10% ó 25% superior de las\nrevistas indexadas más citadas."></img>`;
})