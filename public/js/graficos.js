const id = document.getElementById('scopusId').textContent;

const grafica1 = document.getElementById("grafica-citaciones");
fetch(`/api/citationsByYear/${id}`)
.then(response => response.json())
.then(dataset => {
    const years = ['2016','2017','2018','2019', '2020', '2021'];
    const values = years.map(year => dataset[year]);
    const maxValue = Math.max.apply( Math, values );
    new Chart(grafica1, {
        type: 'line',
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
})

const grafica2 = document.getElementById("grafica-publicaciones");
fetch(`/api/publicationsByYear/${id}`)
.then(response => response.json())
.then(dataset => {
    const years = ['2016','2017','2018','2019', '2020', '2021'];
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
})