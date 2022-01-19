const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

const storage = [];

app.get('/', (req, res)=>{
    res.json('Welcome to my Climate Change News API')
})
app.get('/news', (req, res)=>{
    axios.get('https://www.theguardian.com/us/environment')
        .then((response)=>{
            const html = response.data
            // console.log(html)
            const $ = cheerio.load(html);
            $('a:contains("climate")', html).each(function (){
                const title = $(this).text();
                const url = $(this).attr('href');
                storage.push({
                    title,
                    url
                })
            })
            res.json(storage);
        }).catch((err)=> console.log(err));
})
app.listen(PORT, () =>
console.log(`server is running on PORT ${PORT}`));
