(function(){
  var _krw = document.getElementById('wantKRW'),
      _country = document.getElementById('selectCur'),
      _date = document.getElementById('pdate'),
      form = document.querySelector('form');

    window.onload = function(evt) {
      alert("HO!");
      evt.preventDefault();
      loadTable();
      //var country = _country.value,
      //    krw = _krw.value;
      //    date = _date.value;
      whale.storage.sync.get({"results": []}, (data) => {
        let results = data.results;
        const id = data.length + 1;
        results.push({id, country, krw, date});
        whale.storage.sync.set({results}, () => {

          alert(country);
          alert(krw);
          alert(date);
          addTableRow(id, country, krw, date);
        });
      });

  };

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
})()
