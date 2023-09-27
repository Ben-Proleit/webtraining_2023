function setTableFont() {
  const table = document.getElementsByTagName("table").item(0);

  const link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.setAttribute("href", "https://fonts.cdnfonts.com/css/open-dyslexic");
  document.head.appendChild(link);

  table.style.fontFamily = "open-dyslexic";
  table.style.fontSize = 20;

  const ths = table.getElementsByTagName("th");
  for (let th of ths) {
    th.style.background = "#3dcd58";
    th.style.borderStyle = "dotted";
    th.style.borderWidth = "5px";
    th.style.borderColor = "#009530";
  }

  //   Array.from(ths).forEach((h) => {
  //     h.style.background = "#3dcd58";
  //   });
}

function setTableClass() {
  document.getElementsByTagName("table").item(0).classList.add("tableMargin");
  //   document.getElementsByTagName("table")[0].classList.add("tableMargin");
}

function setZebraPattern() {
  const trs = Array.from(document.getElementsByTagName("tr"));

  trs.forEach((tr) => {
    if (trs.indexOf(tr) % 2 === 0) {
      tr.style.background = "#9FA0A4";
    }
  });

  //   Array.from(document.querySelectorAll("tr:nth-of-type(odd)")).forEach((tr) => {
  //     tr.style.background = "#9FA0A4";
  //   });
}

function addTableRow() {
  const tr = document
    .getElementsByTagName("tbody")
    .item(0)
    .appendChild(document.createElement("tr"));

  tr.appendChild(document.createElement("td")).innerText = "Hulke";
  tr.appendChild(document.createElement("td")).innerText = "Florian";
  tr.appendChild(document.createElement("td")).innerText = 3;
  tr.appendChild(document.createElement("td")).innerText = 9;
}

function removeTableRow() {
  const tbody = document.getElementsByTagName("tbody").item(0);
  const firstTr = tbody.children.item(1);
  const seat = firstTr.getElementsByTagName("td").item(3).innerText;

  tbody.lastChild.getElementsByTagName("td").item(3).innerText = seat;
  tbody.removeChild(firstTr);
}

function setLink() {
  const link = document.getElementsByTagName("a").item(0);
  link?.setAttribute("href", "https://www.proleit.com/");
  link?.setAttribute("target", "_blank");
}

setTableFont();
setTableClass();
setZebraPattern();
addTableRow();
removeTableRow();
setLink();
