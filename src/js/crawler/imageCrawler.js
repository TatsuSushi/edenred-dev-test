const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

//Write on a file called "image.json" in public folder, create that file if does not exist
const writeStream = fs.createWriteStream("../../../public/image.json");

//Write the start of json file
writeStream.write("{ \n");

//Write the start of images objects
writeStream.write(' "images": [ \n');

//Crawl data in the url provided
request(
  "https://www.oldbookillustrations.com/subjects/animals/",
  (error, response, html) => {
    //If page has been loaded successfully, start crawling
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      let count = 0;

      //Crawl image data from a designated tag and create a collection of objects
      const imageLoop = $(`.entry-content .archive-gallery a img`).each(
        (i, el) => {
          //Opening clause for each object
          writeStream.write("     { \n");

          //write data into the json file
          const imageLink = $(el).attr("src");

          console.log(imageLink);
          writeStream.write(`         "image": "${imageLink}" \n`);
          writeStream.write("     }, \n");

          count++;
        }
      );

      console.log("count: ", count);

      //Write closing clauses for the json file
      writeStream.write(" ] \n");
      writeStream.write("} \n");
    }
  }
);

