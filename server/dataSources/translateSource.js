const  {RESTDataSource} =require('apollo-datasource-rest');
const qs = require('qs');
const API_KEY = process.env.TRANSLATE_KEY;
const API_URL = 'https://google-translate1.p.rapidapi.com/language/translate';

 class TranslateAPI extends RESTDataSource{
    constructor(){
        super();
        this.baseURL=API_URL;
    }

    async translate(text, from,to){
        const body = {
            "q": text,
            "source": from,
            "target": to
      }
      const qsBody= qs.stringify(body);
        const result = await this.post('v2',qsBody,{
            headers:{
                'content-type': 'application/x-www-form-urlencoded',
                'accept-encoding': 'application/gzip',
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'google-translate1.p.rapidapi.com'
            }
        });
        return result.data;
    }

}
module.exports= TranslateAPI;