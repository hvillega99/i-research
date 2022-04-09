const id = document.getElementById('uaId').textContent.toLowerCase();

const grafica1 = document.getElementById("grafica-citaciones");
fetch(`/api/bibliometricsByYear/ua/${id}`)
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
        
        const maxValue = Math.max.apply( Math, citations);
        new Chart(grafica1, {
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
                    display: true,
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
    
        const infoCitaciones = document.getElementById('info-citaciones')
        infoCitaciones.innerHTML = `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top" 
        title="Citaciones de las publicaciones de la unidad académica\nde los últimos cinco años.\nEstos son siempre los años en los que se publicaron\nlos artículos y no se refieren a los años en los que se\nrecibieron las citas."></img>`;

        const grafica2 = document.getElementById("grafica-publicaciones");
        const maxValue2 = Math.max.apply( Math, publications);
        new Chart(grafica2, {
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
                    display: true,
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
        const infoPublicaciones = document.getElementById('info-publicaciones')
        infoPublicaciones.innerHTML = `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
        title="Cantidad de publicaciones indexadas de la unidad académica\npor cada uno de los últimos cinco años."></img>`;
    
    }else{
        console.error('información bibliométrica no disponible');
    }
})