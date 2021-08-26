items = document.getElementsByClassName("btn-ver-perfil");
cabecera = document.getElementById("cabecera");

spinner = document.createElement('div');
spinner.innerHTML = '<div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>'

for(let i=0;i<items.length;i++){
    items[i].onclick = function(event) { cabecera.appendChild(spinner); };
}
