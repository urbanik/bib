const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */

const parse = data => {
  const $ = cheerio.load(data);
  var dict = [];
  var pages_display = $('div.js-restaurant__stats > h1:nth-child(1) > span:nth-child(1)').text();
  var split_pages = pages_display.split("-");
  var pages = split_pages[1] - split_pages[0];
  for (j = 1; j <= pages + 1; j++) {
    if (j != 21) {
      var temp_str = $('div.col-md-6:nth-child(' + j + ') > div:nth-child(1) > div:nth-child(2) > h5:nth-child(2) > a:nth-child(1)').text();
      temp_str = temp_str.substring(17);
      temp_index = temp_str.indexOf('\n');
      temp_str = temp_str.substring(0, temp_index);
      if (temp_str != "") {
        dict.push({
          name: temp_str
        });
      }
    }
  }
  return {
    dict
  };

};

/**
 * Scrape a given restaurant url
 * @param  {String}  url
 * @return {Object} restaurant
 */

module.exports.scrapeRestaurant = async url => {
  const response = await axios(url);
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
