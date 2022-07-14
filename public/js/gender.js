const thecheckD3 = document.querySelector(".check")
thecheckD3.addEventListener("click", idiomaD3)
var gd_graph;

const loadGenderGraph = async (canvas, title, info) => {
    const response = await fetch('/api/espol/metrics/authorsByGender');
    const data = await response.json();

    gd_graph = new Chart(canvas, {
        type: 'pie',
        data: {
            labels: ['Mujeres', 'Hombres'],
            datasets: [{
                label: 'Sexo',
                data: [data.mujeres, data.hombres],
                backgroundColor: ['#D3BAE9', '#A6D2E1'],
                borderColor: ['#D3BAE9', '#A6D2E1'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            legend: {
                display:  true,
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });

    title.textContent = 'Autores por sexo';
    info.innerHTML = '<img src="/img/info.ico" data-toggle="tooltip" data-placement="top" data-value="Cantidad de autores por sexo." title="Cantidad de autores por sexo."></img>';
}

const genderGraph = document.getElementById('grafica-gender');

if(genderGraph){
    const title = document.getElementById('title-gender');
    const info = document.getElementById('info-gender');
    loadGenderGraph(genderGraph, title, info);
}


const showAll = () => {
    const items = document.getElementsByClassName("i-item");
    let n = 1;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        item.style.display = '';
        item.children[0].textContent = n;
        n++;
    }

}

const filterByGender = (gender) => {

    showAll();

    const items = document.getElementsByClassName('i-item');
    let n = 1;

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if(!item.classList.contains(gender)){
            item.style.display = 'none';
        }else{
            item.children[0].textContent = n;
            n++;
        }
    }
}


async function idiomaD3(){
    if(thecheck.checked){
        gd_graph.data.labels = ['Women', 'Men']
        gd_graph.data.datasets[0].label="Gender"
        
    }
    else{
        gd_graph.data.labels = ['Mujeres', 'Hombres']
        gd_graph.data.datasets[0].label="Sexo"
        
    }

    
    //console.log(tf.data.datasets[0].label);
}