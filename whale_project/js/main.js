(function () {

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

/* wantKRW 받아 올때 쓸 addEventListener
  var test2 = document.getElementById("wantKRW");
  test2.addEventListener('change', selectCur())
*/

function selectCur() {
  var USD = "USD";
  var _USD = "1 달러";
  var JPY = "JPY";
  var _JPY = "1 엔";
  var EUR = "EUR";
  var _EUR = "1 유로";
  var CNY = "CNY";
  var _CNY = "1 위안";
  var option = document.getElementById("selectCur").value;
  if(option == "USD") {
    document.getElementById("ForeignCur").value = USD + "  " + _USD;
    document.getElementById("ForeignCur1").value = USD + "  " + _USD;
    $.get("https://free.currencyconverterapi.com/api/v5/convert?q=USD_KRW&compact=y", setData1);
  } else if (option == "JPY") {
    document.getElementById("ForeignCur").value = JPY + "  " + _JPY;
    document.getElementById("ForeignCur1").value = JPY + "  " + _JPY;
    $.get("https://free.currencyconverterapi.com/api/v5/convert?q=JPY_KRW&compact=y", setData2);
  } else if (option == "EUR") {
    document.getElementById("ForeignCur").value = EUR + "  " + _EUR;
    document.getElementById("ForeignCur1").value = EUR + "  " + _EUR;
    $.get("https://free.currencyconverterapi.com/api/v5/convert?q=EUR_KRW&compact=y", setData3);
  } else if (option == "CNY") {
    document.getElementById("ForeignCur").value = CNY + "  " + _CNY;
    document.getElementById("ForeignCur1").value = CNY + "  " + _CNY;
    $.get("https://free.currencyconverterapi.com/api/v5/convert?q=CNY_KRW&compact=y", setData4);
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
  var test = $("#exchangeKRW");
  var curstr = JSON.stringify(data['USD_KRW']['val']);
  test.html(curstr);
}
function setData2(data, status){
  var test = $("#exchangeKRW");
  var curstr2 = JSON.stringify(data['JPY_KRW']['val']);
  test.html(curstr2);
}

function setData3(data, status){
  var test = $("#exchangeKRW");
  var curstr3 = JSON.stringify(data['EUR_KRW']['val']);
  test.html(curstr3);
}
function setData4(data, status){
  var test = $("#exchangeKRW");
  var curstr4 = JSON.stringify(data['CNY_KRW']['val']);
  test.html(curstr4);
}
