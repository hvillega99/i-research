/* const validationMessage = document.getElementById('message');

document.getElementById('button-submit').onclick = (e) => {
    const logo = document.getElementById('input-logo');
    if(!logo.value){
        validationMessage.innerHTML = '<p id="message" class="badge bg-danger">Seleccione un archivo</p>';
    }
} */

document.getElementById("input-logo").onchange = function(e) {
    // Creamos el objeto de la clase FileReader
    const reader = new FileReader();
  
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);
  
    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function(){
        const image = document.getElementById('logo');
        image.src = reader.result;
        validationMessage.innerHTML = '';
    };
}

const buttonsDelCenter = document.getElementsByClassName('delete-center')

for(let i = 0; i < buttonsDelCenter.length; i++){
    buttonsDelCenter[i].onclick = (e) => {    
        if (confirm("¿Está seguro?") == true) {
            window.location.href = `/admin/centros/delete/${e.target.id}`;
        }
    }
}

const buttonsDelUnit = document.getElementsByClassName('delete-unit')

for(let i = 0; i < buttonsDelUnit.length; i++){
    buttonsDelUnit[i].onclick = (e) => {    
        if (confirm("¿Está seguro?") == true) {
            window.location.href = `/admin/unidades/delete/${e.target.id}`;
        }
    }
}

const form = document.getElementById('form-add');

if(form){
    const cancelBtn = document.getElementById('button-cancel');
    
    cancelBtn.onclick = (e) => {
        form.reset();
        document.getElementById('logo').src = '';
        cancelBtn.style.display = 'none';
    }
    
    form.oninput = () => {
        cancelBtn.style.display = '';
    };
}
