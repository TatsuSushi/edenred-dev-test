const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('../public/post.json');

//Write Headers

writeStream.write('{ \n');
writeStream.write(' "animals": [ \n')
request('https://www.oldbookillustrations.com/subjects/animals/'
    , (error, response, html) => {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(html);

            let count = 0;

            const titleLoop = $(`.entry-content .archive-gallery .archive-title a`).each((i, el) => {
                writeStream.write(' { \n');

                const title = $(el).text();
                const link = $(el)
                    .attr('href');

                writeStream.write(`     "title": "${title}", \n     "link": "${link}" \n`);

                // if(i = titleLoop.length -1){
                //     writeStream.write('} \n');
                //
                // } else{
                    writeStream.write(' }, \n');

                //}
                    count++
                console.log('animal count: ', count);
                console.log(`${title}, ${link} \n`);

                });

            writeStream.write(' ] \n');

            writeStream.write(' "images": [ \n')


            const imageLoop = $(`.entry-content .archive-gallery a img`).each((i, el) => {
                writeStream.write(' { \n');

                const imageLink = $(el)
                    .attr('src');


                console.log(imageLink);
                //Write Row to CSV
                writeStream.write(`     "image": "${imageLink}" \n`);

                writeStream.write(' }, \n');

                count++
                console.log('animal count: ', count);
                console.log(`${imageLink} \n`);
            });

            writeStream.write(' ] \n');
            writeStream.write('} \n');

         }
    });

