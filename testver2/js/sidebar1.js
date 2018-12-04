(function(){
//  initialize()
  loadSheet()

  $('#id_complete_button').on('click',(event)=>{
    event.preventDefault()

    country = $('#selectCur').val()
    wantRate = $('#wantKRW').val()
    period = $('pdate').val()
    term = $('alarmterm').val()

    if(country !== "" && wantRage !=="") {
      chrome.storage.sync.get({"reservationList": []}, (result) => {
        let reservationList = result.reservationList
        const id = reservationList.length + 1
        reservationList.push({id, country, wantRate, period, term})
        chrome.storage.sync.set({reservationList}, () => {
          addRowToTable(id, country, wantRate, period, term)
        })
      })
    }

  resetPage()
  })

  $('#id_Clearall').on('click', (event) => {
    event.preventDefault()
    chrome.storage.sync.set({"reservationList":[]})
    clearSheet()
  })
})()
$(document).ready( function () {
    $('#myTable').DataTable();
} );
//let sheetload = false

function loadSheet(){

  const sheet = $('#sheet').DataTable({
    paging: false,
    searching: false,
    responsive: true,
    ordering: false,
    info: false,
    data: [],
    columns: [
      { data: "id"},
      { data: "country, wantRate, period, term"},
    ],
    columnDefs: [
      { targets: 0, visible: false},
    ],
    "fnDrawCallback": function(settings) {
      $("i.fa.fa-times.delete").click(function(event) {
        deleteReserv1($(this).closest("tr"))
      });
    }
  })

  chrome.storage.sync.get({"reservationList": []}, (result) => {
    // Not the most efficient but only way I can get it working for some reason
    result.reservationList.forEach((reservpair) => {
      addRowToTable(reservpair.id, reservpair.country, reservpair.wantRate, reservpair.period, reservpair.term, sheet)
    })
  })

  sheetload = true
}

function clearSheet() {
  $('#sheet').DataTable({retrieve: true}).clear().draw()
}

let finalReserv = null

function deleteReserv1(row){
  let reserve = []
  row.children().each(function(){
    reserve.push($(this).text())
  })

  if (JSON.stringify(reserve) == JSON.stringify(finalReserv))
    return

//  deletefromStorage(reserve[0], reserve[1], reserve[2], reserve[3])
//  $('#sheet').DataTable({retrieve: true}).row(row).remove().draw()

  finalReserv = reserve
}

function addRowToTable(id, country, wantRate, period, term = undefined) {
  if(!sheet){
    sheet = $('#sheet').DataTable({retrieve: true})
  }
  sheet.row.add({
    "id": id,
    "country" : country,
    "wantRate" : wantRate,
    "period" : period,
    "term" : term
  }).draw()
}

function resetPage(){
  $('#selectCur').val("")
  $('#wantKRW').val("")
  $('#period').val("")
  $('#alarmterm').val("")

}
/*
function deletefromStorage(id){
  whale.storage.sync.remove('id', function(){

  }
}
*/

function plusStorage({id, country, wantRate, period, term}){
  chrome.storage.sync.get({"reservationList": []}, (result) => {
    let reservationList = result.reservationList
    reservationList.push({id, country, wantRate, period, term})
    chrome.storage.sync.set({reservationList})
  })
}



/*
function initialize(){
  function setProperty(selector, prop, msg) {
  //  document.querySelector(selector)[prop] = whale.
  }
}
*/
