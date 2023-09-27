function changeTableStyle() {
  let table = document.getElementsByTagName('table')[0];
  table.style = 'font-family:  Arial, Helvetica, sans-serif; font-size: 20px';
  let header = table.getElementsByTagName('th');
  for(let i = 0; i < header.length; i++) {
    header.item(i).style = 'background-color: white; border: 2px; border-style: solid; border-color: black;';
  }
}
changeTableStyle();

function addClass() {
  let table = document.getElementsByTagName('table')[0];
  table.classList.add('table');
}

addClass();

function zebraLook() {
  let table = document.getElementsByTagName('table')[0];
  for(let i = 0; i < table.rows.length; i++) {
    if(i%2 == 0) {
      console.log('lalalalala');
      table.rows[i].style = 'background-color: blue;';
    }
  }
}

zebraLook();

function addMember(name, surname, year, place) {
  let table = document.getElementsByTagName('table')[0];
  let tablerow = table.insertRow(table.length);

  let surnamecolumn = document.createElement('td');
  surnamecolumn.innerText = surname;
  tablerow.appendChild(surnamecolumn);

  let namecolumn = document.createElement('td');
  namecolumn.innerText = name;
  tablerow.appendChild(namecolumn);

  let yearcolumn = document.createElement('td');
  yearcolumn.innerText = year;
  tablerow.appendChild(yearcolumn);

  let placecolumn = document.createElement('td');
  placecolumn.innerText = place;
  tablerow.appendChild(placecolumn);

  console.log(tablerow);
  //tablerow
}
addMember('Max', 'Mustermann', 2, 9);

function deleteMember(index) {
  let table = document.getElementsByTagName('table')[0];
  table.deleteRow(index);
  let tablerow = table.rows[table.rows.length-1];

  tablerow.lastChild.innerText = index;
}

deleteMember(3);

function manipulateLink() {
  let link = document.querySelector('a');
  link.setAttribute('href', 'https://www.proleit.com');
  link.setAttribute('target', '_blank');
}
manipulateLink();