(function(){
  window.onload = function() {
    whale.storage.sync.get("data", function(res) {
      var storageVal = res.data;
      if(storageVal) {
        for(var i = 0; i < storageVal.length; i++)
          addTableRow(i);
      }
    });
    $('#clear_btn').on('click', function(){
      clearStorage();
      delTableRowAll();
    });
    $("#delete_btn").click(function() {
      deleteStorage(n);
    });
    $("#table").on("DOMSubtreeModified",function(){
      displayMessage();
    });

    $(document).on('click', ".btn", function() {
      var tmp = $(this).attr('id'),
          idx = parseInt(tmp.substring(0, 1));
      document.getElementById("table").deleteRow(idx+1);
      whale.storage.sync.get("data", function(res) {
        var storageVal = res.data,
            n = idx;
        storageVal.splice(n, 1);
        var len = document.getElementById("table").rows.length;
        for(var i = 1; i < len;i++) {
          document.getElementById("table").deleteRow(1);
        }
        if(storageVal) {
          for(var i = 0; i < storageVal.length; i++){
            _addTableRow(storageVal, i);
          }
        }
        whale.storage.sync.set({"data": storageVal}, function() {
        });
     });
    });
  }
})()

function addTableRow(idx) {
	var len = document.getElementById("table").rows.length,
      table = document.getElementById("table"),
      row = table.insertRow(len), cell1 = row.insertCell(0),
      cell2 = row.insertCell(1), cell3 = row.insertCell(2),
      cell4 = row.insertCell(3), cell5 = row.insertCell(4),
      country, wantKRW, date, nowCur,
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
  $.get("http://api.kimtree.net/exchange/", function( data ) {
    nowCur = data[country];
    cell3.innerHTML = nowCur;
  });
  del_btn = document.createElement("button");
  del_btn.className = "btn btn-light btn-sm";
  del_btn.type = "button";
  del_btn.id = idx + "delete_btn";
  del_btn.innerHTML = 'X';
  cell5.appendChild(del_btn);
}
function _addTableRow(val, idx) {
	var len = document.getElementById("table").rows.length,
      table = document.getElementById("table"),
      row = table.insertRow(len), cell1 = row.insertCell(0),
      cell2 = row.insertCell(1), cell3 = row.insertCell(2),
      cell4 = row.insertCell(3), cell5 = row.insertCell(4),
      country, wantKRW, date, nowCur,
      del_btn = document.createElement("button");
    country = val[idx][0];
    wantKRW = val[idx][1];
    date = val[idx][2];
    cell1.innerHTML = country;
    cell2.innerHTML = wantKRW;
    cell4.innerHTML = date;
  $.get("http://api.kimtree.net/exchange/", function( data ) {
    nowCur = data[country];
    cell3.innerHTML = nowCur;
  });
  del_btn = document.createElement("button");
  del_btn.className = "btn btn-light btn-sm";
  del_btn.type = "button";
  del_btn.id = idx + "delete_btn";
  del_btn.innerHTML = 'X';
  cell5.appendChild(del_btn);
}

function delTableRow(idx) {
	document.getElementById("table").deleteRow(idx);
}

function delTableRowAll() {
  var len = document.getElementById("table").rows.length;
  for(var i = 1; i < len;i++) {
	   document.getElementById("table").deleteRow(1);
   }
}

function updateTable() {
  whale.storage.sync.get("data", function(res) {
    var storageVal = res.data;
    if(storageVal) {
      for(var i = 0; i < storageVal.length; i++) {
        addTableRow(i);
      }
    }
  })
}

function clearStorage() {
  chrome.storage.sync.set({"data": []}, function() {
  });
}

function deleteStorage(n) {
  whale.storage.sync.get("data", function(res) {
    var a = res.data;
    a.splice(n, 1); //n번째 값 remove
    whale.storage.sync.set({"data": a}, function() {
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
