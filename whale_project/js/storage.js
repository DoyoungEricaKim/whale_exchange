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
    console.log('insert'); //확인용, 나중에 지울 것
    if(res) {
      res.data.push(arr);
      var a = res.data;
      console.table(res.data); //확인용, 나중에 지울 것
      console.log('insert4'); //확인용, 나중에 지울 것
      whale.storage.sync.set({"data": a}, function() {
          console.log('insert2'); //확인용, 나중에 지울 것
          console.table(a); //확인용, 나중에 지울 것
      });
    }
  });
}
