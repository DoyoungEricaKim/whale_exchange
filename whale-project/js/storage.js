(function(){
  whale.storage.sync.get("data", function(res) {
  if(!res.data) {
    var a = res.data;
    whale.storage.sync.set({"data": []}, function() {
    });
  }
  });
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
  whale.storage.sync.get("data", function(res) {
    if(res.data == res.data || res.data == []) {
      res.data.push(arr);

      whale.storage.sync.set(res);
    }
  });
}
