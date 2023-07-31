const fetch = require('node-fetch');

class MsTranslator {

    constructor(){
        this.uri = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';
        this.key = '3255e58f9c3343e1be2744b9674ce35f';
        this.region = 'eastus2';
    }

    async translate(text, source, target){

        try{

            const headers = new Headers();
            headers.append("Ocp-Apim-Subscription-Key", this.key);
            headers.append("Ocp-Apim-Subscription-Region", this.region);
            headers.append("Content-type", "application/json");

            const raw = JSON.stringify(
                [{
                    "text": text
                }]
            );

            const requestOptions = {
                method: 'POST',
                headers: headers,
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