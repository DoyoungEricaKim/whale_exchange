(function(){

  var country = $("#selectCur>[name=category]>option:selected").val();
  var wantRate = $("#wantKRW").val();
  var period = $("#pdate").val();
  var term = $("#alarmterm").find("[name=term1]:checked").val();
  var form = document.querySelector('form');


  var info = [country, wantRate, period, term];

  var jsonfile = JSON.stringify(info);
  var jsonverb = {};
  var id = jsonverb.length + 1;
  jsonverb[id] = info;
  if(form) {
    form.addEveontListener('change', function(evt){
    var value = jsonverb;
    alert(jsonfile);
    evt.preventDefault();
    whale.storage.sync.set("jsonverb", function() {
      console.log('Value is set to ' + value);
    });
  });
}

  whale.storage.sync.get("id", function(result) {
    console.log("Value currently is " + result.id);
  });
})();
