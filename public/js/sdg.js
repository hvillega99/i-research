const thecheckD2 = document.querySelector(".check")
thecheckD2.addEventListener("click", idiomaD2)
var sdgP;
var sdgC;


const sgdNames = {
    1: 'Fin de la pobreza',
    2: 'Hambre cero',
    3: 'Salud y bienestar',
    4: 'Educación de calidad',
    5: 'Igualdad de género',	
    6: 'Agua limpia y saneamiento',
    7: 'Energía asequible y no contaminante',
    8: 'Trabajo decente y crecimiento económico',
    9: 'Industria, innovación e infraestructura',
    10: 'Reducción de las desigualdades',
    11: 'Ciudades y comunidades sostenibles',
    12: 'Producción y consumo responsable',
    13: 'Acción por el clima',
    14: 'Vida submarina',
    15: 'Vida de ecosistemas terrestres',
    16: 'Paz, justicia e instituciones sólidas',
}

const sgdNamesEng = {
    1: 'No poverty',
    2: 'Zero hunger',
    3: 'Good health and well-being',
    4: 'Quality Education',
    5: 'Gender equality',	
    6: 'Clean water and sanitation',
    7: 'Affordable and clean energy',
    8: 'Decent work and economic growth',
    9: 'Industry, innovation and infrastructure',
    10: 'Reduced inequality',
    11: 'Sustainable cities and communities',
    12: 'Responsible consumption and production',
    13: 'Climate action',
    14: 'Life below water',
    15: 'Life on land',
    16: 'Peace, justice, and strong institutions',
}

const sdgPanel = document.getElementById('sdg-panel');

const showList = async (sdg) =>{

    const sdgPublications = document.getElementById(`sdg${sdg}-publications`);

    sdgPanel.style.display = 'none';
    sdgPublications.style.display = 'block';

    //IDIOMA
    var title_SDG = 'ODS'
    var no_aviliable_sdg = 'No disponible'
    var sdg_num_name = sgdNames[sdg];
    if(thecheck.checked){
        title_SDG = 'SDG'
        no_aviliable_sdg = 'Not available'
        sdg_num_name = sgdNamesEng[sdg];
    }
    //FIN DE IDIOMA

    document.getElementById(`title-list-${sdg}`).innerHTML = `<div><p style="display:inline" data-value="ODS">${title_SDG}</p> <p style="display:inline"> ${sdg}: </p> <p style="display:inline" data-value="${sgdNames[sdg]}">${sdg_num_name}</p></div>`;

    const listContainer = document.getElementById(`list-container-${sdg}`);

    const response = await fetch(`/api/sdg/publications/${sdg}`);
    const publications = await response.json();

    if(!publications.error) {

        //IDIOMA
        
        var titulo_th_sdg = 'Título'
        var citaciones_th_sdg = 'Citaciones'
        var year_th_sdg = 'Año de publicación'
        var pub_th_sdg = 'Publicado en'
        if(thecheck.checked){
            titulo_th_sdg = 'Title'
            citaciones_th_sdg = 'Citations'
            year_th_sdg = 'Year of publication'
            pub_th_sdg = 'Published in'
        }
        //FIN DE IDIOMA

        const headerTable = `<thead class="clickable-header">
                                    <tr>
                                        <th scope="col" style="text-align:center">#</th>
                                        <th scope="col" style="text-align:center" data-value="Título">${titulo_th_sdg}</th>
                                        <th scope="col" style="text-align:center" data-value="Citaciones">${citaciones_th_sdg}</th>
                                        <th scope="col" style="text-align:center" data-value="Año de publicación">${year_th_sdg}</th>
                                        <th scope="col" style="text-align:center" data-value="Publicado en">${pub_th_sdg}</th>
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
        listContainer.innerHTML = table;

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
        listContainer.innerHTML = `<p data-value="No disponible">${no_aviliable_sdg}</p>`;
        console.error('No se pudo obtener la información correspondiente al ods', sdg);
    }
}

const hideList = (sdg) => {
    const sdgPublications = document.getElementById(`sdg${sdg}-publications`);

    const listContainer = document.getElementById(`list-container-${sdg}`);
    listContainer.innerHTML = '<div class="spinner-border m-5" role="status"><span class="visually-hidden">Loading...</span></div>';

    sdgPanel.style.display = 'block';
    sdgPublications.style.display = 'none';
}

const sdgColors = {
    1: '#e5243b',
    2: '#DDA63A',
    3: '#4C9F38',
    4: '#C5192D',
    5: '#FF3A21',
    6: '#26BDE2',
    7: '#FCC30B',
    8: '#A21942',
    9: '#FD6925',
    10: '#DD1367',
    11: '#FD9D24',
    12: '#BF8B2E',
    13: '#3F7E44',
    14: '#0A97D9',
    15: '#56C02B',
    16: '#00689D',
}

const graficaSDG = document.getElementById("grafica-sdg");
fetch('/api/sdg/bibliometrics')
.then(response => response.json())
.then(arr => {

    const data = arr.filter(item => !item.error);

    if(data.length > 0) {

        const sdgNumbers = data.map(item => item.sdg);
       
        const sdgPublications = data.map(item => item.publications);
        const sdgCitations = data.map(item => item.citations);
    
        const sdgPublicationsGraph = document.getElementById('grafica-sdg')
        
        //IDIOMA
        var sdgLabels = sdgNumbers.map(sdg => `ODS ${sdg}`);
        var label_sdg_publications = 'Publicaciones'
        var label_sdg_citations = 'Citaciones'
        var title_sdg_pub = 'Cantidad de publicaciones de la institución\npor objetivo de desarrollo sostenible.'
        var title_sdg_cit = 'Cantidad de citaciones de la institución\npor objetivo de desarrollo sostenible.'
        var title_sdg_graph = 'Publicaciones por ODS'
        var title_sdg_graph2 = 'Citaciones por ODS'
        if(thecheck.checked){
            sdgLabels = sdgNumbers.map(sdg => `SDG ${sdg}`)
            label_sdg_publications = 'Publications'
            label_sdg_citations = 'Citations'
            title_sdg_pub = 'Number of publications of the institution by sustainable development goal.'
            title_sdg_cit = 'Number of citations of the institution by sustainable development goal.'
            title_sdg_graph = 'Publications per SDG'
            title_sdg_graph2 = 'Citations per SDG'
        }
        //FIN DE IDIOMA

        const maxValue = Math.max.apply( Math, sdgPublications );
        sdgP = new Chart(sdgPublicationsGraph, {
            type: 'bar',
            data: {
                labels: sdgLabels, //Variable IDIOMA
                datasets: [{
                    label: label_sdg_publications, //Variable IDIOMA
                    data: sdgPublications,
                    backgroundColor: sdgNumbers.map(sdg => sdgColors[sdg]),
                    borderColor: sdgNumbers.map(sdg => sdgColors[sdg]),
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
                }
            }
        });
    
        const infoSDGPublications = document.getElementById('info-sdg')
        infoSDGPublications.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top" 
        data-value="Cantidad de publicaciones de la institución por objetivo de desarrollo sostenible."
        title="${title_sdg_pub}"></img>`;
    
        const titleSDGpublications = document.getElementById('title-sdg');
        titleSDGpublications.textContent = title_sdg_graph;


        const sdgCitationsGraph = document.getElementById('grafica-sdg2');

        const maxValue2 = Math.max.apply( Math, sdgCitations );

        sdgC = new Chart(sdgCitationsGraph, {
            type: 'bar',
            data: {
                labels: sdgLabels, //Variable IDIOMA
                datasets: [{
                    label: label_sdg_citations, //Variable IDIOMA
                    data: sdgCitations,
                    backgroundColor: sdgNumbers.map(sdg => sdgColors[sdg]),
                    borderColor: sdgNumbers.map(sdg => sdgColors[sdg]),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            stepSize: maxValue2 < 20? 1:0
                        }
                    }]
                },
                legend: {
                    display: false
                }
            }
        });

        const infoSDGCitations = document.getElementById('info-sdg2');
        infoSDGCitations.innerHTML += `<img src="/img/info.ico" data-toggle="tooltip" data-placement="top"
        data-value="Cantidad de citaciones de la institución por objetivo de desarrollo sostenible."
        title="${title_sdg_cit}"></img>`;

        const titleSDGCitations = document.getElementById('title-sdg2');
        titleSDGCitations.textContent = title_sdg_graph2;




    }else{
        console.error('No se pudo obtener la información bibliométrica de los ODS');
    }
    
})

async function idiomaD2(){
    
    //Esto es temporal
    var labelnum_SDG = 'ODS';
    var theLabelsSDG = [];
    //
    if(thecheck.checked){
        sdgC.data.datasets[0].label="Citations"
        sdgP.data.datasets[0].label="Publications"
        //Esto es temporal
        labelnum_SDG = 'SDG'
        //
    }
    else{
        sdgC.data.datasets[0].label="Citaciones"
        sdgP.data.datasets[0].label="Publicaciones"
    }

    //Esto es temporal
    for(let i = 1; i < 17; i++){
         theLabelsSDG.push(`${labelnum_SDG} ${i}`)
    }
    
    sdgC.data.labels = theLabelsSDG;
    sdgP.data.labels = theLabelsSDG;
    
    sdgC.update();
    sdgP.update();
    //

    change_sdg_pictures();
    
}

function change_sdg_pictures(){
    const sdg_pictures = document.getElementById("sdg-panel");
    var img_source = 'ods'
    var n_img = 'ods'
    var type_img = 'jpg'
    if(thecheck.checked){
        img_source = 'ods_english'
        n_img = 'sdg'
        type_img = 'svg'
    }
    var sdg_content_picture = ''
    for(let i = 1; i < 17; i++){
      sdg_content_picture+= `<img src="/img/${img_source}/${n_img}${i}.${type_img}" class="m-1 sdg-item" 
                                width="120px" height="120px" alt="sdg${i}"
                                onclick=showList("${i}")
                               > ` 
    }
      
    sdg_pictures.innerHTML = ` <div class="d-flex flex-wrap m-4">
              ${sdg_content_picture}
          </div>`
}


change_sdg_pictures();