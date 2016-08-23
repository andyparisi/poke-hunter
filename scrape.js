let fetch = require('isomorphic-fetch');
let jsdom = require('jsdom');
let jsonfile = require('jsonfile');
let colors = require('colors');
const SERVER_PATH = "./server/data";
const POKE_COUNT = 721;

module.exports = (() => {
  let start = 1;
  let end = POKE_COUNT;

  gatherData(start, end);
})();

function gatherData(start, end) {
  const baseUrl = "http://serebii.net/pokedex-xy";
  let currentCount = "" + start;

  if(start === end + 1) {
    return;
  }

  // Pad the count
  while(currentCount.length < 3) {
    currentCount = "0" + currentCount;
  }

  fetch(`${baseUrl}/${currentCount}.shtml`)
  .then(res => {
    if(res.status != 200) {
      console.log(`Skipping #${currentCount} due to Not Found Error`.red);
      return;
    }
    else {
      console.log(`1. Found #${currentCount}; starting parsing...`.yellow);
    }

    // Continue if success on GET
    return res.text();
  })
  .then(body => parseMainPage(body, currentCount))
  .then(output => writeFile(`${SERVER_PATH}/${currentCount}.json`, output))
  .then(() => getDetailsPage(baseUrl, currentCount))
  .then(output => writeFile(`${SERVER_PATH}/details/${currentCount}.json`, output, true))
  .then(() => gatherData(start + 1, end));
}

function getDetailsPage(baseUrl, currentCount) {
  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/location/${currentCount}.shtml`)
    .then(res => {
      if(res.status != 200) {
        console.log(`Skipping #${currentCount} details due to Not Found Error at ${res.url}`.red);
        resolve();
      }
      else {
        console.log(`4. Found details for #${currentCount}; starting parsing...`.yellow);
      }

      // Continue if success on GET
      return res.text();
    })
    .then(body => parseDetailsPage(body, currentCount))
    .then(output => resolve(output));
  });
}

function parseMainPage(html, currentCount) {
  return new Promise((resolve, reject) => {
    console.log(`2. Now parsing #${currentCount}...`.cyan)
    jsdom.env(html, (err, window) => {
      let output = {
        num: currentCount,
        x: null,
        y: null,
        or: null,
        as: null
      };

      // Get the Locations table
      let location = checkTable(window.document.getElementsByClassName('dextable'), 5);

      // Add the rows
      let rows = {};
      rows.x = location.getElementsByTagName('tr')[1];
      rows.y = location.getElementsByTagName('tr')[2];
      rows.or = location.getElementsByTagName('tr')[3];
      rows.as = location.getElementsByTagName('tr')[4];

      // Determine which rows correspond to which games
      for(r in rows) {
        let row = rows[r];
        
        if(row != null) {
          output[r] = row.getElementsByTagName('td')[1].innerHTML;
        }
      }

      window.close();
      resolve(output);
    });
  });
}

function parseDetailsPage(html, currentCount) {
  return new Promise((resolve, reject) => {
    console.log(`5. Now parsing #${currentCount} details...`.cyan)
    jsdom.env(html, (err, window) => {
      let output = {
        num: currentCount,
        x: null,
        y: null,
        or: null,
        as: null
      };

      // Add the rows
      let rows = [];
      rows.push(window.document.getElementsByClassName('dextable')[1]);
      rows.push(window.document.getElementsByClassName('dextable')[2]);
      rows.push(window.document.getElementsByClassName('dextable')[3]);
      rows.push(window.document.getElementsByClassName('dextable')[4]);

      // Determine which rows correspond to which games
      rows.forEach(row => {
        let game;
        let html;
        let out;

        if(row != null) {
          html = row.innerHTML;
          let g = row.getElementsByClassName('fooevo')[0].getElementsByTagName('a')[0].innerHTML;

          switch(g.toLowerCase()) {
            case 'x':
              game = 'x';
              break;
            case 'y':
              game = 'y';
              break;
            case 'omega ruby':
              game = 'or';
              break;
            case 'alpha sapphire':
              game = 'as';
              break;
          }

          // Grab the header columns
          let tRows = row.getElementsByTagName('tr');
          let rI = 2;
          let o = [];

          while(tRows[rI] != null) {
            let cI = 0;
            let cO = {};

            while(tRows[rI].getElementsByTagName('td')[cI] != null) {
              let oKey = tRows[1].getElementsByTagName('td')[cI].innerHTML.toLowerCase().replace(/\s+|\.+/ig, '');
              cO[oKey] = strip(tRows[rI].getElementsByTagName('td')[cI].innerHTML.replace(/\t|\n+/g, ''), window);
              cI++;
            }

            o.push(cO);
            rI++;
          }

          out = o;
        }

        // Write the result to the output
        if(html) {
          output[game] = out;
        }
      });

      window.close();
      resolve(output);
    });
  });
}

function writeFile(path, json, isDetails) {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(path, json, (err) => {
      if(err) {
        console.log("\x1b[31m", err);
        reject();
      }
      else {
        console.log(`${(isDetails) ? 6 : 3}. Successfully written to ${path}`.green);
        resolve();
      }
    });
  });
}

function strip(html, window) {
   var tmp = window.document.createElement("div");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function checkTable(table, index) {
  if(table[index].getElementsByTagName('td')[0].innerHTML.toLowerCase().search('location') > -1) {
    return table[index];
  }
  
  return checkTable(table, index + 1)
}