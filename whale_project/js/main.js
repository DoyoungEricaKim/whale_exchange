
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
    $.get("https://free.currencyconverterapi.com/api/v5/convert?q=USD_KRW&compact=y", setData);
  } else if (option == "JPY") {
    document.getElementById("ForeignCur").value = JPY + "  " + _JPY;
    document.getElementById("ForeignCur1").value = JPY + "  " + _JPY;
    $.get("https://free.currencyconverterapi.com/api/v5/convert?q=JPY_KRW&compact=y", setData);
  } else if (option == "EUR") {
    document.getElementById("ForeignCur").value = EUR + "  " + _EUR;
    document.getElementById("ForeignCur1").value = EUR + "  " + _EUR;
    $.get("https://free.currencyconverterapi.com/api/v5/convert?q=EUR_KRW&compact=y", setData);
  } else if (option == "CNY") {
    document.getElementById("ForeignCur").value = CNY + "  " + _CNY;
    document.getElementById("ForeignCur1").value = CNY + "  " + _CNY;
    $.get("https://free.currencyconverterapi.com/api/v5/convert?q=CNY_KRW&compact=y", setData);
  }
}

function countCheck() {
  var s = document.getElementById("pdate").value;
  var theday = new Date(s);
  var today = new Date();
  var diff = theday.getTime() -  today.getTime();
  var days = Math.floor(diff/(1000*60*60*24) + 1);
  document.write(days); //이거로 돌아가는지 확인하는 용
  return days;
}

function mainfunc(countNum, ecRate, wantRate){
  var count = 0;
  var success = false;

  while(count < countNum){
    success = false;
    count++;
    if(ecRate == wantRate){
      //알람기능1
      success = true;
      break;
    }

    if(count == countNum-2){
      if(ecRate==wantRate){
        //알람 기능1
        success = true;
        break;
      }
      else{
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
