const rsinput = document.getElementById("input-rsfile");

rsinput.onchange = function(e) {
    const name = document.getElementById('rsfilename');
    name.innerHTML = rsinput.value.split('\\').pop();
    document.getElementById('buttons-researchers').innerHTML = `<button type="submit" class="btn btn-primary">Actualizar</button>
                                                            <a href="/admin" class="btn btn-secondary">Cancelar</a>`
}

const dainput = document.getElementById("input-dafile");

dainput.onchange = function(e) {
    const name = document.getElementById('dafilename');
    name.innerHTML = dainput.value.split('\\').pop();
    document.getElementById('buttons-documents').innerHTML = `<button type="submit" class="btn btn-primary">Actualizar</button>
                                                            <a href="/admin" class="btn btn-secondary">Cancelar</a>`
}

const usrinput = document.getElementById("input-usrfile");

usrinput.onchange = function(e) {
    const name = document.getElementById('usrfilename');
    name.innerHTML = usrinput.value.split('\\').pop();
    document.getElementById('buttons-users').innerHTML = `<button type="submit" class="btn btn-primary">Actualizar</button>
                                                            <a href="/admin" class="btn btn-secondary">Cancelar</a>`
}

const akinput = document.getElementById("input-akfile");

akinput.onchange = function(e) {
    const name = document.getElementById('akfilename');
    name.innerHTML = akinput.value.split('\\').pop();
    document.getElementById('buttons-apikey').innerHTML = `<button type="submit" class="btn btn-primary">Actualizar</button>
                                                            <a href="/admin" class="btn btn-secondary">Cancelar</a>`
}