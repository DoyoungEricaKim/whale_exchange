(function(){
  var  form = document.querySelector('form');
  form.addEventListener('submit', function(evt){
    evt.preventDefault();
    runStorage();
  })
})()

function runStorage() {
  var country = $("#selectCur").val();
  var krw = $("#wantKRW").val();
  var date = $("#pdate").val();
  var testArray=[country, krw, date];

  //exchangeRate: { "USD": [1160, '2018-12-07']}
  // 환율 가져오기

  chrome.storage.sync.set({"test-value": [krw, date]}, function() {
      console.log('insert2');
  });
  /*
  whale.storage.sync.set({country: [krw, date]}, function() {
      console.log('insert');
  });
  */

  /*

  whale.storage.sync.get("test-value", function(res) {
      console.log(res);
  });

  chrome.storage.sync.set({list:testArray}, function() {
      console.log("added to list ", testArray);
      alert("saved");
  });
  alert('44444');
  chrome.storage.sync.get({
    list:[]
  }, function(data) {
    console.log(data.list);
    update(data.list); //storing the storage value in a variable and passing to update function
    alert("saved1");
  }
 );
  */
  // 환율 업데이트 요청
  // 값 가져오기

}
  function updateExchangeRate() {
    // 환율 가져오기
    chrome.storage.sync.set({_country: [_krw, _date]}, function() {

    });
    chrome.storage.sync.set({'USD': [1116, '2018-12-07']}, function() {

    });
  }

  function update(array) {
     array.push("testAdd");
    //then call the set to update with modified value
    chrome.storage.sync.set({
        list:array
    }, function() {
        console.log("added to list with new values", list);
        alert("saved3");
    });
  }


    /*
    whale.storage.sync.get({"results": []}, (data) => {
      let results = data.results;
      alert(results[0]);
      const id = data.length + 1;
      alert(id);
      alert(country);
      alert(krw);
      alert(date);
      results.push({id, country, krw, date});
      whale.storage.sync.set({results}, () => {
        //alert(country);
        //alert(krw);
        //alert(date);
      });
    });
    */
