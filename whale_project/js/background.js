whale.notifications.onClicked.addListener((id) =>{
    if(id == 'id_complete_button'){
        notifyMe();
      })

  }
})

function notifyMe(){
  if (Notification.permission !== "granted")
    Notification.requestPermission();
  else {
    var options = new Notification({
      type: "basic",
      title: "My first popup with chrome",
      message: "This is pretty cool",
      iconURL: "img/logo.png"
    });
    chrome.notifications.onClicked.addListener(function(successNotif){
      window.open("check.html");
    });

    });
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
