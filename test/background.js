(function () {

  whale.runtime.sendMessage({sidebarOpened: true})

  whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  })

  whale.sidebarAction.onClicked.addListener((result) => {
    //siderbar 열렸을때 초기 설정
  })


  var test2 = document.getElementById("hw");
  test2.addEventListener('click', function() {
    alert('Hello world2222');
  })
  var test = document.getElementById("text");
    test.addEventListener('change', function() {
      alert('Hello world');
  })
  var test3 = document.getElementById("selectCur");
  if(test3){
    test3.addEventListener('change', function() {
      alert('Hello world');
    })
  }


})()
