(function(){
  alert('dddddddddddd');
  notifyMe();

  whale.notifications.onClicked.addListener(replyPopup);
})()

function calDay() {
   var x = new Date();
   var d = new Date(Date.parse(x) - 3 * 1000 * 60 * 60 * 24);
   var day = d.getDate(),
       month = d.getMonth() + 1,
       year = d.getFullYear();
   if(day < 10) {
    day = '0'+day;
   }
   if(month<10) {
    month = '0'+month;
   }
   d = year+ '-' + month + '-' + day;
   return d;
}

function formDate(){
  var tmp = new Date();
  var day = tmp.getDate(),
      month = tmp.getMonth() + 1,
      year = tmp.getFullYear();
  if(day < 10) {
    day = '0'+day;
  }
  if(month<10) {
    month = '0'+month;
  }
  tmp = year+ '-' + month + '-' + day;
  return tmp;
}

function notifyMe(){
  var option1 = {
    type: 'basic',
    title: "목표 환율 달성!!!",
    message: "설정하신 환율값에 도달했습니다. 예약 내역을 확인해주세요.",
    iconUrl: "img/logo.png"
    };
  whale.notifications.create('success', option1, callback);
}

function failNoti(){
  var option2 = {
    type: 'basic',
    title: "목표 환율 달성 실패...",
    message: "지정한 기간 내 목표한 환율값에 도달하지 못했습니다.",
    iconUrl: "img/logo.png"
    };
  chrome.notifications.create('fail', option2);
}

function preNoti(){
  var option3 = {
    type: 'basic',
    title: "환전 알람 종료 3일 전입니다.",
    message: "아직 목표한 환율에 도달하지 못했습니다.",
    iconUrl: "img/logo.png"
    };
  chrome.notifications.create('notice', option3);
}


function callback(){
  console.log('pop up done');
}

function replyPopup(){
  whale.sidebarAction.show({
    url: whale.runtime.getURL("check.html"),
    reload: true
  });
  console.log("opened check.html");
}

/*
function countCheck() {
  var s = document.getElementById("pdate").value;
  var theday = new Date(s);
  var today = new Date();
  var diff = theday.getTime() -  today.getTime();
  var days = Math.floor(diff/(1000*60*60*24) + 1);
  return days;
}
*/

  function mainFunc(){
    var deadline = ; // array에서 값 가져오기
    var success = false;
    var ecRate = ; // 현재 환율 가져오기
    var preD = calDay();  //d-3 계산 함수
    var wantRate = parseFloat(); //
    var today = formDate(); // 날자 처리

var onceTimer = window.setInterval(function(){ /* process... */ }, delay);

    while(success!=true){
      if( today == deadline){

        if(ecRate <= wantRate){
          notifyMe();
          success = true;
          break;
        }
      }
      else if( today == deadline){
        if(ecRate == wantRate){
          notifyMe();
          success = true;
          break;
        }
        else {
          preNoti();
        }
      }
      else {
        failNoti();
        break;
      }
    }

    //  setTimeout(options.close.bind(notification),6000);  시간은 하루로
    clearAll(); //타임아웃 이후에 remove from storage
    return;
  }
