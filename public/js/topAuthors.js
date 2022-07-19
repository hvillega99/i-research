const divTable = document.getElementById('top-table');

fetch('/api/topAuthors')
.then(result => result.json())
.then(elements => {
    if(elements.error){
        //IDIOMA
        var autor_th = 'Autor'
        var no_aviliable = 'No disponible'
        if(thecheck.checked){
            no_aviliable = 'Not available'
            autor_th = 'Author'
        }
        //FIN DE IDIOMA

        console.error('top no disponible')
        divTable.innerHTML = `<p data-value="No disponible">${no_aviliable}</p>`;
    }else{
        //IDIOMA
        var autor_th = 'Autor'
        if(thecheck.checked){
            autor_th = 'Author'
        }
        //FIN DE IDIOMA

        let table = `<table id="sortedTableTop" class="display" style="width:100%">
                        <thead class="clickable-header">
                            <tr>
                                <th scope="col" style="text-align:center">#</th>
                                <th scope="col" style="text-align:center" data-value="Autor">${autor_th}</th>
                                <th scope="col" style="text-align:center">H-index</th>
                            </tr>
                        </thead>
                        <tbody>`
    
        elements.forEach((item, index) => {
            table += `<tr class="item" onclick="window.location.href='/investigador/${item.id}'">
                            <th scope="row">${index + 1}</th>
                            <td id="${item.id}" class="autor">
                                ${item.name}
                            </td>
                            <td>
                                ${item.h}
                            </td>
                    </tr>`
        })
    
        table += `</tbody></table>`
    
        divTable.innerHTML = table;

        
        $(document).ready( function () {
            $('#sortedTableTop').DataTable({
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
       
        

       
    }

})