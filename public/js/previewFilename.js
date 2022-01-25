const dainput = document.getElementById("input-dafile");

const cancelDocuments= document.createElement('button');
cancelDocuments.setAttribute('class', 'btn btn-secondary');
cancelDocuments.textContent = 'Cancelar';
cancelDocuments.onclick = (e) => {
    const originalName = document.getElementById('da-original').value;
    document.getElementById('dafilename').innerHTML = `<a href="/admin/download/publicaciones">${originalName}</a>`;
    document.getElementById('buttons-documents').innerHTML = '';
    dainput.value = '';
}

dainput.onchange = function(e) {
    const name = document.getElementById('dafilename');
    name.innerHTML = dainput.value.split('\\').pop();
    const buttons = document.getElementById('buttons-documents');
    buttons.innerHTML = '<button type="submit" class="btn btn-primary">Actualizar</button>';
    buttons.appendChild(cancelDocuments);
}

//*************************/

const rsinput = document.getElementById("input-rsfile");

const cancelResearchers= document.createElement('button');
cancelResearchers.setAttribute('class', 'btn btn-secondary');
cancelResearchers.textContent = 'Cancelar';
cancelResearchers.onclick = (e) => {
    const originalName = document.getElementById('rs-original').value;
    document.getElementById('rsfilename').innerHTML = `<a href="/admin/download/investigadores">${originalName}</a>`;
    document.getElementById('buttons-researchers').innerHTML = '';
    rsinput.value = '';
}

rsinput.onchange = function(e) {
    const name = document.getElementById('rsfilename');
    name.innerHTML = rsinput.value.split('\\').pop();
    const buttons = document.getElementById('buttons-researchers');
    buttons.innerHTML = '<button type="submit" class="btn btn-primary">Actualizar</button>';
    buttons.appendChild(cancelResearchers);
}

//*************************/

const usrinput = document.getElementById("input-usrfile");

const cancelUsers= document.createElement('button');
cancelUsers.setAttribute('class', 'btn btn-secondary');
cancelUsers.textContent = 'Cancelar';
cancelUsers.onclick = (e) => {
    const originalName = document.getElementById('usr-original').value;
    document.getElementById('usrfilename').innerHTML = `<a href="/admin/download/usuarios">${originalName}</a>`;
    document.getElementById('buttons-users').innerHTML = '';
    usrinput.value = '';
}

usrinput.onchange = function(e) {
    const name = document.getElementById('usrfilename');
    name.innerHTML = usrinput.value.split('\\').pop();
    const buttons = document.getElementById('buttons-users');
    buttons.innerHTML = '<button type="submit" class="btn btn-primary">Actualizar</button>';
    buttons.appendChild(cancelUsers);
}

//*************************/

const akinput = document.getElementById("input-akfile");

const cancelApikey= document.createElement('button');
cancelApikey.setAttribute('class', 'btn btn-secondary');
cancelApikey.textContent = 'Cancelar';
cancelApikey.onclick = (e) => {
    const originalName = document.getElementById('apikey-original').value;
    document.getElementById('akfilename').innerHTML = `<a href="/admin/download/apikey">${originalName}</a>`;
    document.getElementById('buttons-apikey').innerHTML = '';
    akinput.value = '';
}

akinput.onchange = function(e) {
    const name = document.getElementById('akfilename');
    name.innerHTML = akinput.value.split('\\').pop();
    const buttons = document.getElementById('buttons-apikey');
    buttons.innerHTML = '<button type="submit" class="btn btn-primary">Actualizar</button>';
    buttons.appendChild(cancelApikey);
}