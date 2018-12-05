(function(){
  var krw = document.getElementById('wantKRW'),
  country = document.getElementById('selectCur'),
  date = document.getElementById('pdate'),
  form = document.querySelector('form');

  form.addEventListener('submit', function(evt){
    var value = country.value;
    var value2 = krw.value;
    var value3 = date.value;

    evt.preventDefault();
    chrome.storage.sync.set({'myValue': value, 'myValue2': value2,'myValue3': value3}, function(){
      //alert(value);
      //alert(value2);
      //alert(value3);
      //alert("data saved");
    });

    chrome.storage.sync.get(null, function(items) {
      //alert(items.myValue);
      //alert(items.myValue2);
      //alert(items.myValue3);
    });

});
/*
  chrome.storage.onChanged.addListener(function(changes, namespace){
    if(changes.myValue){
      valueChanged(changes.myValue.newValue);
    }
  });

*/
})();
