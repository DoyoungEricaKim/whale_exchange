(function(){
  var  form = document.querySelector('form');

  form.addEventListener('submit', function(evt){
    evt.preventDefault();
    runStorage();
  })

})()

function runStorage() {
  var country = $("#selectCur").val(),
      krw = $("#wantKRW").val(),
      date = $("#pdate").val(),
      arr = [country, krw, date];
  whale.storage.sync.get("data", function(res) {
    console.log('insert');
    if(res) {
      res.data.push(arr);
      var a = res.data;
      console.table(res.data);
      console.log('insert4');
      whale.storage.sync.set({"data": a}, function() {
          console.log('insert2');
          console.table(a);
      });
    }
  });
}
