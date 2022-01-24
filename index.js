const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();


const newspapers = [
    {
        name: 'thetimes',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: 'https://www.thetimes.co.uk'
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-change',
        base: 'https://www.theguardian.co.uk'
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegrahp.co.uk'
    }
]
const storage = [];

newspapers.forEach(newspaper =>{
    axios.get(newspaper.address)
        .then(response =>{
            const html = response.data;
            const $ = cheerio.load(html);

            $('a:contains("climate")', html).each(function(){
                const title = $(this).text();
                const url = $(this).attr('href');
                storage.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })
        }).catch(err =>console.log(err));

})

app.get('/', (req, res)=>{
    res.json('Welcome to my Climate Change News API')
})
app.get('/newspaper', (req, res)=>{
    res.json(storage);
})

app.get('/news/:newspaperId', async (req, res)=>{
    const newspaperId = req.params.newspaperId
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name == newspaperId)[0].address
    console.log(newspaperAddress);
})
app.get('/news', (req, res)=>{
    // axios.get('https://www.theguardian.com/us/environment')
    //     .then((response)=>{
    //         const html = response.data
    //         // console.log(html)
    //         const $ = cheerio.load(html);
    //         $('a:contains("climate")', html).each(function (){
    //             const title = $(this).text();
    //             const url = $(this).attr('href');
    //             storage.push({
    //                 title,
    //                 url
    //             })
    //         })
    //         res.json(storage);
    //     }).catch((err)=> console.log(err));
})
app.listen(PORT, () =>
console.log(`server is running on PORT ${PORT}`));
