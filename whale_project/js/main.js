(function () {

<<<<<<< HEAD
      $('#id_reserv').on('click', (event) => {
        event.preventDefault()
        window.location.href = "index.html";
      })
      $('#id_check').on('click', (event) => {
        event.preventDefault()
        window.location.href = "check.html";
      })
      $('#conf').on('click', (event) => {
        event.preventDefault()
        window.location.href = "index.html";
      })
      $('#checkinfo').on('click', (event) => {
        event.preventDefault()
        window.location.href = "check.html";
      })
      //var callSelectCur = document.getElementById("selectCur");
      $("#selectCur").on('click', (event) => {
        event.preventDefault();
        //var callSelectCur = $(this).val();
        selectCur();
      })

      var toConfirmPage = document.getElementById("reservform");
      if (toConfirmPage) {
        toConfirmPage.addEventListener('submit', function(evt) {
            alert("hey it works");
            evt.preventDefault();
            window.location.href= "confirm.html";
        })
      }

})()
=======
  whale.runtime.sendMessage({sidebarOpened: true})

  whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  })

  whale.sidebarAction.onClicked.addListener((result) => {
    //siderbar 열렸을때 초기 설정
  })

  $('#pdate').on('change', (event) => {
    countCheck();
  })
  $('#pdate').on('click', (event) => {
    blockCal();
  })
  $('#id_reserv').on('click', (event) => {
    event.preventDefault()
    window.location.href = "index.html"
  })
  $('#id_check').on('click', (event) => {
    event.preventDefault()
    window.location.href = "check.html"
  })
  $('#conf').on('click', (event) => {
    event.preventDefault()
    window.location.href = "index.html"
  })
  $('#checkinfo').on('click', (event) => {
    event.preventDefault()
    window.location.href = "check.html"
  })
  var callSelectCur = document.getElementById("selectCur");
  if(callSelectCur) {
    callSelectCur.addEventListener('click', function(evt) {
      evt.preventDefault();
      selectCur();
    })
  }

  var toConfirmPage = document.getElementById("reservform");
  if(toConfirmPage) {
    toConfirmPage.addEventListener('submit', function(evt) {
      //var formCheck = $("#reservform");
        evt.preventDefault();
        window.location.href= "confirm.html"
    })
  }
>>>>>>> b1788e0aaafce5d7a49a818a99631411266e9c5e

/* wantKRW 받아 올때 쓸 addEventListener
  var test2 = document.getElementById("wantKRW");
  test2.addEventListener('change', selectCur())
*/

function selectCur() {
  var USD = "USD", _USD = "1 달러", JPY = "JPY", _JPY = "1 엔", EUR = "EUR",
      _EUR = "1 유로", CNY = "CNY", _CNY = "1 위안";
  var option = document.getElementById("selectCur").value;
  if(option == "USD") {
    document.getElementById("ForeignCur").value = USD + "  " + _USD;
    document.getElementById("ForeignCur1").value = USD + "  " + _USD;
    $.get("http://api.kimtree.net/exchange/", setData1);
  } else if (option == "JPY") {
    document.getElementById("ForeignCur").value = JPY + "  " + _JPY;
    document.getElementById("ForeignCur1").value = JPY + "  " + _JPY;
    $.get("http://api.kimtree.net/exchange/", setData2);
  } else if (option == "EUR") {
    document.getElementById("ForeignCur").value = EUR + "  " + _EUR;
    document.getElementById("ForeignCur1").value = EUR + "  " + _EUR;
    $.get("http://api.kimtree.net/exchange/", setData3);
  } else if (option == "CNY") {
    document.getElementById("ForeignCur").value = CNY + "  " + _CNY;
    document.getElementById("ForeignCur1").value = CNY + "  " + _CNY;
    $.get("http://api.kimtree.net/exchange/", setData4);
  }
}

function countCheck() {
  var s = document.getElementById("pdate").value;
  var theday = new Date(s);
  var today = new Date();
  var diff = theday.getTime() -  today.getTime();
  var days = Math.floor(diff/(1000*60*60*24) + 1);
  var reserveDay = new Date(s).getTime();
  return reserveDay;
}

function blockCal (){
  var tmp = new Date();
  var day = tmp.getDate();
  var month = tmp.getMonth() + 1;
  var year = tmp.getFullYear();
  if(day < 10) {
    day = '0'+day;
  }
  if(month<10) {
    month = '0'+month;
  }
  tmp = year+ '-' + month + '-' + day;
  document.getElementById('pdate').min = tmp;
}

function setData1(data, status){
  var test = $("#exchangeKRW"),
      curstr = data["USD"];
  test.html(curstr);
}
function setData2(data, status){
  var test = $("#exchangeKRW"),
      curstr = data["JPY"];
  test.html(curstr);
}

function setData3(data, status){
  var test = $("#exchangeKRW"),
      curstr = data["EUR"];
  test.html(curstr);
}
function setData4(data, status){
  var test = $("#exchangeKRW"),
      curstr = data["CNY"];
  test.html(curstr);
}
<<<<<<< HEAD
=======

function mainfunc(reserveDay, ecRate, wantRate){
  var nowDate = new Date().getTime;
  var dDay = Math.floor((reserveDay - nowDate)/(1000*60*60*24) + 1);
  var success = false;
  document.write(dDay);
  if(dDay > 0){
    if(ecRate == wantRate){
      //알람기능1
      success = true;
      break;
    }
    if(dDay == 2){
      if(ecRate==wantRate){
        //알람 기능1
        success = true;
        break;
      } else{
        //alarm2
      }
    }
  }

  if(success == false){
    //alarm3
  }
  clearAll(); //모든 설정 초기화
  return;
}
>>>>>>> b1788e0aaafce5d7a49a818a99631411266e9c5e
