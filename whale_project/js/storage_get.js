(function(){
  window.onload = function() {
    whale.storage.sync.get("data", function(res) {
      console.table(res.data);
    });
    var  btn = document.querySelector('button');
    btn.addEventListener('click', function(evt){
      alert("Reservations reset");
      clearStorage();
    });
  };
})()

function clearStorage() {
  chrome.storage.sync.set({"data": []}, function() {
    console.log(data);
  });
}
