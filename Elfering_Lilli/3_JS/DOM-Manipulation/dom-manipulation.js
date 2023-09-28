function fontModification(myFontFamily, myFontSize) {
   let table =  document.getElementsByTagName('table')[0];
   console.log(document.getElementsByTagName('table')[0]);
   table.style.fontFamily = myFontFamily;
   table.style.fontSize = myFontSize;
}

fontModification("Arial", "20");


function newCSSClass(className) {
    document.getElementsByTagName('table')[0].setAttribute('class', className);
}

newCSSClass('neu');


function addPadding ( selector ) {
    let myClass = document.querySelector(selector);
    myClass.style.padding = "20px";
}

addPadding(".neu");


function zebra() {
    Array.from(document.querySelectorAll("tr:nth-of-type(even)")).forEach((tr) => {tr.style.background = "pink";});
}




function newRow (firstName, lastName, year, seatNuber){
    const tr = document.getElementsByTagName('tbody').item(0).appendChild(document.createElement('tr'));
    
    tr.appendChild(document.createElement('td')).innerText = firstName;
    tr.appendChild(document.createElement('td')).innerText = lastName;
    tr.appendChild(document.createElement('td')).innerText = year;
    tr.appendChild(document.createElement('td')).innerText = seatNuber;
}

newRow('Elfering', 'Lilli', '2', '9');


function removeParticipant(row) {
    const seat = document.getElementsByTagName('tbody').item(0).getElementsByTagName('tr').item(row).getElementsByTagName('td').item(3).innerText;
    document.getElementsByTagName('tbody').item(0).lastChild.getElementsByTagName('td').item(3).innerText = seat;
    document.getElementsByTagName('tbody').item(0).removeChild(document.getElementsByTagName('tbody').item(0).getElementsByTagName('tr').item(row));
}

removeParticipant(1);


function setHRef() {
    let aTag = document.getElementById('a-Tag');
    aTag.setAttribute('href', 'https://www.proleit.de');
    aTag.setAttribute('target', '_blank');
}

setHRef();

zebra();
