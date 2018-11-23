function selectCur() {
  var USD = "USD";
  var _USD = "1 달러";
  var JPY = "JPY";
  var _JPY = "1 엔";
  var EUR = "EUR";
  var _EUR = "1 유로";
  var CNY = "CNY";
  var _CNY = "1 위안";
  var option = document.getElementById("selectCur").value;
  if(option == "USD") {
    document.getElementById("ForeignCur").value = USD + "  " + _USD;
  } else if (option == "JPY") {
    document.getElementById("ForeignCur").value = JPY + "  " + _JPY;
  } else if (option == "EUR") {
    document.getElementById("ForeignCur").value = EUR + "  " + _EUR;
  } else if (option == "CNY") {
    document.getElementById("ForeignCur").value = CNY + "  " + _CNY;
  }
}
