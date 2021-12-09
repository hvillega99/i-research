
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
                backgroundColor: [
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)'
                ],
                borderColor: [
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)'
                ],
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
            }
        }
    });

    const infoCitaciones = document.getElementById('info-citaciones')
    infoCitaciones.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top" 
    title="Citaciones de las publicaciones de la institución\nde los últimos cinco años.\nEstos son siempre los años en los que se publicaron\nlos artículos y no se refieren a los años en los que se\nrecibieron las citas."></img>`;
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
                backgroundColor: [
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)'
                ],
                borderColor: [
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)'
                ],
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
            }
        }
    });

    const infoPublicaciones = document.getElementById('info-publicaciones');
    infoPublicaciones.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
    title="Cantidad de publicaciones indexadas de la institución\npor cada uno de los últimos cinco años."></img>`;
})