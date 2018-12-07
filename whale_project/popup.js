

var options = {
  type: 'basic',
  title: "My first popup with chrome",
  message: "This is pretty cool",
  iconUrl: "img/logo.png"
  };
chrome.notifications.create('Success', options, callback);
chrome.notifications.onClicked.addListener(replyPopup);


function callback(){
  console.log('pop up done');
}

function replyPopup(){
  window.open("check.html");
}


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
