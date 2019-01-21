whale.runtime.onInstalled.addListener(function(){
  whale.notifications.onClicked.addListener(replyPopup);

  whale.idle.setDetectionInterval(300);
  whale.idle.onStateChanged.addListener(function(state){
    if(state == "active" || state == "idle"){
      whale.storage.sync.get("data", function(res){
        var stoValue = res.data;

            if(stoValue == stoValue) {
              for(var i=0; i< stoValue.length; i++){
                console.log("222222222222");
                mainFunc(i, stoValue);
              }
            }
          });
    }
  });
});

function successNoti(country, wantRate, deadline, nowCur){
  var option1 = {
    type: 'list',
    title: "목표 환율 달성!!",
    message:
    "설정하신 환율값에 도달했습니다. 예약 내역을 확인해주세요. ",
    iconUrl: "img/logo1.png",
    requireInteraction: true,
    items:[{title: "예약 통화 ", message: country },
           { title: "예약 환율", message: wantRate},
           { title: "현재 환율", message: nowCur},
           { title: "예약 종료일", message: deadline + "\n\n\n 목표 환율을 달성해 알람이 종료되었습니다. "}]
  };

  whale.notifications.create('success', option1);

}

function failNoti(country, wantRate, deadline, nowCur){
  var option2 = {
    type: 'list',
    title: "목표 환율 달성 실패...",
    message: "지정한 기간 내 목표한 환율값에 도달하지 못했습니다.",
    iconUrl: "img/logo1.png",
    requireInteraction: true,
    items:[{title: "예약 통화 ", message: country },
           { title: "예약 환율", message: wantRate},
           { title: "현재 환율", message: nowCur},
           { title: "예약 종료일", message: deadline + "\n\n\n 알람이 종료되었습니다. "}]
  };
  whale.notifications.create('fail', option2);
}

function preNoti(){
  var option3 = {
    type: 'basic',
    title: "환전 알람 종료 3일 전입니다.",
    message: "아직 목표한 환율에 도달하지 못했습니다.",
    requireInteraction: true,
    iconUrl: "img/logo1.png"
  };
  whale.notifications.create('notice', option3);
}

function replyPopup(){
  whale.sidebarAction.show({
    url: whale.runtime.getURL("check.html"),
    reload: true
  });
}

function calDay(deadline) {
   var x = deadline;
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

function countCheck(deadline) {
  var s = deadline;
  var theday = new Date(s);
  var today = new Date();
  var diff = theday.getTime() - today.getTime();
  var days = Math.floor(diff/(1000*60*60*24) + 1);
  return days;
}

function deleteStorage(stoValue, i) {
    var a = stoValue,
        n = i;
    a.splice(n, 1); //n번째 값 remove
    whale.storage.sync.set({'data': a}, function() {
    });
}


function mainFunc(i, val){
  var deadline = val[i][2];
  var country = val[i][0];
  var preD = calDay(deadline);
  var wantRate = val[i][1];
  var nowCur;
  var d = countCheck(deadline);
  var today = formDate();
  $.get("http://api.kimtree.net/exchange/", function( data ) {
    nowCur = data[country];

    console.log("내역 확인 - 나라, wantRate, 기간, 디데이, 3일 전 날짜, 오늘날짜, 현재 환율");
    console.log(country, wantRate, deadline, d, preD, today, nowCur);

    if(nowCur) {
      if(d > 3){
           if(nowCur <= wantRate){
             successNoti(country, wantRate, deadline, nowCur);
             deleteStorage(val, i);
           }
       }
      else if(today == preD){
            if(nowCur<= wantRate){
              successNoti(country, wantRate, deadline, nowCur);
              deleteStorage(val, i);
            } else {
                 preNoti();
               }
          }
      else{
        if(today != deadline) {
           if(nowCur <= wantRate){
             successNoti(country, wantRate, deadline, nowCur);
             deleteStorage(val, i);
            }
          }
        else {     //today == deadline
          if(nowCur <=wantRate){
            successNoti(country, wantRate, deadline, nowCur);
            deleteStorage(val, i);
          }else{
            failNoti(country, wantRate, deadline, nowCur);
            deleteStorage(val, i);
          }
        }
      }
    }
  });
}
