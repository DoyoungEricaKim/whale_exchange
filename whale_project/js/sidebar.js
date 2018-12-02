(function(){
  initialize()

  $('#id_complete_button').on('click',(event)=>{
    event.preventDefault()

    country = $('#selectCur').val()
    wantRate = $('#wantKRW').val()
    period = $('pdate').val()
    term = $('alarmterm').val()

    if(country !== "외화"){
      whale.storage.sync.get({"reservationList": []}, (result) => {
        let reservationList = result.reservationList
        const id = reservationList.length + 1
        reservationList.push({id, country, wantRate, period, term})
        whale.storage.sync.set({reservationList}, () => {
          addRowToTable(id, country, wantRate, period, term)
        })
      })
    }

  //  resetinfo() // 예약 내역 삭제 기능 추가
  })

  $('#id_Clearall').on('click', (event) => {
    event.preventDefault()
    whale.storage.sync.set({"reservationList":[]})
    clearSheet()
  })
})()

let sheetload = false

function loadSheet(){
  if(sheetload)
    return

  const sheet = $('#sheet').DataTable({
    rowReorder: {
      selector: "i.fa.fa-arrows.move",
      dataSrc: "id"
    },
    paging: false,
    searching: false,
    responsive: true,
    ordering: false,
    info: false,
    data: [],
    columns: [
      { data: "id"},
      { data: "country, wantRate, period, term"},
      { render: function() {
        return "<i class='fa fa-times delete' style='color:#dc3545'></i>"
      }}
    ],
    columnDefs: [
      { targets: 0, visible: false},
    ],
    "fnDrawCallback": function(settings) {
      $("i.fa.fa-times.delete").click(function(event) {
        removeRowFromTable($(this).closest("tr"))
      });
    }
  })
  whale.storage.sync.get({"reservationList": []}, (result) => {
    // Not the most efficient but only way I can get it working for some reason
    result.reservationList.forEach((reservpair) => {
      addRowToTable(reservpair.id, reservpair.country, reservpair.wantRate, reservpair.period, reservpair.term table)
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
    reserve.push($(this).test())
  })

  if (JSON.stringify(reserve) == JSON.stringify(finalReserv))
    return
  deletefromStorage(reserve[0], reserve[1])
  $('#sheet').DataTable({retrieve: true}).row(row).remove().draw()

  finalReserv = reserve
}

function plusLine(id, country, wantRate, period, term = undefined) {
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

function deletefromStorage(id, country, wantRate, period, term){
  whale.storage.sync.get({"reservationList": []}, (result) => {
    let reservationList = reservationList.filter((reservpair) => {
      return reservpair.
    })
  })
}


function plusStorage({id, country, wantRate, period, term}){
  whale.storage.sync.get({"reservationList": []}, (result) => {
    let reservationList = result.reservationList
    reservationList.push({id, country, wantRate, period, term})
    whale.storage.sync.set({reservationList})
  })
}

// async function updateIdsInStorage(diff)는 우선 빼둠

function initialize(){
  function setProperty(selector, prop, msg) {
  //  document.querySelector(selector)[prop] = whale.
  }
}
