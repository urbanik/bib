const axios = require('axios');
const cheerio = require('cheerio');
const querystring = require('querystring');


/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant_maitre
 */

const parse = data => {
    const $ = cheerio.load(data);
    var dict = [];
    $('div.single_libel').each((i, element) => {
        var temp_str = $(element).text();
        temp_str = temp_str.substring(24);
        temp_index= temp_str.indexOf(' (');
        temp_str = temp_str.substring(0,temp_index);
        if(temp_str != ""){
            dict.push({
                name : temp_str
            });
        }
    })
    return {dict};
};

/**
 * Scrape a given restaurant url
 * @param  {String}  page
 * @return {Object} restaurant_maitre
 */
module.exports.scrapeRestaurant = async page => {

    const payload = {
        'page': page,
        'request_id': 'dfe87d20cf5857fd64ccd03cd607c471'
    };

    const options = {
        'url': 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult',
        'method': 'POST',
        'headers': {
            'content-type': 'application/x-www-form-urlencoded'
        },
        'data': querystring.stringify(payload)
    };

    const response = await axios(options);
    const {
        data,
        status
    } = response;

    if (status >= 200 && status < 300) {
        return parse(data);
    }

    console.error(status);

    return null;
};

/**
 * Get all France located Bib Gourmand restaurants
 * @return {Array} restaurants
 */
module.exports.get = () => {
    return [];
};
