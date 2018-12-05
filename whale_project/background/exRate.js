/*

$('#checkb').on('click', (event) => {
  event.preventDefault()
  window.location.href = "check.html"
})
*/
const express = require('express');
const cheerio = require('cheerio');
const request = require('request');

find = function(callback){
  var result = [];
  request('https://finance.naver.com/marketindex/exchangeList.nhn', (error, response, html) => {
//    let result = [];
    if(!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      //const value = $('.tit').find('.sale');
      const exchange = $('.tit').next();

      for(let i = 0; i < 4; i++) {
        let a = $(exchange[i]).text();
        result.push(a);
      }
    }
    console.log("request:" + result);
  });
  console.log(result);
  callback(result);
}

/*
find = function(data, callback){
  var final_data =
}

var result1 = findRate();
console.log(result1);


/*
module.exports.passfunc(resultRate) = function passfunc(resultRate){
  return callback(resultRate)
}
*/
