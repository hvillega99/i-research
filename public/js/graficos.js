
/*var speedCanvas = document.getElementById("grafica1");

Chart.defaults.global.defaultFontFamily = "Lato";
Chart.defaults.global.defaultFontSize = 18;

var speedData = {
    labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
    datasets: [{
        label: "Car Speed (mph)",
        data: [0, 59, 75, 20, 20, 55, 40],
    }]
};

var chartOptions = {
    legend: {
        display: true,
        position: 'top',
        labels: {
            boxWidth: 80,
            fontColor: 'black'
        }
    }
};

var lineChart = new Chart(speedCanvas, {
    type: 'line',
    data: speedData,
    options: chartOptions
});*/

const getH5index = async (scopusId) =>{
    const uri = "https://api.elsevier.com/analytics/scival/author/metrics?";
    const apiKey = "d2f270ed229df1d1aa750351fa2c101b";
    const endpoint = `${uri}metricTypes=HIndices&authors=${scopusId}&yearRange=5yrsAndCurrent&includeSelfCitations=true&byYear=true&includedDocs=AllPublicationTypes&journalImpactType=CiteScore&showAsFieldWeighted=false&indexType=h5Index&apiKey=${apiKey}`

    const response = await fetch(endpoint);
    const data = await response.json();
    const values = data.results[0].metrics[0].valueByYear;

    const keys = Object.keys(values);
    return keys.map(key => values[key]);
};


const pId = document.getElementById("scopusId").innerText;
const scopusId = pId.split(": ")[1];

getH5index(scopusId)
.then(response => {
    var grafica2 = document.getElementById("grafica2");
    var myChart = new Chart(grafica2, {
        type: 'line',
        data: {
            labels: ['2016','2017','2018','2019', '2020', '2021'],
            datasets: [{
                label: 'H5-index',
                data: response,
                backgroundColor: [
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)',
                    'rgba(33, 58, 143, 0.2)'
                ],
                borderColor: [
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)',
                    'rgba(34, 50, 101, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
})


