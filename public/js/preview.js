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