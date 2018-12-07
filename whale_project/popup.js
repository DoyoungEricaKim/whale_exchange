chrome.notifications.create(
  ‘id1’,{
      type: ‘basic’,
      iconUrl: ‘image1.png’,
      title: ‘Althe Frazon’,
      message: ‘Hi, what's going on tonight?’,
      buttons: [{ title: ‘Call’,
                  iconUrl: ‘call.png’},
                { title: ‘Send Email’,
                  iconUrl: ‘email.png’}],
      priority: 0},
  function() { /* Error checking goes here */}
);


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




/*
//옵션 내용에 넣으려 했던 내용들
  actions: [
    {action: 'explore', title: 'Go to the site', icon:""},
    {action: 'close', title: 'No thank you' icon:''}
  ],
  data: {primaryKey: 1} //

  self.addEventListener('notificationClick', function(event){
    var notification = event.notification;
    var action = event.action;
    if(action ==='close'){
      notification.close();
    } else{
      clients.openWindow('check.html'); // 공지 누르면 예약 확인 페이지로 연결
    }
  });
  self.addEventListener('notificationclose', function(event){
    var notification = event.notification;
    var primaryKey = notification.data.primaryKey;
    console.log('Closed notification: '+ primaryKey);
  });
*/





/*
  //notification 기능
  $('#id_complete_button').click(function(){
    whale.storage.sync.get([], function(){
      var a = 0;
      whale.storage.sync.set({}, function(){
        if(){ //환율비교
          var notifOptions = {
            type: "basic",
            iconUrl:"img/logo.png",
            title:"환율 알람!!",
            message:"목표하신 알람에 도달했습니다. "
          };
          whale.notifications.create('successNotif', notifOptions);
        }
      }
    });

  });
});

*/

/*
  whale.notifications.onClicked.addListener((id) =>{
    if(id == 'id_complete_button'){
      notifyMe();
    })
*/
