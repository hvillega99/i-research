const thecheckD7 = document.querySelector(".check")
thecheckD7.addEventListener("click", idiomaD7)
var citaUaP;
var numUaP;

const id = document.getElementById('uaId').textContent.toLowerCase();

const spinnerPublicaciones = document.querySelector("#spinner-publicaciones");
const spinnerCitas = document.querySelector("#spinner-citas");

const publicaciones = document.querySelector("#total-publications");
const citaciones = document.querySelector("#total-citations");

const graficaPublicaciones = document.getElementById("grafica-publicaciones");
const graficaCitas = document.getElementById("grafica-citaciones");

const loadData = (path) => {

    fetch(path)
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
    
            const totalCitations = citations.reduce((total, item) => total + item, 0);
            const totalPublications = publications.reduce((total, item) => total + item, 0);
    
            citaciones.textContent = totalCitations;
            publicaciones.textContent = totalPublications;
            
            const maxValue = Math.max.apply( Math, citations);

            var cit_graphUA_label = 'Citaciones'
            if(thecheck.checked){
                cit_graphUA_label = 'Citations'
            }

            citaUaP = new Chart(graficaCitas, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [{
                        label: cit_graphUA_label,
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
                        text: 'Citaciones por a??o'
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
    
            const maxValue2 = Math.max.apply( Math, publications);
            var pub_graphUA_label = 'Publicaciones'
            if(thecheck.checked){
                pub_graphUA_label = 'Publications'
            }
            numUaP = new Chart(graficaPublicaciones, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [{
                        label: pub_graphUA_label,
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
                        text: 'Publicaciones por a??o'
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

            //IDIOMA
            var no_aviliable_graUA = 'No disponible'
            if(thecheck.checked){
                no_aviliable_graUA = 'Not available'
            }
            //FIN DE IDIOMA

            console.error('informaci??n bibliom??trica no disponible');
            spinnerCitas = 'No disponible';
            spinnerPublicaciones = 'No disponible';
            citaciones.textContent = `<p data-value="No disponible">${no_aviliable_graUA}</p>`;
            publicaciones.textContent = `<p data-value="No disponible">${no_aviliable_graUA}</p>`;
        }
    })
}


async function idiomaD7(){
    if(thecheck.checked){
        citaUaP.data.datasets[0].label="Citations"
        numUaP.data.datasets[0].label="Publications"
    }
    else{
        citaUaP.data.datasets[0].label="Citaciones"
        numUaP.data.datasets[0].label="Publicaciones"
    }

    
    //console.log(tf.data.datasets[0].label);
}

loadData(`/api/unit/bibliometrics/${id}?instfilter=true`);

const instfilter = document.getElementById('instfilter');

instfilter.onclick = (e) =>{

    citaUaP.destroy();
    numUaP.destroy();

    citaciones.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>`;
    
    publicaciones.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>`

    spinnerPublicaciones.style.display = "block";
    spinnerCitas.style.display = "block";

    loadData(`/api/unit/bibliometrics/${id}?instfilter=${e.target.checked}`)
    
}