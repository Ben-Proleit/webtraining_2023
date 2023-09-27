function setFontM() {
  // inhalt auf variablen schreiben
  let Table = document.getElementById("Tisch");
  let KoZe = document.getElementById("KopfZ");
  Table.style.color = "red";
  Table.style.fontFamily = "Times New Roman";
  KoZe.style.backgroundColor = "#3dcd58";

  //inhalt auf Array schreiben und für jeden inhalt die border anpassen
  const row = document.getElementsByTagName("th");
  console.log(row);
  let length = row.length;
  let count = 0;
  do {
    row[count].style.borderStyle = "solid";
    row[count].style.borderWidth = "Thick";
    row[count].style.borderColor = "Black";
    count++;
  } while (count < length);
}

function setClass() {
  let Table = document.getElementById("Tisch");
  Table.setAttribute("class", "tableM");
  Table.classList.add("tableM");
}

function zebra() {
  console.log(document.querySelectorAll("tr:nth-of-type(even)"));
  Array.from(document.querySelectorAll("tr:nth-of-type(even)")).forEach(
    (tr) => {
      tr.style.backgroundColor = "Brown";
      console.log(tr);
    }
  );
}

function addTeilnehmer() {
  const table = document.getElementsByTagName("tbody").item(0);
  console.log(table);
  const tr = table.appendChild(document.createElement("tr"));
  tr.appendChild(document.createElement("td")).innerText = "Scheidacker";
  tr.appendChild(document.createElement("td")).innerText = "David";
  tr.appendChild(document.createElement("td")).innerText = "3";
  tr.appendChild(document.createElement("td")).innerText = "9";
}

function killTeilnehmer() {
  let deadMan = document.querySelector("tr:nth-of-type(2)");
  let nr = deadMan.getElementsByTagName("td").item(3).innerText;
  let newGuy = document.querySelector("tr:last-of-type");
  let body = document.getElementsByTagName("tbody").item(0);
  newGuy.getElementsByTagName("td").item(3).innerText = nr;
  body.removeChild(deadMan);
}

function addHref() {
  let aTag = document.getElementsByTagName("a").item(0);
  aTag.setAttribute("href", "https://www.proleit.de/");
  aTag.setAttribute("target", "_blank");
}

setFontM();
setClass();
zebra();
addTeilnehmer();
killTeilnehmer();
addHref();
