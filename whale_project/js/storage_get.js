(function(){
  window.onload = function() {
    whale.storage.sync.get(null, function(items) {
      //console.log(items.myValue);
      //alert(items.myValue2);
      //alert(items.myValue3);
    });
  };

  //document.getElementById('check_wantKRW').innerHTML = items.myValue;
})()
