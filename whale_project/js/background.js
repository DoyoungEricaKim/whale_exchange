whale.runtime.onInstalled.addListener(function(){
  console.log("line 2, start")
// whale.sidebarAction.setBadgeBackgroundColor({
//   color: '#EEE1CC',   //
// });
// whale.idle.setDetectionInterval(20);
    whale.storage.sync.get("data", function(res){
      var stoValue = res.data;
      if(stoValue) {
        console.log(stoValue.length);
        // badge();
        for(var i=0; i<stoValue.length; i++){
          var success = false;
          var notibool = false;
          mainFunc(i, success, notibool, stoValue);
       }
      }
    });
    whale.notifications.onClicked.addListener(replyPopup);
});

function successNoti(){
  var option1 = {
    type: 'basic',
    title: "목표 환율 달성!!",
    message: "설정하신 환율값에 도달했습니다. 예약 내역을 확인해주세요.",
    iconUrl: "img/logo.png"
  };
  whale.notifications.create('success', option1);
  // badge();
}

function failNoti(){
  var option2 = {
    type: 'basic',
    title: "목표 환율 달성 실패...",
    message: "지정한 기간 내 목표한 환율값에 도달하지 못했습니다.",
    iconUrl: "img/logo.png"
  };
  whale.notifications.create('fail', option2);
}

function preNoti(){
  var option3 = {
    type: 'basic',
    title: "환전 알람 종료 3일 전입니다.",
    message: "아직 목표한 환율에 도달하지 못했습니다.",
    iconUrl: "img/logo.png"
  };
  whale.notifications.create('notice', option3);
}

function replyPopup(){
  whale.sidebarAction.show({
    url: whale.runtime.getURL("check.html"),
    reload: true
  });
//  console.log("opened check.html");
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

function countCheck(deadline) {
  var s = deadline;
  var theday = new Date(s);
  var today = new Date();
  var diff = theday.getTime() - today.getTime();
  var days = Math.floor(diff/(1000*60*60*24) + 1);
  console.log("d-day까지는 몇일?" + days);    //나중에 삭제하기
  return days;
}

function mainFunc(i, success, notibool, val){
 console.log("line 103: inside main func");
  var deadline = val[i][2];           // array에서 값 가져오기
  var country = val[i][0];
  var preD = calDay(deadline);          //d-3 날짜 계산 함수
  var wantRate = 1122.5; //val[i][1];
  var nowCur;
  var d = countCheck(deadline);     //dDay 몇일 남았는지 계산
  var today = formDate();          // 오늘 날짜 가져오기

  // whale.idle.onStateChanged.addListener(function(state){
    console.log("line 115, IDLE");
    // if(state == "active" || state == "idle"){
      today = formDate();          // 오늘 날짜 가져오기
      console.log('before api');
     $.get("http://api.kimtree.net/exchange/", function( data ) {
       console.log("get api");
       nowCur = data[country];
       if(nowCur) {
         console.log("line 118: inside main func cmp" , nowCur);
         if(success!=true){ // idle로 하면 if로 바꿔도 무방할듯!!!!!!해보자!!
           if(d > 3){             // Dday가 3일 넘어야만 prenoti 발생
             if( today != deadline){
               if(nowCur <= wantRate){
                 successNoti();
                 success = true;
                 // break;
               }
             } else if( today == preD){    // d-3일인 날이 되었을 때
                if(nowCur == wantRate){
                  successNoti();
                  success = true;
               } else {
                 if(notiSbool == false){
                   preNoti();
                   notibool = true;
                 }
               }
             } else {
                failNoti();
                // break;
             }
          } else {   //Dday가 3일 안넘을때
             if(today != deadline) {
               if(nowCur <= wantRate){
                 successNoti();
                 success = true;
                 // break;
               }
             } else{
                if(nowCur <= wantRate){
                  successNoti();
                  success = true;
                  // break;
                } else{
                    failNoti();
                    // break;
                  }
              }
           }
         }
       }
     });
    // }
  // });
  //clearAll(); //타임아웃 이후에 remove from storage
  console.log("main func fin!!");
}

// function badge() {
// // TODO: if문 설정하기: noti가 생성됐을때
//   whale.sidebarAction.setBadgeText({
//     text: "NEW",
//   });
// }


/*
  var q;
   var ourRequest = new XMLHttpRequest();
   ourRequest.open('GET', 'http://api.kimtree.net/exchange/');
   ourRequest.onload = function(){
     var ourData =JSON.parse(ourRequest.responseText);
     console.log(ourData["USD"]);
   //  console.log(ourData);
     q = ourData["USD"];whale.runtime.onInstalled.addListener(function(){
       console.log("line 2, start")
     // whale.sidebarAction.setBadgeBackgroundColor({
     //   color: '#EEE1CC',   //
     // });
     // whale.idle.setDetectionInterval(20);
         whale.storage.sync.get("data", function(res){
           var stoValue = res.data;
           if(stoValue) {
             console.log(stoValue.length);
             // badge();
             for(var i=0; i<stoValue.length; i++){
               var success = false;
               var notibool = false;
               mainFunc(i, success, notibool, stoValue);
            }
           }
         });
         whale.notifications.onClicked.addListener(replyPopup);
     });

     function successNoti(){
       var option1 = {
         type: 'basic',
         title: "목표 환율 달성!!",
         message: "설정하신 환율값에 도달했습니다. 예약 내역을 확인해주세요.",
         iconUrl: "img/logo.png"
       };
       whale.notifications.create('success', option1);
       // badge();
     }

     function failNoti(){
       var option2 = {
         type: 'basic',
         title: "목표 환율 달성 실패...",
         message: "지정한 기간 내 목표한 환율값에 도달하지 못했습니다.",
         iconUrl: "img/logo.png"
       };
       whale.notifications.create('fail', option2);
     }

     function preNoti(){
       var option3 = {
         type: 'basic',
         title: "환전 알람 종료 3일 전입니다.",
         message: "아직 목표한 환율에 도달하지 못했습니다.",
         iconUrl: "img/logo.png"
       };
       whale.notifications.create('notice', option3);
     }

     function replyPopup(){
       whale.sidebarAction.show({
         url: whale.runtime.getURL("check.html"),
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

     function countCheck(deadline) {
       var s = deadline;
       var theday = new Date(s);
       var today = new Date();
       var diff = theday.getTime() - today.getTime();
       var days = Math.floor(diff/(1000*60*60*24) + 1);
       console.log("d-day까지는 몇일?" + days);    //나중에 삭제하기
       return days;
     }

     function mainFunc(i, success, notibool, val){
      console.log("line 103: inside main func");
       var deadline = val[i][2];           // array에서 값 가져오기
       var country = val[i][0];
       var preD = calDay(deadline);          //d-3 날짜 계산 함수
       var wantRate = 1122.5; //val[i][1];
       var nowCur;
       var d = countCheck(deadline);     //dDay 몇일 남았는지 계산
       var today = formDate();          // 오늘 날짜 가져오기
       var nowCur;

       // whale.idle.onStateChanged.addListener(function(state){
         console.log("line 115, IDLE");
         // if(state == "active" || state == "idle"){
           today = formDate();          // 오늘 날짜 가져오기
           console.log('before api');
          $.get("http://api.kimtree.net/exchange/", function( data ) {
            console.log("get api");
            nowCur = data[country];
            if(nowCur) {
              console.log("line 118: inside main func cmp");
              if(success!=true){ // idle로 하면 if로 바꿔도 무방할듯!!!!!!해보자!!
                if(d > 3){             // Dday가 3일 넘어야만 prenoti 발생
                  if( today != deadline){
                    if(nowCur <= wantRate){
                      successNoti();
                      success = true;
                      break;
                    }
                  }
                  else if( today == preD){    // d-3일인 날이 되었을 때
                    if(nowCur == wantRate){
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
                    if(nowCur <= wantRate){
                      successNoti();
                      success = true;
                      break;
                    }
                  }
                  else{
                    if(nowCur <= wantRate){
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
            }
          });
         // }
       // });
       //clearAll(); //타임아웃 이후에 remove from storage
       console.log("main func fin!!");
     }

     // function badge() {
     // // TODO: if문 설정하기: noti가 생성됐을때
     //   whale.sidebarAction.setBadgeText({
     //     text: "NEW",
     //   });
     // }


     /*
       var q;
        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'http://api.kimtree.net/exchange/');
        ourRequest.onload = function(){
          var ourData =JSON.parse(ourRequest.responseText);
          console.log(ourData["USD"]);
        //  console.log(ourData);
          q = ourData["USD"];
          console.log("nowCur22222:" + q);
        };
        ourRequest.send();
        console.log("nowCur:",q);
        nowCur = q;
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

     console.log("nowCur22222:" + q);
   };
   ourRequest.send();
   console.log("nowCur:",q);
   nowCur = q;
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
