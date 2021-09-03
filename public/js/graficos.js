const grafica1 = document.getElementById("grafica-citaciones");
fetch('/data/citaciones.json')
.then(response => response.json())
.then(dataset => {
    const years = ['2016','2017','2018','2019', '2020', '2021'];
    const values = years.map(year => dataset[year]);
    const chart1 = new Chart(grafica1, {
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
                        beginAtZero: true
                    }
                }]
            }
        }
    });
})

const grafica2 = document.getElementById("grafica-publicaciones");
fetch('/data/publicaciones.json')
.then(response => response.json())
.then(dataset => {
    const years = ['2016','2017','2018','2019', '2020', '2021'];
    const values = years.map(year => dataset[year]);
    const chart2 = new Chart(grafica2, {
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
                        beginAtZero: true
                    }
                }]
            }
        }
    });
})