const manageList = (show, hide, title, country) => {
    document.getElementById(show).style.display = 'block';
    document.getElementById(hide).style.display = 'none';
    document.getElementById(`md-${country}-title`).textContent = title;
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

    
        const response = await fetch(`/api/espol/collaboration/documents/${country.id}`);
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
                                                        <h5 class="modal-title">Publicación</h5>
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
            
            content += `<tr class="publication-item item" onclick="manageList('table-${country.id}-inst${index}', 'table-${country.id}', 'Publicaciones en conjunto con ${inst.name.replace("'","’")}', '${country.id}')">
                            <th scope="row">${index + 1}</th>
                            <td>
                                <p>${inst.name}</p>
                            </td>
                            <td>
                                <p>${inst.documentCount}</p>
                            </td>
                        </tr>`;

            publicationTables += `<div id="table-${country.id}-inst${index}" style="display: none">
                                    
                                    <table id="tablePub${country.id}" class="table">
                                        <thead class="clickable-header">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Título</th>
                                                <th scope="col">Citaciones</th>
                                                <th scope="col">Año de publicación</th>
                                                <th scope="col">Publicado en</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${contentPublications}
                                        </tbody>
                                    </table>

                                    <button type="button" class="btn btn-primary btn-sm mb-0" 
                                        aria-label="Cerrar"
                                        onclick="manageList('table-${country.id}', 
                                        'table-${country.id}-inst${index}', 
                                        'Instituciones de ${country.name} con publicaciones en conjunto con ESPOL', 
                                        '${country.id}')"
                                    >
                                        Volver
                                    </button>
                                </div>`;

        });
    
        mdContent.innerHTML = `<div id="table-${country.id}">
                                <table id="tableCountry${country.id}" class="table">
                                    <thead class="clickable-header">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Institución</th>
                                            <th scope="col">Publicaciones</th>
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
                scrollY: 400
            });
        } );

        $(document).ready( function () {
            $(`#tablePub${country.id}`).DataTable({
                paging: false,
                searching: false,
                info: false,
                scrollY: 400
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

            document.querySelector('#md-countries')
            .innerHTML += `<div class="modal fade" id="md-${id}" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title text-center" id="md-${id}-title">
                                                Instituciones de ${country.name} con publicaciones en conjunto con ESPOL
                                            </h5>
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

        let values = await fetch('/api/espol/collaboration/documentCount');
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
        var series = map.choropleth(densityData);

        series.labels(false);

        series
            .hovered()
            .fill('#f48fb1')
            .stroke(anychart.color.darken('#f48fb1'));

        series
            .selected()
            .fill('#c2185b')
            .stroke(anychart.color.darken('#c2185b'));

        series
            .tooltip()
            .useHtml(true)
            .format(function () {
            return (
                '<span style="color: #d9d9d9">Publicaciones</span>: ' +
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