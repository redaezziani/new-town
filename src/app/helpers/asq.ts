import cheerio from 'cheerio';
import { secret } from '@/(db)/secrets';


// lets make a class for 3asq.org

/*
https://3asq.org
*/


export class Asq {
    url: string;
    constructor() {
        this.url = secret.asq_url as string;
    }
    async getMangaData(manga: string) {
        try {
            console.log('fetching data from 3asq.org');
            return 'hello world'
        } catch (error) {
            console.error(error);
        }
    }
}

