/*

$('#checkb').on('click', (event) => {
  event.preventDefault()
  window.location.href = "check.html"
})
*/
const request = require('request');
const cheerio = require('cheerio');
const rp = require('request-promise');
let url = "https://finance.naver.com/marketindex/exchangeList.nhn";

/*
module.exports.find = function(){
  return new Promise(function(resolve, reject){
    let url = "https://finance.naver.com/marketindex/exchangeList.nhn";
    var result = [];
    request({
      url, json:true}, function(error, response, body){
  //    let result = [];
      if(!error && response.statusCode == 200) {
        const $ = cheerio.load(body);
        //const value = $('.tit').find('.sale');
        const exchange = $('.tit').next();

        for(let i = 0; i < 4; i++) {
          let a = $(exchange[i]).text();
          result.push(a);
        }
      }
      console.log("request:" + result);
      resolve(result);
    });
    console.log(result);
  });

};

var result1 = search();
console.log("result1: "+ result1);

*/

search(url, true).then(function(val){
  console.log("result in search: "+val);
}, function(err){
  console.error("%s; %s", err.message, url);
  console.log("%j", err.res.statusCode);
});

function search(url, json){
  json = json || false;
  return new Promise(function(resolve, reject){
    var result = [];
    request({url:url, json:json}, function(err, res, body){
      if(!err && res.statusCode == 200) {
        const $ = cheerio.load(body);
        //const value = $('.tit').find('.sale');
        const exchange = $('.tit').next();

        for(let i = 0; i < 4; i++) {
          let a = $(exchange[i]).text();
          result.push(a);
        }
      }
      console.log("first result:"+result);
      resolve(result);
    });
  });
}

/*
find = function(data, callback){
  var final_data =
}
module.exports.passfunc(resultRate) = function passfunc(resultRate){
  return callback(resultRate)
}
*/
