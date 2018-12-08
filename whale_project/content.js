chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
  console.log(message.txt);
  if(message.txt === "hello"){
    let paragraphs = document.getElementByTagName('p');
    for(elt of paragraphs) {
      elt.style['background-color'] = '#84CBDD'    //success 된 table의 backgroundcolor를 지정 실패: #EEE1CC
    }
  }
}
