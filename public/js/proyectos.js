const thecheckD5 = document.querySelector(".check")
thecheckD5.addEventListener("click", idiomaD5)
var pPic;

const scopusID = document.querySelector('#scopusId').textContent;

const total = document.getElementById('num-total-projects');
const currentCount = document.getElementById('num-current-projects');
const finishedCount = document.getElementById('num-finished-projects');
const currentContainer = document.getElementById('current-projects');
const finishedContainer = document.getElementById('finished-projects');

fetch(`/api/projects/${scopusID}`)
.then(response => response.json())
.then(data => {

    if(!data.error){

        var label_eje = 'En ejecución'
        var label_fin = 'Finalizados'
        var no_pro_fin = 'No registra proyectos finalizados'
        var no_pro_eje = 'No registra proyectos en ejecución'
        if(thecheck.checked){
            label_eje = 'In progress'
            label_fin = 'Concluded'
            no_pro_fin = 'Does not register finished projects'
            no_pro_eje = 'Does not register projects in execution'
        }
        const {current, finished, countingStartYear, countingEndYear} = data;
    
        total.innerHTML = `<h5>${current.length + finished.length}</h5>`;
        currentCount.innerHTML = `<h5>${current.length}</h5>`;
        finishedCount.innerHTML = `<h5>${finished.length}</h5>`;
    
        currentContainer.innerHTML = '';
    
        if(current.length == 0){
            currentContainer.innerHTML = `<p data-value="No registra proyectos en ejecución">${no_pro_eje}</p>`;
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
                    if(project["colaboradores"][i]["scopusId"] && project["colaboradores"][i]["scopusId"].includes(scopusID)){
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
                                Rol: ${rolautor.toLocaleLowerCase()}<br>
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
                                            <th scope="col" data-value="En ejecución">${label_eje}</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    ${currentTbody}
                                </table>`;
        }
    
    
        finishedContainer.innerHTML = '';
    
        if(finished.length == 0){
            finishedContainer.innerHTML = `<p data-value="No registra proyectos finalizados">${no_pro_fin}</p>`;
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
    
                let rolautor = '';
    
                for(let i=0; i<project["colaboradores"].length; i++){
                    if(project["colaboradores"][i]["scopusId"] && project["colaboradores"][i]["scopusId"].includes(scopusID)){
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
                                <td class="description item" id="fp-${i+1}" data-bs-toggle="modal" data-bs-target="#modal-f-${i+1}">
                                    <strong>${project["titulo"].toUpperCase()}</strong><br>
                                    ${areas}<br>
                                    Rol: ${rolautor.toLocaleLowerCase()}<br>
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
                                                    <th scope="col" data-value="Finalizados">${label_fin}</th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            ${finishedTbody}
                                        </table>`;
    
        }
    
        document.getElementById('divisor').setAttribute('class','division');

        const startYears = Object.keys(countingStartYear);
        const startValues = startYears.map(year => countingStartYear[year]);
        const endYears = Object.keys(countingEndYear);
        const endValues = endYears.map(year => countingEndYear[year]);
        const maxValue = Math.max.apply( Math, [...startValues, ...endValues] );
    
        const graphSP = document.getElementById('projects-by-year');

        pPic = new Chart(graphSP, {
            type: 'bar',
            data: {
                labels: startYears,
                datasets: [{
                    label: 'Proyectos',
                    data: startValues,
                    backgroundColor: startValues.map(item => 'rgba(33, 58, 143, 0.2)'),
                    borderColor: startValues.map(item => 'rgba(34, 50, 101, 1)'),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: maxValue < 20? 1:0,
                            max: maxValue
                        }
                    }]
                },
    
                legend: {
                    display: false
                },
            }
        });


        const graphEP = document.getElementById('projects-by-finish');

        new Chart(graphEP, {
            type: 'bar',
            data: {
                labels: endYears,
                datasets: [{
                    label: 'Proyectos',
                    data: endValues,
                    backgroundColor: endValues.map(item => 'rgba(33, 58, 143, 0.2)'),
                    borderColor: endValues.map(item => 'rgba(34, 50, 101, 1)'),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: maxValue < 20? 1:0,
                            max: maxValue
                        }
                    }]
                },
    
                legend: {
                    display: false
                },
            }
        });

        document.getElementById('f-temp-spinner').innerHTML = '';

        document.getElementById('temp-spinner').innerHTML = '';
        document.getElementById('info').innerHTML = `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
        title="Cantidad de proyectos iniciados por año"></img>`;
    }else{
        //IDIOMA
        var no_aviliable_pro = 'No disponible'
        if(thecheck.checked){
            no_aviliable_pro = 'Not available'
        }
        //FIN DE IDIOMA
       const proyectosView = document.getElementById("proyectos");
       proyectosView.innerHTML=`<p data-value="No disponible" class="text-center">${no_aviliable_pro}</p>`;
    }

})

async function idiomaD5(){
    if(thecheck.checked){
        pPic.data.datasets[0].label="Proyects"
    }
    else{
        pPic.data.datasets[0].label="Proyectos"
    }

    
    //console.log(tf.data.datasets[0].label);
}