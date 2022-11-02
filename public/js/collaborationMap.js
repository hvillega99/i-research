const thecheckD8 = document.querySelector(".check")
thecheckD8.addEventListener("click", idiomaD8)
var series;
const manageList = (show, hide, place, country, menu_type, otro_name) => {
    //console.log(ms2);
    //console.log(ms3);
    //console.log(place)
    //console.log(otro_name)

    document.getElementById(show).style.display = 'block';
    document.getElementById(hide).style.display = 'none';

    $($.fn.dataTable.tables(true)).DataTable()
    .columns.adjust();  

    var inst_mess_a = 'Instituciones de'
    var inst_mess_b = 'con publicaciones en conjunto con ESPOL'
    var inst_mess_c = 'Publicaciones en conjunto con'

    var dms1 = inst_mess_a
    var dms2 = inst_mess_b
    var dms3 = inst_mess_c

    if(thecheck.checked){
        inst_mess_a = 'Institutions of'
        inst_mess_b = 'with publications in conjunction with ESPOL'
        inst_mess_c = 'Publications in conjunction with'
    }

    var ms1 = inst_mess_a
    var ms2 = inst_mess_b

    if(menu_type=='i'){
        ms1 = inst_mess_c
        ms2 = ''
        dms1 = dms3
        dms2 = ''
    }

    document.getElementById(`md-${country}-title`).innerHTML = `<h5 style="display:inline" data-value='${dms1}'>${ms1} </h5> <h5 data-name='${otro_name}' style="display:inline">${place}</h5> <h5 style="display:inline" data-value='${dms2}'>${ms2}</h5>` ;
}

const showCountryInfo = async (e, data) => {

    const {pointIndex} = e;
    const country = data[pointIndex];

    if(!country || country.documentCount ==0){
        return;
    }

    var myModal = new bootstrap.Modal(document.getElementById(`md-${country.id}`));
    myModal.show();

    if(document.getElementById(`waiting-${country.id}`)){

    
        const response = await fetch(`/api/espol/colaboracion/documents/${country.id}`);
        const information = await response.json();
    
        const instArr = Object.keys(information);

        const institutions = instArr.map(inst => {
            return {
                name: inst,
                documents: information[inst],
                documentCount: information[inst].length
            }
        });

        institutions.sort((a, b) => b.documentCount - a.documentCount);

        let mdContent = document.querySelector(`#md-${country.id}-content`);
    
        let content = '';

        let publicationTables = '';
    
        institutions.forEach((inst, index)=> {
    
            const publications = inst.documents;
            let contentPublications = '';
    
            publications.forEach((pub, idx) => {

                contentPublications += `<tr class="publication-item item" onclick="handleClick('${pub[3]}', '${country.id}-${index}-${pub[3]}')" data-bs-toggle="modal" data-bs-target="#md${country.id}-${index}-${pub[3]}">
                                            <th scope="row">
                                                ${idx + 1}
                                            </th>
                                            <td>
                                                <p>${pub[0]}</p>
                                            </td>
                                            <td>
                                                <p>${pub[1]}</p>
                                            </td>
                                            <td>
                                                <p>${pub[2]}</p>
                                            </td>
                                            <td>
                                                <p>${pub[4]}</p>
                                            </td>
                                        </tr>
                                        <div class="modal fade" id="md${country.id}-${index}-${pub[3]}" tabindex="-1" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" data-value="Publicación">Publicación</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body" id="content-${country.id}-${index}-${pub[3]}">
                                                        <div class="spinner-border" role="status" id="waiting-${country.id}-${index}-${pub[3]}">
                                                            <span class="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
            });
            
            content += `<tr class="publication-item item" onclick="manageList('table-${country.id}-inst${index}', 'table-${country.id}', '${inst.name.replace("'","’")}', '${country.id}', 'i', '${inst.name.replace("'","’")}')">
                            <th scope="row">${index + 1}</th>
                            <td>
                                <p>${inst.name}</p>
                            </td>
                            <td>
                                <p>${inst.documentCount}</p>
                            </td>
                        </tr>`;
            
            //IDIOMA
            var titulo_th_map = 'Título'
            var citaciones_th_map = 'Citaciones'
            var year_th_map = 'Año de publicación'
            var pub_th_map = 'Publicado en'
            var back_text = 'Volver'
            var nombre_place = country.name
            var ot_nombre_place = country.en_name
        

            if(thecheck.checked){
                titulo_th_map = 'Title'
                citaciones_th_map = 'Citations'
                year_th_map = 'Year of publication'
                pub_th_map = 'Published in'
                back_text = 'Back'
                nombre_place = country.en_name
                ot_nombre_place = country.name
            }
            //FIN DE IDIOMA

            publicationTables += `<div id="table-${country.id}-inst${index}" style="display: none">
                                    
                                    <table id="tablePub_${country.id}_${index}" class="display" style="width:100%">
                                        <thead class="clickable-header">
                                            <tr>
                                                <th scope="col" style="text-align:center">#</th>
                                                <th scope="col" style="text-align:center" data-value="Título">${titulo_th_map}</th>
                                                <th scope="col" style="text-align:center" data-value="Citaciones">${citaciones_th_map}</th>
                                                <th scope="col" style="text-align:center" data-value="Año de publicación">${year_th_map}</th>
                                                <th scope="col" style="text-align:center" data-value="Publicado en">${pub_th_map}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${contentPublications}
                                        </tbody>
                                    </table>

                                    <button data-value="Volver" type="button" class="btn btn-primary btn-sm mb-0" 
                                        aria-label="Cerrar"
                                        onclick="manageList('table-${country.id}', 
                                        'table-${country.id}-inst${index}', 
                                        '${nombre_place}',
                                        '${country.id}',
                                        'c',
                                        '${ot_nombre_place}')"
                                    >
                                        ${back_text}
                                    </button>
                                </div>`;
                
            $(document).ready( function () {
                $(`#tablePub_${country.id}_${index}`).DataTable({
                    paging: false,
                    searching: false,
                    info: false,
                    scrollY: 400,
                    scrollX: true
                });
            } );    

            $('.modal').on('shown.bs.modal', function(e){
                $($.fn.dataTable.tables(true)).DataTable()
                .columns.adjust();
            });

        });

        //IDIOMA
        var  inst_th_map = 'Institución'
        var pub_nth_map = 'Publicaciones'
        
        if(thecheck.checked){
            inst_th_map = 'Institution'
            pub_nth_map = 'Publications'
        }
        //FIN DE IDIOMA
    
        mdContent.innerHTML = `<div id="table-${country.id}">
                                <table id="tableCountry${country.id}" class="display" style="width:100%">
                                    <thead class="clickable-header">
                                        <tr>
                                            <th scope="col" style="text-align:center">#</th>
                                            <th scope="col" style="text-align:center" data-value="Institución">${inst_th_map}</th>
                                            <th scope="col" style="text-align:center" data-value="Publicaciones">${pub_nth_map}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${content}
                                    </tbody>
                                </table>
                            </div>
                            ${publicationTables}`;
        
        $(document).ready( function () {
            $(`#tableCountry${country.id}`).DataTable({
                paging: false,
                searching: false,
                info: false,
                scrollY: 400,
                scrollX: true

            });
        } );

        

       
    }

}

const loadCountryValues = (data, values) => {

    document.querySelector('#container').innerHTML = '';

    values.forEach(item => {
        if(!item.error){
            const id = item.id;
            const country = data.find(e => e.id == id);
            country.documentCount = item.publications;


            //IDIOMA
            var inst_mess_1 = 'Instituciones de'
            var inst_mess_2 = 'con publicaciones en conjunto con ESPOL'
            var nombre_place2 = country.name
            var ot_nombre_place2 = country.en_name
            
            if(thecheck.checked){
                inst_mess_1 = 'Institutions of'
                inst_mess_2 = 'with publications in conjunction with ESPOL'
                nombre_place2 = country.en_name
                ot_nombre_place2 = country.name
            }
            //FIN DE IDIOMA

            document.querySelector('#md-countries')
            .innerHTML += `<div class="modal fade" id="md-${id}" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">

                                        <div  id="md-${id}-title">
                                            <h5 style="display:inline" data-value="Instituciones de">${inst_mess_1} </h5> <h5 data-name=${ot_nombre_place2} style="display:inline">${nombre_place2}</h5> <h5 style="display:inline" data-value="con publicaciones en conjunto con ESPOL">${inst_mess_2}</h5>
                                        </div>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div id="md-${id}-content">
                                                <div class="text-center">
                                                    <div class="spinner-border" role="status" id="waiting-${id}">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
        }else{
            console.log(item);
        }
    })
}


anychart.onDocumentReady(function () {
    anychart.data.loadJsonFile(
        'data/countries.json',
        async function (data) {

        let values = await fetch('/api/espol/colaboracion/documentCount');
        values = await values.json();

        loadCountryValues(data, values);

        var map = anychart.map();

        map
            .title()
            .enabled(false)
            .useHtml(true)
            .padding([10, 0, 10, 0])
            .text(
            'Colaboraciones internacionales de ESPOL<br/>(publicaciones por país)'
            );

        map.listen('click', (e) => showCountryInfo(e, data));

        map.geoData('anychart.maps.world');
        map.interactivity().selectionMode('none');
        map.padding(0);

        var dataSet = anychart.data.set(data);
        var densityData = dataSet.mapAs({ value: 'documentCount' });
        series = map.choropleth(densityData);

        series.labels(false);

        series
            .hovered()
            .fill('#f48fb1')
            .stroke(anychart.color.darken('#f48fb1'));

        series
            .selected()
            .fill('#c2185b')
            .stroke(anychart.color.darken('#c2185b'));
        
        var map_pub_tag = 'Publicacionesc'
        if(thecheck.checked){
            map_pub_tag = 'Publications'
        }
        
        series
            .tooltip()
            .useHtml(true)
            .format(function () {
            return (
                `<span style="color: #d9d9d9">${map_pub_tag}</span>: ` +
                this.getData('documentCount')
            );
            });

        var scale = anychart.scales.ordinalColor([
            { less: 0 },
            { from: 1, to: 25 },
            { from: 25, to: 100 },
            { from: 100, to: 250 },
            { from: 250, to: 1000 },
            { greater: 1000 }
        ]);
        scale.colors([
            '#ffffff',
            '#81d4fa',
            '#4fc3f7',
            '#039be5',
            '#0277bd',
            '#014377',
        ]);

        var colorRange = map.colorRange();
        colorRange.enabled(true).padding([0, 0, 20, 0]);
        colorRange
            .ticks()
            .enabled(true)
            .stroke('3 #ffffff')
            .position('center')
            .length(7);
        colorRange.colorLineSize(5);
        colorRange.marker().size(7);
        colorRange
            .labels()
            .fontSize(11)
            .padding(3, 0, 0, 0)
            .format(function () {
            var range = this.colorRange;
            var name;
            if (isFinite(range.start + range.end)) {
                name = range.start + ' - ' + range.end;
            } else if (isFinite(range.start)) {
                name = 'Más de ' + range.start;
            } else {
                name = '0';
            }
            return name;
            });

        series.colorScale(scale);

        // create zoom controls
        var zoomController = anychart.ui.zoom();
        zoomController.render(map);

        // set container id for the chart
        map.container('container');
        // initiate chart drawing
        map.draw();
        }
    );
});

async function idiomaD8(){

    const countrysToChange = document.querySelectorAll('[data-name]');
    //console.log(countrysToChange)
    for (const countryToChange of countrysToChange) {
        var auxDataName = countryToChange.dataset.name
        var auxText = countryToChange.textContent

        
        //console.log(auxDataName);
        //console.log(auxText)

        countryToChange.dataset.name = auxText
        countryToChange.textContent = auxDataName
       
    }
    //console.log('*****************')
    
    
    if(thecheck.checked){
        series
            .tooltip()
            .useHtml(true)
            .format(function () {
            return (
                '<span style="color: #d9d9d9">Publications</span>: ' +
                this.getData('documentCount')
            );
            });
    }
    else{
        series
            .tooltip()
            .useHtml(true)
            .format(function () {
            return (
                '<span style="color: #d9d9d9">Publicaciones</span>: ' +
                this.getData('documentCount')
            );
            });
    }

    
    
}