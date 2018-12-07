(function(){
    window.onload = function(evt) {
      alert("HO!");
      whale.storage.sync.get("test-value", function(res) {
          console.log(res);
      });
  };
})()
/*
  let tableLoaded = false;

  function loadTable() {
    // Dont load table again if already loaded elements
    if (tableLoaded) {
      return;
    }
    const table = $('#table').DataTable({
        paging: false,
        searching: false,
        responsive: true,
        ordering: true,
        info: false,
        data: [],
        columns: [
          { data: "id"},
          { data: "country"},
          { data: "krw"},
          { data: "date"},
          { render: function() {
            return "<i class='fa fa-arrows move' style='margin-right:30px'></i><i class='fa fa-times delete' style='color:#dc3545'></i>"
          }}
        ],
        columnDefs: [
          { targets: 0, visible: false},
          { targets: '_all', orderable: false}
        ],
        order: [
          [0, "asc"]
        ],
        "fnDrawCallback": function(oSettings) {
          $("i.fa.fa-times.delete").click(function(event) {
            removeTableRow($(this).closest("tr"))
          });
        }
    })
    whale.storage.sync.get({"results": []}, (result) => {
      result.results.forEach((resultset) => {
        console.log("sync.get line68");
        addTableRow(resultset.id, resultset.country, resultset.krw, resultset.date, table)
      })
    })

    table.on('row-reorder', (e, diff, edit) => {
      if (diff.length === 0)
        return

      updateIdsInStorage(diff)
    })

    tableLoaded = true
  }

  function addTableRow(id, country, krw, date, table = undefined) {
    if(!table)
      table = $('#table').DataTable({retrieve: true});
    table.row.add({
      "id": id,
      "country": country,
      "krw": krw,
      "date": date
    }).draw()
  }

  function removeFromStorage(country, krw, date) {
    whale.storage.sync.get({"results": []}, (result) => {
      let results = result.results;
      results = results.filter((resultset) => {
        return resultset.country != country && resultset.krw != krw && resultset.date != date;
      });
      whale.storage.sync.set({results});
    })
  }

  function addToStorage({id, country, krw, date}) {
    whale.storage.sync.get({"results": []}, (result) => {
      let results = result.results;
      results.push({id, country, krw, date});
      whale.storage.sync.set({results});
    })
  }


  async function updateIdsInStorage(diff) {
    oldObjects = {}
    diff.forEach((item) => {
        oldObjects[item.oldData] = {newid: item.newData}
    })

    whale.storage.sync.get({"results": []}, (result) => {
      let wordlist = result.wordlist

      results.forEach((resultset) => {
        if (oldObjects.hasOwnProperty(resultset.id)) {
          resultset.id = oldObjects[resultset.id].newid
        }
      })

      whale.storage.sync.set({results})
    })
  }
  whale.storage.sync.get(null, function(items) {
    //document.getElementById('check_wantKRW').innerHTML = items.myValue;
    console.log(items.myValue);
    console.log(items.myValue2);
    console.log(items.myValue3);
    //alert(items.myValue2);
    //alert(items.myValue3);
  });







/*
  chrome.storage.sync.remove(['myValue', 'myValue2', 'myValue3'], function(Items) {
        alert("removed");

        chrome.storage.sync.get(function(Items) {
            $.each(Items, function(index, value)
            {
                alert(index);
            });
        });
    });
*/
  //document.getElementById('check_wantKRW').innerHTML = items.myValue;

/* this is storage.js backup
(function(){
  var _krw = document.getElementById('wantKRW'),
      _country = document.getElementById('selectCur'),
      _date = document.getElementById('pdate'),
      form = document.querySelector('form');
  var country = $('#selectCur').val(),
      krw = $('#wantKRW').val();
      date = $('#pdate').val();
      loadTable();
  form.addEventListener('submit', function(evt){
    evt.preventDefault();
    whale.storage.sync.get({"results": []}, (data) => {
      let results = data.results;
      const id = data.length + 1;
      results.push({id, country, krw, date});
      whale.storage.sync.set({results}, () => {
        alert(results);
        //addTableRow(id, country, krw, date);
    //whale.storage.sync.set({'myValue': value, 'myValue2': value2,'myValue3': value3}, function(){
      //alert(country);
      //alert(value2);
      //alert(value3);
      //alert("data saved");
      });
    });
  });

  if (country !== "" && krw !== "" && date !== "") {
    whale.storage.sync.get({"results": []}, (data) => {
      let results = data.results;
      const id = data.length + 1;
      results.push({id, country, krw, date});
      whale.storage.sync.set({results}, () => {
        addTableRow(id, country, krw, date);
      })
    })
  }
})();

var tableLoaded = false;

function loadTable() {
  console.log("loadTable line33");
  if (tableLoaded) {
    return;
  }
  const table = $('#table').DataTable({
      paging: false,
      searching: false,
      responsive: true,
      ordering: true,
      info: false,
      data: [],
      columns: [
        { data: "id"},
        { data: "country"},
        { data: "krw"},
        { data: "date"},
        { render: function() {
          return "<i class='fa fa-arrows move' style='margin-right:30px'></i><i class='fa fa-times delete' style='color:#dc3545'></i>"
        }}
      ],
      columnDefs: [
        { targets: 0, visible: false},
        { targets: '_all', orderable: false}
      ],
      order: [
        [0, "asc"]
      ],
      "fnDrawCallback": function(oSettings) {
        $("i.fa.fa-times.delete").click(function(event) {
          removeTableRow($(this).closest("tr"))
        });
      }
  })
  whale.storage.sync.get({"results": []}, (result) => {
    result.results.forEach((resultset) => {
      console.log("sync.get line79");
      addTableRow(resultset.id, resultset.country, resultset.krw, resultset.date, table)
    })
  })

  table.on('row-reorder', (e, diff, edit) => {
    if (diff.length === 0)
      return

    updateIdsInStorage(diff)
  })

  tableLoaded = true
}

let lastResult = null
function removeTableRow(row) {
  let results = []
  row.children().each(function() {
    results.push($(this).text())
  })

  if (JSON.stringify(results) == JSON.stringify(lastResult))
    return

  removeFromStorage(results[0], results[1], results[2])
  //not sure whether removeFromStorage parameters are correct
  $('#table').DataTable({retrieve: true}).row(row).remove().draw()

  lastResult = results;
}

function addTableRow(id, country, krw, date, table = undefined) {
  if(!table)
    table = $('#table').DataTable({retrieve: true});
  table.row.add({
    "id": id,
    "country": country,
    "krw": krw,
    "date": date
  }).draw()
}

function removeFromStorage(country, krw, date) {
  whale.storage.sync.get({"results": []}, (result) => {
    let results = result.results;
    results = results.filter((resultset) => {
      return resultset.country != country && resultset.krw != krw && resultset.date != date;
    });
    whale.storage.sync.set({results});
  })
}

function addToStorage({id, country, krw, date}) {
  whale.storage.sync.get({"results": []}, (result) => {
    let results = result.results;
    results.push({id, country, krw, date});
    whale.storage.sync.set({results});
  })
}


async function updateIdsInStorage(diff) {
  oldObjects = {}
  diff.forEach((item) => {
      oldObjects[item.oldData] = {newid: item.newData}
  })

  whale.storage.sync.get({"results": []}, (result) => {
    let wordlist = result.wordlist

    results.forEach((resultset) => {
      if (oldObjects.hasOwnProperty(resultset.id)) {
        resultset.id = oldObjects[resultset.id].newid
      }
    })

    whale.storage.sync.set({results})
  })
}


/*

chrome.storage.sync.get(null, function(items) {

  //alert(items.myValue);
  //alert(items.myValue2);
  //alert(items.myValue3);
});

  chrome.storage.onChanged.addListener(function(changes, namespace){
    if(changes.myValue){
      valueChanged(changes.myValue.newValue);
    }
  });
  /*
      var value = country.value;
      var value2 = krw.value;
      var value3 = date.value;
      var obj = {};
      var id = parseInt(0);

  chrome.storage.sync.set(obj, function(){
    obj[id] = [country.value, krw.value, date.value];
    id++;
    console.log(id);
    alert("data saved");
  });

  chrome.storage.sync.get(null, function(items) {
    console.log("id: " + id);
    for(var i = 0; i < id; i++) {
      alert(items[i]);
    }
  });

*/
