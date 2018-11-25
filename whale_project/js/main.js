function callToday(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd;
  }
  if(mm<10) {
      mm = '0'+mm;
  }
  today = yyyy+ '-' + mm + '-' + dd;
//  document.write(today); 현재는 제대로 돌아가는지 확인용으로 넣어둠 이후에 삭제!!
  return parseInt(today);
}

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

function CountDays(){
  var startDay = new Date(document.getElementById("start_day").value);
  var dDay = new Date(document.getElementById("D-day").value);
  var t = new callToday();
  //while(dDay > t && startDay >= t){
    if( dDay - startDay > 0 ){
     return parseInt((dDay - startDay) / (24 * 3600 * 1000));
    }
    else{
     return null;
    }
//        }
} // alert 누르면 다시 calendar 기간 설정하도록 반복문 추가하기

function cal(){
if(document.getElementById("D-day")){
    document.getElementById("calcDays2").value = CountDays();}
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
