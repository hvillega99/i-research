const id = document.getElementById('uaId').textContent.toLowerCase();

const spinnerPublicaciones = document.querySelector("#spinner-publicaciones");
const spinnerCitas = document.querySelector("#spinner-citas");

fetch(`/api/unit/bibliometrics/${id}`)
.then(response => response.json())
.then(dataset => {

    if(!dataset.error){

        const years = [];
        const publications = [];
        const citations = [];

        dataset.forEach(item => {
            years.push(item.year);
            publications.push(item.publications);
            citations.push(item.citations);
        })
        
        const graficaCitas = document.getElementById("grafica-citaciones");
        const maxValue = Math.max.apply( Math, citations);
        new Chart(graficaCitas, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Citaciones',
                    data: citations,
                    backgroundColor: years.map(item => 'rgba(33, 58, 143, 0.2)'),
                    borderColor: years.map(item => 'rgba(34, 50, 101, 1)'),
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

        spinnerCitas.style.display = "none";

        const graficaPublicaciones = document.getElementById("grafica-publicaciones");
        const maxValue2 = Math.max.apply( Math, publications);
        new Chart(graficaPublicaciones, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Publicaciones',
                    data: publications,
                    backgroundColor: years.map(item => 'rgba(33, 58, 143, 0.2)'),
                    borderColor: years.map(item => 'rgba(34, 50, 101, 1)'),
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
                            stepSize: maxValue2 < 20? 1:0
                        }
                    }]
                }
            }
        });

        spinnerPublicaciones.style.display = "none";
        
    }else{
        console.error('información bibliométrica no disponible');
        spinnerCitas = 'No disponible';
        spinnerPublicaciones = 'No disponible';
    }
})