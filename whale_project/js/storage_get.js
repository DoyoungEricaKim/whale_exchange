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
    $("#table").on("DOMSubtreeModified",function(){
      displayMessage();
    });

    $(document).on('click', ".btn", function() {
      alert("button click");
      var tmp = $("button[id$='_btn']").attr('id'),
          idx = parseInt(tmp.substring(0, 1));
      // delTableRow(idx+1);
      // alert('단계1');
      // delTableRowAll();
      // //alert('단계2');
      // updateTable();
      // alert('단계2');
    });
  }
})()

function addTableRow(idx) {
	var len = document.getElementById("table").rows.length,
      table = document.getElementById("table"),
      row = table.insertRow(len), cell1 = row.insertCell(0),
      cell2 = row.insertCell(1), cell3 = row.insertCell(2),
      cell4 = row.insertCell(3), cell5 = row.insertCell(4),
      cell6 = row.insertCell(5), country, wantKRW, date,
      status = "진행중", nowCur,
      del_btn = document.createElement("button");
  whale.storage.sync.get("data", function(res) {
console.log("change2");
    var val = res.data;
    country = val[idx][0];
    wantKRW = val[idx][1];
    date = val[idx][2];
    cell1.innerHTML = country;
    cell2.innerHTML = wantKRW;
    cell4.innerHTML = date;
  });
  $.get("http://api.kimtree.net/exchange/", function( data ) {
    nowCur = data[country];
    cell3.innerHTML = nowCur;
  });
  del_btn = document.createElement("button");
  del_btn.className = "btn btn-light btn-sm";
  del_btn.type = "button";
  del_btn.id = idx + "delete_btn";
  del_btn.innerHTML = 'X';
  cell5.innerHTML = status;
  cell6.appendChild(del_btn);
}

function delTableRow(idx) {
	document.getElementById("table").deleteRow(idx);
  deleteStorage(idx);
}

function delTableRowAll() {
  var len = document.getElementById("table").rows.length;
  for(var i = 1; i < len;i++) {
	   document.getElementById("table").deleteRow(1);
   }
}

// function delTableRowBtn() {
//   var len = document.getElementById("table").rows.length;
//   for(var i = 1; i < len-1;i++) {
// 	   document.getElementById("table").deleteRow(1);
//    }
// }

function updateTable() {
  whale.storage.sync.get("data", function(res) {
    var storageVal = res.data;
    console.log("change1");
    // console.table(res.data);
    // console.table(storageVal);
    if(storageVal) {
      for(var i = 0; i < storageVal.length; i++) {
        //alert("idx: " + i);
        addTableRow(i);
      }
    }
  });
}

function clearStorage() {
  chrome.storage.sync.set({"data": []}, function() {
    console.log(data); //확인용, 나중에 지울 것
  });
}

function deleteStorage(idx) {
  whale.storage.sync.get("data", function(res) {
    console.log("change3");
    var a = res.data,
        n = idx;
    a.splice(n, 1);
    whale.storage.sync.set({"data": a}, function() {
      console.log("change4");
        // console.table(a); //확인용, 나중에 지울 것
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
