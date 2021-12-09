const divTable = document.getElementById('top-table');

fetch('/api/topAuthors')
.then(result => result.json())
.then(elements => {

    let table = `<table class="table">
                    <thead>
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

})