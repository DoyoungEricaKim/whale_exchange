(function(){
  window.onload = function() {
    whale.storage.sync.get("data", function(res) {
      var storageVal = res.data;
      console.table(res.data);
      console.table(storageVal);
      if(storageVal) {
        for(var i = 0; i < storageVal.length; i++)
          addTableRow(i);
      }
    });
    $('#clear_btn').on('click', function(){
      alert("Reservations reset");
      clearStorage();
      delTableRowAll();
    });
    $("#delete_btn").click(function() {
      alert("Reservation deleted");
      deleteStorage(n);
    });
    // $("#add").click(function() {
    //   alert("adding table");
    //   addTableRow();
    // });
    $("#del").click(function() {
      alert("deleted table");
      delTableRow();
    });
    $("#table").on("DOMSubtreeModified",function(){
      displayMessage();
    });

  };
})()

function addTableRow(idx) {
	var len = document.getElementById("table").rows.length,
      table = document.getElementById("table"),
      row = table.insertRow(len), cell1 = row.insertCell(0),
      cell2 = row.insertCell(1), cell3 = row.insertCell(2),
      cell4 = row.insertCell(3), cell5 = row.insertCell(4),
      cell6 = row.insertCell(5), country, wantKRW, nowCur = "___",
      date, status = "진행중",
      del_btn = document.createElement("button");
  whale.storage.sync.get("data", function(res) {
    var val = res.data;
    country = val[idx][0];
    wantKRW = val[idx][1];
    date = val[idx][2];
    cell1.innerHTML = country;
    cell2.innerHTML = wantKRW;
    cell4.innerHTML = date;
  });
  del_btn.className = "btn btn-light btn-sm";
  del_btn.idName = "delete_btn";
  del_btn.innerHTML = 'X';
  cell3.innerHTML = nowCur;
  cell5.innerHTML = status;
  cell6.appendChild(del_btn);
}

function delTableRow() {
  //지우고픈 row 번호 알아와서 1 대신 넣기
  var n = 1;//
	document.getElementById("table").deleteRow(n);
}

function delTableRowAll() {
  var len = document.getElementById("table").rows.length;
  for(var i = 1; i < len;i++) {
	   document.getElementById("table").deleteRow(1);
   }
}

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

function displayMessage(){
  var no_reserve = document.getElementById("no_reserve"),
      len = document.getElementById("table").rows.length;
  if(len == 1){
    no_reserve.style.display ='block';
  }else{
    no_reserve.style.display ='none';
  }
}
