const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

//Write on a file called "animalData.json" in public folder, create that file if does not exist
const writeStream = fs.createWriteStream("../../../public/animalData.json");

//Write the start of json file
writeStream.write("{ \n");

//Write the start of animals objects
writeStream.write(' "animals": [ \n');

//Crawl data in the url provided
request(
  "https://www.oldbookillustrations.com/subjects/animals/",
  (error, response, html) => {
    //If page has been loaded successfully, start crawling
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      let count = 0;

      //Crawl data from a designated tag and create a collection of objects
      const titleLoop = $(
        `.entry-content .archive-gallery .archive-title a`
      ).each((i, el) => {
        //Opening clause for each object
        writeStream.write("  { \n");

        //write data into the json file
        const title = $(el).text();
        const link = $(el).attr("href");

        writeStream.write(
          `     "title": "${title}", \n     "link": "${link}" \n`
        );
        writeStream.write("  }, \n");

        count++;
        console.log("animal count: ", count);
        console.log(`${title}, ${link} \n`);
      });

      writeStream.write(" ] \n");

      //Write closing clause for the json file
      writeStream.write("} \n");
    }
  }
);
