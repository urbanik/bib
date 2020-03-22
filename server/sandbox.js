const michelin = require('./michelin');
const maitre = require('./maitres');
const fs = require('fs');

async function sandbox() {
  var i=1;
  var list_bib = [];
  var list_maitre = [];
  while(true) {
    try {
      var link='https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/'+i;
      console.log(`browsing ${link} source`);

      const restaurant = await michelin.scrapeRestaurant(link);

      list_bib = list_bib.concat(restaurant.dict);

      if(Object.keys(restaurant.dict).length  == 0){
        break;
      }

      console.log('done');
      i++;
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  var page_count = 1;
  while(true) {
    try {
      console.log(`browsing page ${page_count}`);

      const restaurant_maitre = await maitre.scrapeRestaurant(page_count);

      if(Object.keys(restaurant_maitre.dict).length  == 0){
        break;
      }

      list_maitre = list_maitre.concat(restaurant_maitre.dict);

      console.log('done');
      page_count++;
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  // save into .json for next webapp rendering
  let data = JSON.stringify(list_bib);
  fs.appendFileSync('./react-webapp/src/components/DataHandling/bib.json',data);
  let data2 = JSON.stringify(list_maitre);
  fs.appendFileSync('./react-webapp/src/components/DataHandling/maitre.json',data2);

  process.exit(0);
}

const [,, link] = process.argv;

sandbox(link);
