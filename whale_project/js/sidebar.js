(function(){
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

    resetPage() // 예약 내역 삭제 기능 추가
  })

  $('#id_Clearall').on('click', (event) => {
    event.preventDefault()
    whale.storage.sync.set({"reservationList":[]})
    clearTable()
  })
})()

function

function initialize(){
  function setProperty(selector, prop, msg) {
  //  document.querySelector(selector)[prop] = whale.
  }
}
