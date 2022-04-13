const id = document.getElementById('scopusId').textContent;

const grafica1 = document.getElementById("grafica-citaciones");
fetch(`/api/citationsByYear/${id}`)
.then(response => response.json())
.then(dataset => {

    if(!dataset.error){

        const years = Object.keys(dataset[0]);
        const values = years.map(year => dataset[0][year]);
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
                responsive: true,
                legend: {
                    display:  false,
                },
                title: {
                    display: false,
                    text: 'Citaciones por año'
                },
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
    
    }else{
        console.error('citaciones por año no disponibles');
    }
})

const grafica2 = document.getElementById("grafica-publicaciones");
fetch(`/api/publicationsByYear/${id}`)
.then(response => response.json())
.then(dataset => {

    if(!dataset.error){
        const years = Object.keys(dataset[0]);
        const values = years.map(year => dataset[0][year]);
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
                responsive: true,
                legend: {
                    display:  false,
                },
                title: {
                    display: false,
                    text: 'Publicaciones por año'
                },
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
    
    }else{
        console.error('publicaciones por año no disponibles');
    }

})