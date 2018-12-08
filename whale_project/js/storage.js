(function(){
  var  form = document.querySelector('form');
  form.addEventListener('submit', function(evt){
    evt.preventDefault();
    runStorage();
  });
})()

function runStorage() {
  var country = $("#selectCur").val(),
      krw = $("#wantKRW").val(),
      date = $("#pdate").val(),
      arr = [country, krw, date];
      var data;
      Load(data, arr);
}


function saveResults(data, resultArray){
  var key = data.toString();
  key = 'a'.key;
  chrome.storage.local.set({key : resultArray});
  console.log('insert2');
  console.table(a);
}

function Load(data, arr) {
  var key = data.toString();
  key = 'a'.key;
  chrome.storage.local.get(key, function(res){
    console.debug('result: ', res.key);

    if(res){
      res.data.push(arr);
      var a = res.data;
      console.table(res.data);
      saveResults(data, a);
    }
  });

}
