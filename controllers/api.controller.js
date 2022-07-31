const Scival = require('../helpers/scival');
const Scopus = require('../helpers/scopus');
const Gtsi = require('../helpers/gtsi');
const CsvParser = require('../helpers/csvParser');

const Researchersdb = require('../helpers/researchersdb');
const dbController = new Researchersdb();

const Cache = require('../cache/cache');
const cache = new Cache();

const scival = new Scival();
const gtsi = new Gtsi();
const scopus = new Scopus();
const parser = new CsvParser();

const countries = require('../resources/data/list_countries.json');

exports.getBibliometricsBySDG = async (req, res) => {

    let data = await cache.get('sdg');

    if(!data || data.error){
        data = await getSdg([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        await cache.set('sdg', JSON.stringify(data));
    }else{
        data = JSON.parse(data);

        const err_data = data.filter(item => item.error);

        if(err_data.length > 0){

            const ok_data = data.filter(item => !item.error);

            const sdg_numbers = err_data.map(item => item.sdg);

            const result = await getSdg(sdg_numbers);

            data = [...ok_data, ...result];

            data.sort((x, y) => x.sdg - y.sdg);
            await cache.set('sdg', JSON.stringify(data));
        }

    }

    res.send(data);
}

exports.getPublicationsBySDG = async (req, res) => {
    const {sdg} = req.params;
    const result = await scopus.getSDGpublications(sdg);
    res.send(result);
}

exports.getBibliometricsUnit = async (req, res) => {
    const {ua} = req.params;
    const {instfilter} = req.query;
    const researchers = dbController.getResearchersByUnit(ua);
    const arrScopusId = researchers.map(item => item.id);

    let key = '';
    instfilter == 'true' ? key = `${ua}_inf` : key = ua;

    let data = await cache.get(key);

    if(!data || data.error){
        const date = new Date();
        const lastYear = date.getFullYear() - 1;
        const years = [lastYear-5, lastYear-4, lastYear-3, lastYear-2, lastYear-1, lastYear];

        data = await getBby(years, arrScopusId, instfilter);
    
        await cache.set(key, JSON.stringify(data));
    }else{
        data = JSON.parse(data);

        const err_data = data.filter(item => item.error);

        if(err_data.length > 0){
                
                const ok_data = data.filter(item => !item.error);
    
                const years = err_data.map(item => item.year);
    
                const result = await getBby(years, arrScopusId, instfilter);
    
                data = [...ok_data, ...result];

                data.sort((x, y) => x.year - y.year);
    
                await cache.set(key, JSON.stringify(data));
        }
        
    }

    res.send(data);
}

exports.getEspolCitationsByYear = async (req, res) => {
    const citations = await scival.getInstitutionCitations('701420');
    res.send(citations);
}

exports.getEspolPublicationsByYear = async (req, res) => {
    const publications = await scival.getInstitutionPublications('701420');
    res.send(publications); 
}

exports.getTopJournalInst = async (req, res) => {
    const topJournals = await scival.getPublicationsInTopJournalPercentiles('701420');
    res.send(topJournals);
}

exports.getTopAuthors = async (req, res) => {

    const key = 'top_authors';
    let data = await cache.get(key);

    if(!data || data.error){
        const arrScopusId = dbController.getAllScopusId();
        let authors = [];
    
        try{
            for(let i=0; i<10; i++){
                let subArray;

                subArray = await scival.getHIndexAll(
                        arrScopusId.slice(Math.round((i/10)*arrScopusId.length), 
                        Math.round(((i+1)/10)*arrScopusId.length))
                    );

                authors = [...authors, ...subArray];
            }
         
            authors.sort((x, y) => y.h - x.h);
            authors = authors.slice(0, 10);
        
            data = authors;

            await cache.set(key, JSON.stringify(data));

        }catch (err) {
            console.log(err)
            data = {"error": true, "message": "servicio no disponible"};
        }
    }
    res.send(data);
}

exports.getCollaborators = async (req, res) => {
    const {scopusId, publications} = req.params;

    let collaborators = [];

    try{
        collaborators = await scopus.getCoauthors(publications.split(','),scopusId);
        collaborators.forEach(e => {
            const result = dbController.searchById(e.id);
            e["fromEspol"] = result != undefined;
        })
        res.json(collaborators);
    }catch (err) {
        res.json({error: true, message: 'servicio no disponible'});
    }

}

exports.getProjectsByAuthor = async (req, res) => {
    const {author} = req.params;
    const projects = await gtsi.getProjects(author);
    res.send(projects);
}

exports.getProjectsByUnit = async (req, res) => {
    const {ua} = req.params;
    const projects = await gtsi.getProjectsByUnit(ua);
    res.send(projects);
}

exports.getPublicationsInfo = async (req, res) => {
    const {id} = req.params;
    const info = await scopus.getInfoPublications(id);

    
    const authorsList = [];
    info.authors.forEach(item => {

        const scopusId = item.scopusId;
        const result = dbController.searchById(scopusId);
        const fromEspol = result != undefined;

        item['fromEspol'] = fromEspol;

        authorsList.push(item);
    });

    const authors = {
        fromEspol: authorsList.filter(item => item.fromEspol),
        notFromEspol: authorsList.filter(item => !item.fromEspol)
    }

    info["authors"] = authors;
   
    res.send(info);
}

exports.getPublicationsByArea = async (req, res) => {
    const data = await parser.getDocumentsByArea();
    let total = 0;

    data.forEach(item => {
        total += parseInt(item.Documents);
    })

    data.forEach(item => {
        const percent = (parseInt(item.Documents)/total)*100;
        item["Percent"] = percent;
    })

    res.json(data);
}

exports.getNDocsByCountry = async (req, res) => {

    let data = await cache.get('dbc');

    if(!data || data.error){
        data = await getDbc(countries);
        await cache.set('dbc', JSON.stringify(data));

    }else{

        data = JSON.parse(data);

        const err_data = data.filter(item => item.error);

        if(err_data.length > 0){

            const ok_data = data.filter(item => !item.error);

            const list_countries = err_data.map(item => {
                return {name: item.country, id: item.id}
            });

            const result = await getDbc(list_countries);

            data = [...ok_data, ...result];

            await cache.set('dbc', JSON.stringify(data));
        }
    }

    res.send(data);
}

exports.getInfoDocsByCountry = async (req, res) => {
    const {country} = req.params;

    const countryData = countries.find(e => e.id == country.toUpperCase());

    if(countryData){

        let countryName = ''; 

        countryData.name.split(' ').forEach(item => {
            countryName += item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() + ' ';
        })

        countryName = countryName.slice(0, countryName.length-1);

        const projects = await scopus.getPublicationsInfoByCountry(countryName);
        res.send(projects);
    }else{
        res.send({error: true, message: 'país no encontrado'});
    }
}

exports.getAuthorCountByGender = async (req, res) => {
    const idArr = dbController.getAllScopusId();
    const response = await gtsi.getContratosByScopusId(idArr);

    let countF = 0;
    let countM = 0;

    response.forEach(item => {
        if(item.sexo){
            item.sexo == 'F' ? countF++ : countM++;
        }
    })

    res.send({'mujeres': countF, 'hombres': countM});

}



const getDbc = async (list_countries, p=25) => {

    const data = [];

    for(let i=0; i<p ; i++){
        
        const result = await Promise.all(
            list_countries.slice(parseInt((i/p)*list_countries.length), parseInt(((i+1)/p)*list_countries.length))
            .map(country => scopus.getPublicationsByCountry(country.name))
        )

        result.forEach(item =>{
            country = list_countries.find(country => country.name == item.country);
            data.push({id: country.id, ...item});
        })
    }
 
    return data;
}

const getSdg = async (sdg_numbers) => {
    //const sdg_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

    const p = 2;
    let data = [];

    for (let i = 0; i < p; i++) {

        let result = await Promise.all(
            sdg_numbers.slice(parseInt((i/p)*sdg_numbers.length), parseInt(((i+1)/p)*sdg_numbers.length))
            .map(sdg => scopus.getSDGbibliometrics(sdg))
        )

        data = [...data, ...result];
    }

    return data;
}

const getBby = async (years, arrScopusId, instfilter) => {
    const data = await Promise.all(
        years.map(year => scopus.getNPublications(arrScopusId, year, instfilter))
    );

    return data;
}
