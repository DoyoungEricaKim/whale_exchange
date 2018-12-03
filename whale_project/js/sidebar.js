(function(){

  var country = $("#selectCur>[name=category]>option:selected").val();
  var wantRate = $("#wantKRW").val();
  var period = $("#pdate").val();
  var term = $("#alarmterm").find("[name=term1]:checked").val();
  var form = document.querySelector('form');

  var id = reservlist.length + 1;
  var info = [country, wantRate, period, term];
//  var jsonfile = JSON.stringify(info);
  var jsonverb =  {};
  jsonverb[id] = info;
form.addEventListener('submit', function(evt){
  var value = jsonverb;
  evt.preventDefault();
  whale.storage.sync.set("jsonverb", function() {
    console.log('Value is set to ' + value);
  });
});

  whale.storage.sync.get(['id'], function(result) {
    console.log('Value currently is ' + result.id);
  });
})();
