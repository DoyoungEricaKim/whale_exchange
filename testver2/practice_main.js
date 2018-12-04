/*
chrome.app.runtime.onLaunched.addListener(function() {
    alert("hello world");
});
*/
chrome.app.window.create('practice.html', {
  id: 'main',
  bounds: {width: 620, height: 500}
});
