const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require("fs")
const json2csv = require("json2csv").Parser

const getSoftware = async (title,dis) =>{
    const url = `https://alternativeto.net/browse/search?q=top+100`;
    
    // fetch(url)
    //     .then(response=>response.text())
    //     .then(body=>{
    //         console.log(body);
    //     });

    const response = await fetch(url);
    const body = await response.text();
    const $ = cheerio.load(body);


    const software= [];
    $('div[class="col-xs-10 col-sm-10 col-md-11 col-lg-offset-1 col-lg-11"]').each((i,item)=>{
        const $item = $(item);
        const title = $item.find('h3>a*').text().trim();
        const discription = $item.find('p*').text().trim();
        const title_url = $item.find('h3>a*').attr('href');
        const soft = {
            LandingPageUrl:url,
            title,
            discription,
            title_url
        };

        software.push(soft);
    });

    console.log(software);

    const j2cp = new json2csv();
    const csv = j2cp.parse(software);

    fs.writeFileSync("./softwareDetails.csv",csv,"utf-8");
};

getSoftware('','');
