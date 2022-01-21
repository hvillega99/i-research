let [fname, lastname] = document.getElementById('name').textContent.split(', ');

if(fname.includes('-')){
    fname = fname.replace('-', ' ');
}

if(lastname.includes('-')){
    lastname = lastname.replace('-', ' ');
}

if(lastname.includes('.')){
    lastname = lastname.split('.')[0];
}

const author = `${fname}-${lastname}`;


const total = document.getElementById('num-total-projects');
const currentCount = document.getElementById('num-current-projects');
const finishedCount = document.getElementById('num-finished-projects');
const currentContainer = document.getElementById('current-projects');
const finishedContainer = document.getElementById('finished-projects');

fetch(`/api/projects/${author}`)
.then(response => response.json())
.then(data => {
    const {current, finished, counting} = data;

    total.innerHTML = `<h5>${current.length + finished.length}</h5>`;
    currentCount.innerHTML = `<h5>${current.length}</h5>`;
    finishedCount.innerHTML = `<h5>${finished.length}</h5>`;

    currentContainer.innerHTML = '';

    if(current.length == 0){
        currentContainer.innerHTML = 'No registra proyectos en ejecución';
    }else{
        let currentTbody = '<tbody>';
    
        for(let i=0; i<current.length; i++){
            
            const project = current[i];
            let areas = project["areasCon"]["objSegunFrascati"];

            if(areas.length>0){
                areas = Object.values(areas[0]).join(', ');
            }else{
                areas = '';
            }

            // let rolautor = project["colaboradores"].map(item => `${item["nombre"].includes(fname.toUpperCase(), lastname.toUpperCase())}`)
            let rolautor = '';

            for(let i=0; i<project["colaboradores"].length; i++){
                if(project["colaboradores"][i]["nombre"].includes(fname.toUpperCase()) && project["colaboradores"][i]["nombre"].includes(lastname.toUpperCase())){
                    rolautor = project["colaboradores"][i]["rol"];
                }
            }

            let collaborators = project["colaboradores"].map(item => `${item["nombre"]}/${item["rol"]}`);
            collaborators = collaborators.join(', ');
    
            let {institucionesEspol, institucionesExterna} = project["instituciones"];
            institucionesEspol = institucionesEspol.map(item => item["unidad"]);
            institucionesEspol = institucionesEspol.join('; ');
            institucionesExterna = institucionesExterna.map(item => item["nombre"]);
            institucionesExterna = institucionesExterna.join('; ');
    
            const item = `<tr>
                        <td class="description item" id="cp-${i+1}" data-bs-toggle="modal" data-bs-target="#modal-c-${i+1}">
                            <strong>${project["titulo"].toUpperCase()}</strong><br>
                            ${areas}<br>
                            Rol: ${rolautor}<br>
                            ${project["fechainicio"]} -> ${project["fechafin"]}

                        </td>
                    </tr>`;
            
            const modal = `<div class="modal fade" id="modal-c-${i+1}" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Proyecto</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p><strong>Título:</strong> ${project["titulo"].toUpperCase()}</p>
                                            <p><strong>Fecha inicio:</strong> ${project["fechainicio"]}</p>
                                            <p><strong>Fecha fin:</strong> ${project["fechafin"]}</p>
                                            <p><strong>Participante/Rol:</strong> ${collaborators}</p>
                                            <p><strong>Instituciones colaboradoras de ESPOL:</strong> ${institucionesEspol.length>0? institucionesEspol:"No registra"}</p>
                                            <p><strong>Instituciones colaboradoras externas:</strong> ${institucionesExterna.length>0? institucionesExterna:"No registra"}</p>
                                            <p><strong>Áreas de investigación:</strong> ${areas}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
    
            currentTbody += item + modal;
        }
    
        currentTbody += '</tbody>';
        currentContainer.innerHTML = `<table class="table fixed_header">
                                <thead>
                                    <tr>
                                        <th scope="col">En ejecución</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                ${currentTbody}
                            </table>`;
    }


    finishedContainer.innerHTML = '';

    if(finished.length == 0){
        finishedContainer.innerHTML = 'No registra proyectos finalizados';
    }else{

        let finishedTbody = '<tbody>';
        for(let i=0; i<finished.length; i++){
            
            const project = finished[i];

            let areas = project["areasCon"]["objSegunFrascati"];

            if(areas.length>0){
                areas = Object.values(areas[0]).join(', ');
            }else{
                areas = '';
            }

            let collaborators = project["colaboradores"].map(item => `${item["nombre"]}/${item["rol"]}`);
            collaborators = collaborators.join(', ');
    
            let {institucionesEspol, institucionesExterna} = project["instituciones"];
            institucionesEspol = institucionesEspol.map(item => item["unidad"]);
            institucionesEspol = institucionesEspol.join('; ');
            institucionesExterna = institucionesExterna.map(item => item["nombre"]);
            institucionesExterna = institucionesExterna.join('; ');
    
            const item = `<tr>
                            <td class="description item" id="fp-${i+1}" data-bs-toggle="modal" data-bs-target="#modal-f-${i+1}">
                                <strong>${project["titulo"].toUpperCase()}</strong><br>
                                ${areas}<br>
                                ${project["fechainicio"]} -> ${project["fechafin"]}
                            </td>
                        </tr>`;
            
            const modal = `<div class="modal fade" id="modal-f-${i+1}" tabindex="-1" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Proyecto</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p><strong>Título:</strong> ${project["titulo"].toUpperCase()}</p>
                                            <p><strong>Fecha inicio:</strong> ${project["fechainicio"]}</p>
                                            <p><strong>Fecha fin:</strong> ${project["fechafin"]}</p>
                                            <p><strong>Participante/Rol:</strong> ${collaborators}</p>
                                            <p><strong>Instituciones colaboradoras de ESPOL:</strong> ${institucionesEspol}</p>
                                            <p><strong>Instituciones colaboradoras externas:</strong> ${institucionesExterna.length>0? institucionesExterna:"No registra"}</p>
                                            <p><strong>Áreas de investigación:</strong>  ${areas}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
    
            finishedTbody += item + modal;
        }

        finishedTbody += '</tbody>';
        finishedContainer.innerHTML = `<table class="table fixed_header">
                                        <thead>
                                            <tr>
                                                <th scope="col">Finalizados</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        ${finishedTbody}
                                    </table>`;

    }

    document.getElementById('divisor').setAttribute('class','division');

    const graph = document.getElementById('projects-by-year');

    const years = Object.keys(counting);
    const values = years.map(year => counting[year]);
    const maxValue = Math.max.apply( Math, values );
    new Chart(graph, {
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
            },
        }
    });
    document.getElementById('temp-spinner').innerHTML = '';
    document.getElementById('info').innerHTML = `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
    title="Cantidad de proyectos iniciados por año"></img>`;

})
.catch(e => {
    console.log(`Algo salió mal. ${e}`);
})