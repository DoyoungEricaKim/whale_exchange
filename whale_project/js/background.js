chrome.runtime.onInstalled.addListener(function(){

      chrome.storage.sync.get("data", function(res){
        var stoValue = res.data;
        if(stoValue) {
          alert(stoValue.length);

          for(var i=0; i<stoValue.length; i++){
            var success = false;
            var notibool = false;
            alert("i값은? " + i);
            // addEventListener ->
            mainFunc(i, success, notibool, stoValue);
            alert("notibool?" + notibool);
         }
        }
      });

      // alert("I'm in active or idle");
  //    successNoti();
      chrome.notifications.onClicked.addListener(replyPopup);
   });



/* table에서 fail/ success background color 변경을 위해 content.js에 message 전송 필요
  let msg = {
    txt: "hello"
  }
  chrome.tabs.sendMessage(tab.id, msg);
*/

function successNoti(){
  var option1 = {
    type: 'basic',
    title: "목표 환율 달성!!",
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

function calDay(deadline) {     //3일전 날짜 계산
   var x = deadline; // array deadline 선언값
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
   alert('d-3일은:'+ d); //나중에 삭제하기
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
  alert('오늘은:'+ tmp);              //나중에 삭제하기
  return tmp;
}



function countCheck(deadline) {
  var s = deadline; // array에서 가져오기
  var theday = new Date(s);
  var today = new Date();
  var diff = theday.getTime() - today.getTime();
  var days = Math.floor(diff/(1000*60*60*24) + 1);
  alert("d-day까지는 몇일?" + days);    //나중에 삭제하기
  return days;
}

function mainFunc(i, success, notibool, val){
  var deadline = val[i][2];           // array에서 값 가져오기
  var country = val[i][0];
  var preD = calDay(deadline);          //d-3 날짜 계산 함수
  var wantRate = val[i][1];
  var d = countCheck(deadline);
  var today = formDate();          // 오늘 날짜 가져오기
  var ecRate;         //dDay 몇일 남았는지 계산
  chrome.idle.setDetectionInterval(20);
  chrome.idle.onStateChanged.addListener(function(state){
    if(state == "active" || state == "idle"){
     today = formDate();          // 오늘 날짜 가져오기

      var ourRequest = new XMLHttpRequest();
      ourRequest.open('GET', 'http://api.kimtree.net/exchange/');
      ourRequest.onload = function(){
        var ourData = ourRequest.responseText;
        console.log(ourData[0]);
        alert(ourData[0]);
      };
    }
  });
  alert("today, deadline, country, preD, wantRate, d, ecRate");
  alert(today + deadline + country + preD + wantRate + d);




/*
  var q;
   var ourRequest = new XMLHttpRequest();
   ourRequest.open('GET', 'http://api.kimtree.net/exchange/');
   ourRequest.onload = function(){
     var ourData =JSON.parse(ourRequest.responseText);
     console.log(ourData["USD"]);
   //  alert(ourData);
     q = ourData["USD"];
     alert("ecRate22222:" + q);
   };
   ourRequest.send();
   console.log("ecRate:",q);
   ecRate = q;


   $.ajax({
    type: 'GET',
    url: "http://api.kimtree.net/exchange/",
    dataType: 'json'
    success: function(data){
      $.each(data, function(key, value){
        container.append(key +': '+value+'</br>');
      });
    }
    });
*/




  /*
  while(success!=true){ // idle로 하면 if로 바꿔도 무방할듯!!!!!!해보자!!
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
   /*
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
*/
}
