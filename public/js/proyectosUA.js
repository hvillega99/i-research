const unit = document.getElementById('uaId').textContent;
const total = document.getElementById('num-total-projects');
const currentCount = document.getElementById('num-current-projects');
const finishedCount = document.getElementById('num-finished-projects');
const currentContainer = document.getElementById('current-projects');
const finishedContainer = document.getElementById('finished-projects');

fetch(`/api/projects/ua/${unit}`)
.then(response => response.json())
.then(data => {
    const {current, finished} = data;

    total.innerHTML = `<h5>${current.length + finished.length}</h5>`;
    currentCount.innerHTML = `<h5>${current.length}</h5>`;
    finishedCount.innerHTML = `<h5>${finished.length}</h5>`;

    currentContainer.innerHTML = '';
    for(let i=0; i<current.length; i++){
        
        const project = current[i];
        const areas = '';
        let collaborators = project["colaboradores"].map(item => `${item["nombre"]}/${item["rol"]}`);
        collaborators = collaborators.join(', ');

        let {institucionesEspol, institucionesExterna} = project["instituciones"];
        institucionesEspol = institucionesEspol.map(item => item["unidad"]);
        institucionesEspol = institucionesEspol.join('; ');
        institucionesExterna = institucionesExterna.map(item => item["nombre"]);
        institucionesExterna = institucionesExterna.join('; ');

        const description = `<div class="description" id="cp-${i+1}" data-bs-toggle="modal" data-bs-target="#modal-c-${i+1}">
                                <strong>${project["titulo"].toUpperCase()}</strong><br>
                                ÁREA1, ÁREA2<br>
                                ${project["fechainicio"]} -> ${project["fechafin"]}
                            </div>`;
        
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
                                        <p><strong>Instituciones colaboradoras de ESPOL:</strong> ${institucionesEspol}</p>
                                        <p><strong>Instituciones colaboradoras externas:</strong> ${institucionesExterna.length>0? institucionesExterna:"No hay"}</p>
                                        <p><strong>Áreas de investigación:</strong>  XXXXXX</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        currentContainer.innerHTML+= description + modal;

        if(i<current.length-1){
            currentContainer.innerHTML+='<hr>';
        }
    }

    finishedContainer.innerHTML = '';
    for(let i=0; i<finished.length; i++){
        
        const project = finished[i];
        let collaborators = project["colaboradores"].map(item => `${item["nombre"]}/${item["rol"]}`);
        collaborators = collaborators.join(', ');

        let {institucionesEspol, institucionesExterna} = project["instituciones"];
        institucionesEspol = institucionesEspol.map(item => item["unidad"]);
        institucionesEspol = institucionesEspol.join('; ');
        institucionesExterna = institucionesExterna.map(item => item["nombre"]);
        institucionesExterna = institucionesExterna.join('; ');

        const description = `<div class="description" id="fp-${i+1}" data-bs-toggle="modal" data-bs-target="#modal-f-${i+1}">
                                <strong>${project["titulo"].toUpperCase()}</strong><br>
                                ÁREA1, ÁREA2<br>
                                ${project["fechainicio"]} -> ${project["fechafin"]}
                            </div>`;
        
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
                                        <p><strong>Instituciones colaboradoras externas:</strong> ${institucionesExterna.length>0? institucionesExterna:"No hay"}</p>
                                        <p><strong>Áreas de investigación:</strong>  XXXXXX</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;

        finishedContainer.innerHTML+= description + modal;

        if(i<finished.length-1){
            finishedContainer.innerHTML+='<hr>';
        }
    }


})
.catch(e => {
    console.log(`Algo salió mal. ${e}`);
})