/* eslint-disable no-console, no-process-exit */
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
  /*while(true) {
    try {
      console.log(`browsing page ${page_count}`);

      const restaurant_maitre = await maitre.scrapeRestaurant(page_count);

      if(Object.keys(restaurant_maitre.dict).length  == 0){
        break;
      }

      list_maitre = list_maitre.concat(restaurant_maitre.dict);

      //var json = JsonConvert.SerializeObject(restaurant, Formatting.Indented);
      console.log('done');
      page_count++;
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }*/

  let data = JSON.stringify(list_bib);
  fs.appendFileSync('bib.json',data);
  let data2 = JSON.stringify(list_maitre);
  fs.appendFileSync('maitre.json',data2);

  for(var name in data){
    console.log(name + ": " + data[name]);
  }

  for(var name in data2){
    console.log(data2[name]);
  }

  process.exit(0);
}

const [,, link] = process.argv;

sandbox(link);
