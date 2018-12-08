alert('clalalalalal');
whale.runtime.onInstalled.addListener(()=>{
  console.log('나온다아아아');
  alert('dddddddddddd');
  notifyMe();

  whale.notifications.onClicked.addListener(replyPopup);

/* table에서 fail/ success background color 변경을 위해 content.js에 message 전송 필요
  let msg = {
    txt: "hello"
  }
  chrome.tabs.sendMessage(tab.id, msg);
*/
  var success = false;
  var notibool = false;
//  mainfunc(success, notibool);
});

/*
(function(){
})()
*/

function calDay() {     //3일전 날짜 계산
   var x = ; // array deadline 선언값
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


function countCheck() {
  var s = document.getElementById("pdate").value; // array에서 가져오기
  var theday = new Date(s);
  var today = new Date();
  var diff = theday.getTime() -  today.getTime();
  var days = Math.floor(diff/(1000*60*60*24) + 1);
  return days;
}

function getInfo() {
var ecRate, deadline,
    test3;
whale.storage.sync.get("data", function(res) {
    var a = res.data;
    test = a[n][0];
    test2 = a[n][1];
    test3 = a[n][2];
    /*storage에서 값 받아 올 때 a.[index][0], a.[index][1], a.[index][2]가
    selectcur, wantkrw, pdate 순서임
      a = console.log(a[0][0]);
      console.log(a[0][1]);
      console.log(a[0][2]);
    */
});
}


  function mainFunc(success, notibool ){
    var today = formDate(); // 오늘 날짜 가져오기
    var deadline = ; // array에서 값 가져오기
    var ecRate = ; // 현재 환율 가져오기 ㅇ
    var preD = calDay();  //d-3 날짜 계산 함수
    var wantRate = parseFloat(); //입력받은 input 값을 플로트 형식으로 변경
    var d = countCheck();  //dDay 몇일 남았는지 계산

    while(success!=true){     // 12/ 20 1300 1400
      if(d > 3){             // Dday가 3일 넘어야만 prenoti 발생
        if( today != deadline){
          if(ecRate <= wantRate){
            notifyMe();
            success = true;
            break;
          }
        }
        else if( today == preD){    // d-3일인 날이 되었을 때
          if(ecRate == wantRate){
            notifyMe();
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
            notifyMe();
            success = true;
            break;
          }
        }
        else{
          if(ecRate <= wantRate){
            notifyMe();
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
    clearAll(); //타임아웃 이후에 remove from storage
    return;
  }
