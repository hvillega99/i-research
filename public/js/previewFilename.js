const rsinput = document.getElementById("input-rsfile");

rsinput.onchange = function(e) {
    const name = document.getElementById('rsfilename');
    name.innerHTML = rsinput.value.split('\\').pop();
}

const dainput = document.getElementById("input-dafile");

dainput.onchange = function(e) {
    const name = document.getElementById('dafilename');
    name.innerHTML = dainput.value.split('\\').pop();
}