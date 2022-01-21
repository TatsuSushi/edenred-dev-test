const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('../public/image.json');

//Write Headers

writeStream.write('{ \n');
writeStream.write('"animals": [')
request('https://www.oldbookillustrations.com/subjects/animals/'
    , (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            let count = 0;

            const imageLoop = $(`.entry-content .archive-gallery a img`).each((i, el) => {

                writeStream.write('{ \n');
                const imageLink = $(el)
                    .attr('src');

                console.log(imageLink);
                //console.log(title);
                //Write Row to CSV
                writeStream.write(`"image": "${imageLink}" \n`);
                writeStream.write('}, \n');

                count++;
            });

            console.log('count: ', count);
            writeStream.write('] \n');
            writeStream.write('} \n');
        }
    });

