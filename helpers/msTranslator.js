const fetch = require('node-fetch');
const Resourcesdb = require('./resourcesdb');
const resources = new Resourcesdb();

class MsTranslator {

    constructor(){
        this.uri = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';
        this.key = resources.getTranslatekey();
        this.region = 'eastus2';
    } 

    async translate(text, source, target){

        try{


            const raw = JSON.stringify(
                [{
                    "text": text
                }]
            );

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': this.key,
                    'Ocp-Apim-Subscription-Region': this.region,
                    'Content-type': 'application/json'
                },
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(`${this.uri}&from=${source}&to=${target}`, requestOptions);
            const result = await response.json();
            
            const translatedText = result[0].translations[0].text;
            return translatedText;

        } catch (error) {
            return {'error': error};
        }

    }

    async esToEn(text){
        const result = this.translate(text, "es", "en");
        
        return result;
    }

    async enToEs(text){
        const result = this.translate(text, "en", "es");
        
        return result;
    }

}

module.exports = MsTranslator;