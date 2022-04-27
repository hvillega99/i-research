const showCountryInfo = async (e, data) => {

    const index = e.pointIndex;
    const country = data[index];

    if(!country || country.documentCount ==0){
        return;
    }

    var myModal = new bootstrap.Modal(document.getElementById(`md-${country.id}`));
    myModal.show();

    if(document.getElementById(`waiting-${country.id}`)){
    
        const response = await fetch(`/api/espol/collaboration/documents/${country.id}`);
        const information = await response.json();
    
        const instArr = Object.keys(information);
    
        let mdContent = document.querySelector(`#md-${country.id}-content`);
    
        let content = ''; 
    
        instArr.forEach((inst, index)=> {
    
            const publications = information[inst];
            let contentPublications = '';
    
            publications.forEach((pub, index) => {
                contentPublications += `<p onclick="handleClick(${pub[3]})" id="${pub[3]}" data-bs-toggle="modal" 
                                        class="item" data-bs-target="#modal-${pub[3]}">
                                            ${pub[0]}
                                        </p>`;

                if(index < publications.length-1){
                    contentPublications += '<hr>';
                }
    
                contentPublications += `<div class="modal fade" id="modal-${pub[3]}" tabindex="-1" aria-hidden="true">
                                          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                            <div class="modal-content">
                                              <div class="modal-header">
                                                <h5 class="modal-title">Publicación</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                              </div>
                                              <div class="modal-body" id="content-${pub[3]}">
                                                <div class="spinner-border" role="status" id="waiting-${pub[3]}">
                                                  <span class="visually-hidden">Loading...</span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>`;
                });
    
            content += `<div class="accordion-item">
                            <h2 class="accordion-header">
                              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapseThree">
                                ${inst}
                              </button>
                            </h2>
                            <div id="collapse${index}" class="accordion-collapse collapse">
                              <div class="accordion-body">
                                ${contentPublications}
                              </div>
                            </div>
                        </div>`;
        });
    
        mdContent.innerHTML = content;
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
            .innerHTML += `<div class="modal" id="md-${id}" data-bs-backdrop="static" tabindex="-1">
                                <div class="modal-dialog modal-dialog-scrollable">
                                <div class="modal-content">
                                    <div class="modal-header">
                                    <h5 class="modal-title text-center">
                                        Instituciones de ${country.name} con publicaciones en conjunto con ESPOL
                                    </h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                    <div class="accordion" id="md-${id}-content">
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