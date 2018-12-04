(function(){
  var krw = document.getElementById('wantKRW'),
  date = document.getElementById('pdate'),
  valueOut = document.getElementById('value-out'),
  form = document.querySelector('form');

  function valueChanged(newValue){
    valueOut.innerText = newValue;
  }

  form.addEventListener('submit', function(evt){
    var value = krw.value;
    var value2 = date.value2;
    evt.preventDefault();
    chrome.storage.sync.set({
      myValue: value,
      myValue2: value2,
      timestamp: Date.now()
    }, function(){
      console.log("krw:"+ value +"date:"+value2);
    });
  });

  chrome.storage.onChanged.addListener(function(changes, namespace){
    if(changes.myValue){
      valueChanged(changes.myValue.newValue);
    }
  });

  chrome.storage.sync.get(
    "myValue", function(result) {
     valueChanged(result.myValue);
  });
})();
