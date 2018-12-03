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
