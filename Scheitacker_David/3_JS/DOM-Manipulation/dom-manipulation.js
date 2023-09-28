function setFont() {
  var table = document.getElementById("tableTest");

  table.style.fontFamily = "TimesNewRoman";
  table.style.fontSize = 25;

  var header = Array.from(table.getElementsByTagName("th"));

  header.forEach((element) => {
    element.style.backgroundColor = "olive";
    element.style.borderStyle = "dotted";
    element.style.borderColor = "red";
  });
}

function createClass() {
  var table = document.getElementById("tableTest");
  console.log(table);

  var test = Array.from(table.getElementsByTagName("td"));
  console.log(test);
  test.forEach((td) => {
    td.setAttribute("class", "testClass");
  });
  console.log(test);
}

setFont();
createClass();
