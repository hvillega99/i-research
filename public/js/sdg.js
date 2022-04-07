const sgdNames = {
    1: 'Fin de la pobreza',
    2: 'Hambre cero',
    3: 'Salud y bienestar',
    4: 'Educación de calidad',
    5: 'Igualdad de género',	
    6: 'Agua limpia y saneamiento',
    7: 'Energía asequible y no contaminante',
    8: 'Trabajo decente y crecimiento económico',
    9: 'Industria, innovación e infraestructura',
    10: 'Reducción de las desigualdades',
    11: 'Ciudades y comunidades sostenibles',
    12: 'Producción y consumo responsable',
    13: 'Acción por el clima',
    14: 'Vida submarina',
    15: 'Vida de ecosistemas terrestres',
    16: 'Paz, justicia e instituciones sólidas',
}

const sdgPanel = document.getElementById('sdg-panel');
const sdgPublications = document.getElementById('sdg-publications');

const showList = async (sdg) =>{
    sdgPanel.style.display = 'none';
    sdgPublications.style.display = 'block';
    document.getElementById('title-list').innerHTML = `Publicaciones sobre ODS ${sdg}: ${sgdNames[sdg]}`;
}

const hideList = () => {
    sdgPanel.style.display = 'block';
    sdgPublications.style.display = 'none';
}

/* <table class="table fixed_header">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Citaciones</th>
            <th scope="col">Año de publicación</th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table> */