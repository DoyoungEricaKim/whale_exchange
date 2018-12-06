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
var userdetail;

/*
search(url, true).then(function(val){
  console.log("result in search: "+val);
}), function(err){
  console.error("%s; %s", err.message, url);
  console.log("%j", err.res.statusCode);
};
*/

function search(url, json){
  json = json || false;
  return new Promise(function(resolve, reject){
    var result = [];
    request.get({url:url, json:json}, function(err, res, body){
      if(!err && res.statusCode == 200) {
        const $ = cheerio.load(body);
        const exchange = $('.tit').next();

        for(let i = 0; i < 4; i++) {
          let a = $(exchange[i]).text();
          result.push(a);
        }
        console.log("pushed result:"+result);
        resolve(result);

      }

//      resolve(result);
    });
  });
}

function main(){
  var searchPromise = search(url);
  searchPromise.then(function(result1){
    userdetail = result1;
    console.log("Searched user detail:", userdetail);
  }, function(err){
    console.log(err)
  });
}



/*
//fetch
const getDataFetch = url => (
  fetch(url).then(res => res.json())
);

var res = data => {
  for(let key in data){
    if(data.hasOwnProperty(key))
      console.log(`${key}: ${data[key]}`);
  }
};

var promise4 = fetch(url).then(res=>res.json()
  res.json()

);
*/
