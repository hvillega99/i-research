class Lens{

    constructor(){
        this.uri = "https://api.elsevier.com/content/";   
    }

    async getPublicaciones(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "TOKEN");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "query": {
            "match": {
            "author.orcid": "0000-0002-9263-673X"
            }
        }
        });

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://api.lens.org/scholarly/search", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
}

module.exports = Lens;