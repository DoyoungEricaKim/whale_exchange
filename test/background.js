(function () {

  whale.runtime.sendMessage({sidebarOpened: true})

  whale.runtime.onMessage.addListener((message, sender, sendResponse) => {
  })

  whale.sidebarAction.onClicked.addListener((result) => {
    //siderbar 열렸을때 초기 설정
  })

/*
  var test2 = document.getElementById("hw");
  test2.addEventListener('submit', function() {
    alert('Hello world2222');
  })
  var test3 = document.getElementById("hw");
  if(test3){
    test3.addEventListener('change', function() {
      alert('Hello world this');
    })
  }
*/
  var test = document.getElementById("hw");
    test.addEventListener('submit', function(evt) {
      evt.preventDefault();
      alert('Hello world~~~~~~');
      window.location.href = "test_confirm.html"
})

  function myFunction(){
    alert("wow");
  }


})()
