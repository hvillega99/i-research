const divTable = document.getElementById('top-table');

fetch('/api/topAuthors')
.then(result => result.json())
.then(elements => {
    if(elements.error){
        console.error('top no disponible')
        divTable.innerHTML = '<p>No disponible</p>';
    }else{
        let table = `<table id="sortedTable" class="table">
                        <thead class="clickable-header">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Autor</th>
                                <th scope="col">H-index</th>
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
            $('#sortedTable').DataTable({
                paging: false,
                searching: false,
                info: false,
                scrollY: 400
            });
        } );
    }

})