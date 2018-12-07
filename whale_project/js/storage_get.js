(function(){
  window.onload = function() {
    whale.storage.sync.get("data", function(res) {
      console.table(res.data);
    });
    $('#clear_btn').on('click', function(evt){
      alert("Reservations reset");
      clearStorage();
    });
    $("#delete_btn").click(function(event) {
      alert("Reservation deleted");
      deleteStorage();
    });
  };
})()

function clearStorage() {
  chrome.storage.sync.set({"data": []}, function() {
    console.log(data); //확인용, 나중에 지울 것
  });
}

function deleteStorage() {
  whale.storage.sync.get("data", function(res) {
    var a = res.data,
        n = 0;
    a.splice(n, 1); //n번째 값 remove
    whale.storage.sync.set({"data": a}, function() {
        console.table(a); //확인용, 나중에 지울 것
    });
  });
}
