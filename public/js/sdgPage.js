const sdg = document.getElementById('ods-id').textContent.split(' ')[1];
const container = document.getElementById('publicaciones-container');

const total = document.getElementById('num-total-projects');
const currentCount = document.getElementById('num-current-projects');
const currentContainer = document.getElementById('current-projects');
const finishedCount = document.getElementById('num-finished-projects');
const finishedContainer = document.getElementById('finished-projects');
const countAreas = [];

fetch(`/api/espol/ods/documents/${sdg}`)
.then(response => response.json())
.then(publications => {
    if(!publications.error){

        const headerTable = `<thead class="clickable-header">
                                    <tr>
                                        <th scope="col" style="text-align:center">#</th>
                                        <th scope="col" style="text-align:center" data-value="Título">Título</th>
                                        <th scope="col" style="text-align:center" data-value="Citaciones">Citaciones</th>
                                        <th scope="col" style="text-align:center" data-value="Año de publicación">Año de publicación</th>
                                        <th scope="col" style="text-align:center" data-value="Publicado en">Publicado en</th>
                                    </tr>
                            </thead>`;

        let bodyTable = '<tbody>'

        publications.forEach((publication, index) => {
            bodyTable += `<tr class="item" id="${publication[3]}" onclick="handleClick(${publication[3]}, ${publication[3]})" data-bs-toggle="modal" data-bs-target="#modal-${publication[3]}">
                            <th scope="row">${index+1}</th>
                            <td>${publication[0]}</td>
                            <td id="citation-count-${publication[3]}">${publication[1]}</td>
                            <td>${publication[2]}</td>
                            <td>${publication[4]}</td>
                        </tr>
                        <div class="modal fade" id="modal-${publication[3]}" tabindex="-1" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" data-value="Publicación">Publicación</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body" id="content-${publication[3]}">
                                        <div class="spinner-border" role="status" id="waiting-${publication[3]}">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
        })

        bodyTable += '</tbody>'

        const table = `<table id="tableODS${sdg}" class="display" style="width:100%">
                            ${headerTable}
                            ${bodyTable}
                        </table>`;
        container.innerHTML = table;

        $(document).ready( function () {
            $(`#tableODS${sdg}`).DataTable({
                paging: false,
                searching: false,
                info: false,
                scrollY: 400,
                scrollX: true
            });
        } );

        $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function(e){
            $($.fn.dataTable.tables(true)).DataTable()
            .columns.adjust();

        });

    }else{
        container.innerHTML = `<p>
            Publicaciones no disponibles
        </p>`
    }
})

fetch(`/api/espol/ods/proyectos/${sdg}`)
.then(response => response.json())
.then(projects => {
    if(!projects.error){

        const {current, finished, countingStartYear, countingEndYear} = projects;
    
        total.innerHTML = `<h5>${current.length + finished.length}</h5>`;
        currentCount.innerHTML = `<h5>${current.length}</h5>`;
        finishedCount.innerHTML = `<h5>${finished.length}</h5>`;
    
        currentContainer.innerHTML = '';
    
        if(current.length == 0){
            currentContainer.innerHTML = `<p data-value="No registra proyectos en ejecución">No registra proyectos en ejecución</p>`;
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
                            <td class="description item" id="cp-${sdg}-${i+1}" data-bs-toggle="modal" data-bs-target="#modal-c-${sdg}-${i+1}">
                                <strong>${project["titulo"].toUpperCase()}</strong><br>
                                ${areas}<br>
                                ${project["fechainicio"]} -> ${project["fechafin"]}
                            </td>
                        </tr>`;
                
                const modal = `<div class="modal fade" id="modal-c-${sdg}-${i+1}" tabindex="-1" aria-hidden="true">
                                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" data-value="Proyecto">Proyecto</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <p><strong data-value="Título:">Título:</strong> ${project["titulo"].toUpperCase()}</p>
                                                <p><strong data-value="Fecha inicio:">Fecha inicio:</strong> ${project["fechainicio"]}</p>
                                                <p><strong data-value="Fecha fin:">Fecha fin:</strong> ${project["fechafin"]}</p>
                                                <p><strong data-value="Participante/Rol:">Participante/Rol:</strong> ${collaborators}</p>
                                                <p><strong data-value="Instituciones colaboradoras de ESPOL:">Instituciones colaboradoras de ESPOL:</strong> ${institucionesEspol.length>0? institucionesEspol:"No registra"}</p>
                                                <p><strong data-value="Instituciones colaboradoras externas:">Instituciones colaboradoras externas:</strong> ${institucionesExterna.length>0? institucionesExterna:"No registra"}</p>
                                                <p><strong data-value="Áreas de investigación:">Áreas de investigación:</strong> ${areas}</p>
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
                                            <th scope="col" data-value="En ejecución">En ejecución</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    ${currentTbody}
                                </table>`;
        }
    
    
        finishedContainer.innerHTML = '';
    
        if(finished.length == 0){
            finishedContainer.innerHTML = `<p data-value="No registra proyectos finalizados">No registra proyectos finalizados</p>`;
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
                                <td class="description item" id="fp-${sdg}-${i+1}" data-bs-toggle="modal" data-bs-target="#modal-f-${sdg}-${i+1}">
                                    <strong>${project["titulo"].toUpperCase()}</strong><br>
                                    ${areas}<br>
                                    ${project["fechainicio"]} -> ${project["fechafin"]}
                                </td>
                            </tr>`;
                
                const modal = `<div class="modal fade" id="modal-f-${sdg}-${i+1}" tabindex="-1" aria-hidden="true">
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
                                                    <th scope="col" data-value="Finalizados">Finalizados</th>
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

        const stepSize = () => {
            if(maxValue<=5){
                return 1;
            }else if(maxValue<=10){
                return Math.round(maxValue/2);
            }else if(maxValue<=20){
                return Math.round(maxValue/4);
            }else{
                return Math.round(maxValue/3);
            }
        }
    
        const graphSP = document.getElementById('projects-by-year');
    
        uapPic = new Chart(graphSP, {
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
                            stepSize: stepSize(),
                            max: maxValue
                        }
                    }]
                },
    
                legend: {
                    display: false
                },
            }
        });

        document.getElementById('temp-spinner').innerHTML = '';

        const graphEP = document.getElementById('projects-by-finish');
    

        uapfPic = new Chart(graphEP, {
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
                            stepSize: stepSize(),
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
    }else{
        const proyectosView = document.getElementById(`proyectos`);
        proyectosView.innerHTML=`<p data-value="No disponible" class="text-center">No disponible</p>`;
    }
})


