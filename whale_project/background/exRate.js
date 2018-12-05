const cheerio = require('cheerio');
const request = require('request');

request('https://finance.naver.com/marketindex/exchangeList.nhn', (error, response, html) => {
  let result = [];
  if(!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    //const value = $('.tit').find('.sale');
    $('.tit')
    const exchange = $('.tit').next();

    for(let i = 0; i < 4; i++) {
      let a = $(exchange[i]).text();
      result.push(a);
    }
    console.log(result);
  }
})
