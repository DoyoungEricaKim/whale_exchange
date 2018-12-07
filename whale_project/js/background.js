(function(){

  $('#id_complete_button').on('click', (event) => {
   notifyMe();
  })
  whale.notifications.onClicked.addListener(replyPopup);
})()

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
  chrome.notifications.create('fail', option2, callback);
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
  var s = document.getElementById("pdate").value;
  var theday = new Date(s);
  var today = new Date();
  var diff = theday.getTime() -  today.getTime();
  var days = Math.floor(diff/(1000*60*60*24) + 1);
  return days;
}

  function mainFunc(ecRate, wantRate){
    var dDay = countCheck();

    while(){
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
