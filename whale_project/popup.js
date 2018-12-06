function notifyMe(){
  if(!("Notification" in window)){
    alert("This browser does not support systenm notification");
  }else if(Notification.permission==="granted"){
    notify();
  }else if (Notification.permission !=="denied") {
    Notification.requestPermission(function(permission){
      if(permission==="granted"){
        notify();
      }
    });
  }
}

function notify(){
  var options = {
    type: "basic",
    title: "My first popup with chrome",
    message: "This is pretty cool",
    iconURL: "img/"logo.png,
    actions: [
      {action: 'explore', title: 'Go to the site', icon:""},
      {action: 'close', title: 'No thank you' icon:''}
    ],
    data: {primaryKey: 1} //
  };

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
  /*
  whale.notifications.onClicked.addListener((id) => {
    if(id == 'notificationClick') {
      whale.storage.sync.get([], function(){

      })
    }
  }
*/
//  setTimeout(options.close.bind(notification),6000); //자동으로 팝업 다운되는 기능

}
/*
$('#id_complete_button').click(function(){
  whale.notifications.create('successNotif', options);
  notifyMe();
});
*/
