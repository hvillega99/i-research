const thecheckD6 = document.querySelector(".check")
thecheckD6.addEventListener("click", idiomaD6)
var citaP;
var numP;

const id = document.getElementById('scopusId').textContent;

const grafica1 = document.getElementById("grafica-citaciones");
fetch(`/api/citationsByYear/${id}`)
.then(response => response.json())
.then(dataset => {

    if(!dataset.error){

        var cit_graph_label = 'Citaciones'
        if(thecheck.checked){
            cit_graph_label = 'Citations'
        }

        const years = Object.keys(dataset[0]);
        const values = years.map(year => dataset[0][year]);
        const maxValue = Math.max.apply( Math, values );
        citaP = new Chart(grafica1, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: cit_graph_label,
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

        var pub_graph_label = 'Publicaciones'
        if(thecheck.checked){
            pub_graph_label = 'Publications'
        }

        const years = Object.keys(dataset[0]);
        const values = years.map(year => dataset[0][year]);
        const maxValue = Math.max.apply( Math, values );
        numP = new Chart(grafica2, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: pub_graph_label,
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

async function idiomaD6(){
    if(thecheck.checked){
        citaP.data.datasets[0].label="Citations"
        numP.data.datasets[0].label="Publications"
    }
    else{
        citaP.data.datasets[0].label="Citaciones"
        numP.data.datasets[0].label="Publicaciones"
    }

    
    //console.log(tf.data.datasets[0].label);
}