document.getElementById("input-logo").onchange = function(e) {
    // Creamos el objeto de la clase FileReader
    const reader = new FileReader();
  
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    reader.readAsDataURL(e.target.files[0]);
  
    // Le decimos que cuando este listo ejecute el código interno
    reader.onload = function(){
        const image = document.getElementById('logo');
        image.src = reader.result;
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