whale.runtime.onInstalled.addListener(function(){
  // whale.storage.sync.get("data", function(res){
  //   var stoValue = res.data;
  //   if(stoValue) {
  //     for(let i=0; i<stoValue.length; i++){
  //      getLimit(i);
  //      getRate(i);
  //      getCountry(i);
  //    }
  //   }
  // });
  //이 거지 같은 웨일 새끼야

  var success = false;
  var notibool = false;
  //  mainFunc(success, notibool);
  alert("I'm in active or idle");
  successNoti();
  chrome.notifications.onClicked.addListener(replyPopup);
});


/* table에서 fail/ success background color 변경을 위해 content.js에 message 전송 필요
  let msg = {
    txt: "hello"
  }
  chrome.tabs.sendMessage(tab.id, msg);
*/


//  mainfunc(success, notibool);
function getCountry(idx) {
  var country;
  whale.storage.sync.get("data", function(res) {
      var a = res.data;
      country = a[idx][0];
      alert("country:"+ country);    //나중에 삭제하기
   });
   return country;
}

function getRate(idx) {
  var wantRate;
  whale.storage.sync.get("data", function(res) {
    var a = res.data;
    wantRate = a[idx][1];
    alert("want:"+ wantRate);    //나중에 삭제하기
 });
 return wantRate;
}

function getLimit(idx) {
var deadline;
chrome.storage.local.get("data", function(res) {
    var a = res.data;
    deadline = a[idx][2];
    alert("day:" + deadline);    //나중에 삭제하기
 });
 return deadline;
}

function calDay() {     //3일전 날짜 계산
   var x = getLimit(); // array deadline 선언값
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
   alert('d-3일은:',d); //나중에 삭제하기
   return d;
}

function formDate(){ // 오늘 날짜 계산 함수
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
  alert('오늘은: ',tmp);              //나중에 삭제하기
  return tmp;
}

function successNoti(){
  var option1 = {
    type: 'basic',
    title: "1111111111111",
    message: "설정하신 환율값에 도달했습니다. 예약 내역을 확인해주세요.",
    iconUrl: "img/logo.png"
    };
  chrome.notifications.create('success', option1);
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

function replyPopup(){
  chrome.sidebarAction.show({
    url: chrome.runtime.getURL("check.html"),
    reload: true
  });
  console.log("opened check.html");
}

function countCheck() {
  var s = getLimit(); // array에서 가져오기
  var theday = new Date(s);
  var today = new Date();
  var diff = theday.getTime() -  today.getTime();
  var days = Math.floor(diff/(1000*60*60*24) + 1);
  alert("d-day까지는 몇일?", days);    //나중에 삭제하기
  return days;
}

function mainFunc(success, notibool ){
  var today = formDate();          // 오늘 날짜 가져오기
  var deadline = getLimit();      // array에서 값 가져오기
  var country = getCountry();
  var ecRate;             // 현재 환율 가져오기 ㅇ
  var preD = calDay();          //d-3 날짜 계산 함수
  var wantRate = getRate();   //입력받은 input 값을 플로트 형식으로 변경
  var d = countCheck();         //dDay 몇일 남았는지 계산
  $.get("http://api.kimtree.net/exchange/", function( data ) {
      ecRate = data[country];
  });
  while(success!=true){
    if(d > 3){             // Dday가 3일 넘어야만 prenoti 발생
      if( today != deadline){
        if(ecRate <= wantRate){
          successNoti();
          success = true;
          break;
        }
      }
      else if( today == preD){    // d-3일인 날이 되었을 때
        if(ecRate == wantRate){
          successNoti();
          success = true;
          break;
        }
        else {
          if(notiSbool == false){
            preNoti();
            notibool = true;
          }
        }
      }
      else {
        failNoti();
        break;
      }
   }
   else {   //Dday가 3일 안넘을때
      if(today != deadline) {
        if(ecRate <= wantRate){
          successNoti();
          success = true;
          break;
        }
      }
      else{
        if(ecRate <= wantRate){
          successNoti();
          success = true;
          break;
        }
        else{
          failNoti();
          break;
        }
      }

    }

  }
//    clearAll(); //타임아웃 이후에 remove from storage

}
