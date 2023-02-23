const fetch = require('node-fetch');

class Translator{


    constructor(){
        this.uri = "http://200.10.147.44:8081/translate";   
    }


    async translate(text, source, target){
        try {
            
            const res = await fetch(this.uri, {
                method: "POST",
                body: JSON.stringify({
                    q: text,
                    source: source,
                    target: target,
                    format: "text",
                    api_key: ""
                }),
                headers: { "Content-Type": "application/json" }
            });
            
            const translatedText = await res.json();
            
            return translatedText;
            
        } catch (error) {   
            return {'error': error}
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

    async toEs(text){
        const result = this.translate(text, "auto", "es");
        
        return result;
    }

    async toEn(text){
        const result = this.translate(text, "auto", "en");
        
        return result;
    }


}

module.exports = Translator;