const thecheckD4 = document.querySelector(".check")
thecheckD4.addEventListener("click", idiomaD4)
var uapPic;

const uaId = document.getElementById('uaId').textContent;

const total = document.getElementById('num-total-projects');

const currentCount = document.getElementById('num-current-projects');
const currentContainer = document.getElementById('current-projects');

const finishedCount = document.getElementById('num-finished-projects');
const finishedContainer = document.getElementById('finished-projects');

const countAreas = [];

//{area: '', count: 0}

fetch(`/api/unit/projects/${uaId}`)
.then(response => response.json())
.then(data => {

    if(!data.error){

        var label_ejeUA = 'En ejecución'
        var label_finUA = 'Finalizados'
        var no_pro_finUA = 'No registra proyectos finalizados'
        var no_pro_ejeUA = 'No registra proyectos en ejecución'
        if(thecheck.checked){
            label_ejeUA = 'In progress'
            label_finUA = 'Concluded'
            no_pro_finUA = 'Does not register finished projects'
            no_pro_ejeUA = 'Does not register projects in execution'
        }

        const {current, finished, counting} = data;
    
        total.innerHTML = `<h5>${current.length + finished.length}</h5>`;
        currentCount.innerHTML = `<h5>${current.length}</h5>`;
        finishedCount.innerHTML = `<h5>${finished.length}</h5>`;
    
        currentContainer.innerHTML = '';
    
        if(current.length == 0){
            currentContainer.innerHTML = `<p data-value="No registra proyectos en ejecución">${no_pro_ejeUA}</p>`;
        }else{
            let currentTbody = '<tbody>';
        
            for(let i=0; i<current.length; i++){
                
                const project = current[i];
                
                let areas = project["areasCon"]["objSegunFrascati"];

                if(areas.length>0){

                    //areas = Object.values(areas[0]).join(', ');

                    areas = areas[0]["subAreaConocimiento"];

                    const result = countAreas.find(x => x.area == areas);
                    if(result){
                        result.count++;
                    }else{
                        countAreas.push({area: areas, count: 1});
                    }

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
                            <td class="description item" id="cp-${i+1}" data-bs-toggle="modal" data-bs-target="#modal-c-${i+1}">
                                <strong>${project["titulo"].toUpperCase()}</strong><br>
                                ${areas}<br>
                                ${project["fechainicio"]} -> ${project["fechafin"]}
                            </td>
                        </tr>`;
                
                const modal = `<div class="modal fade" id="modal-c-${i+1}" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
        
                currentTbody += item + modal;
            }
        
            currentTbody += '</tbody>';
            currentContainer.innerHTML = `<table class="table fixed_header">
                                    <thead>
                                        <tr>
                                            <th scope="col" data-value="En ejecución">${label_ejeUA}</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    ${currentTbody}
                                </table>`;
        }
    
    
        finishedContainer.innerHTML = '';
    
        if(finished.length == 0){
            finishedContainer.innerHTML = `<p data-value="No registra proyectos finalizados">${no_pro_finUA}</p>`;
        }else{
    
            let finishedTbody = '<tbody>';
            for(let i=0; i<finished.length; i++){
                
                const project = finished[i];
    
                let areas = project["areasCon"]["objSegunFrascati"];
    
                if(areas.length>0){
                    //areas = Object.values(areas[0]).join(', ');

                    areas = areas[0]["subAreaConocimiento"];

                    const result = countAreas.find(x => x.area == areas);
                    if(result){
                        result.count++;
                    }else{
                        countAreas.push({area: areas, count: 1});
                    }
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
                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
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
                                                    <th scope="col" data-value="Finalizados">${label_finUA}</th>
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
        uapPic = new Chart(graph, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Proyectos',
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

        countAreas.sort((a,b) => b.count - a.count);
        const listAreas = countAreas.map(e => e.area);

        const divAreas = document.querySelector('#areas');

        listAreas.slice(0, 4).forEach(area => {
            divAreas.innerHTML += `<p class="badge rounded-pill bg-secondary mx-1">${area}</p>`;
        });
        
        
    }else{
        //IDIOMA
        var no_aviliable_proUA = 'No disponible'
        if(thecheck.checked){
            no_aviliable_proUA = 'Not available'
        }
        //FIN DE IDIOMA

        const proyectosView = document.getElementById("proyectos");
        proyectosView.innerHTML=`<p data-value="No disponible" class="text-center">${no_aviliable_proUA}</p>`;
        document.querySelector('#areas').innerHTML = `<p data-value="No disponible">${no_aviliable_proUA}</p>`;
    }

})

async function idiomaD4(){
    if(thecheck.checked){
       uapPic.data.datasets[0].label="Proyects"
    }
    else{
        uapPic.data.datasets[0].label="Proyectos"
    }

    
    //console.log(tf.data.datasets[0].label);
}