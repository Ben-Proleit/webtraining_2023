

function Task2(){
  var table = document.getElementsByTagName('table')[0];
  table.style.fontFamily = '\'Courier New\', Courier, monospace';
  table.style.fontSize = 22;

  const headerCells = document.getElementsByTagName('th');
  // console.log(headerCells);

  for(let i = 0; i <headerCells.length; i++){
    if(i % 2 == 0){
      headerCells[i].style.backgroundColor = 'violet'
    }
    else{
      headerCells[i].style.backgroundColor = 'hotpink'
    }

    headerCells[i].style.borderColor = 'black'
    headerCells[i].style.borderStyle = 'solid'
    headerCells[i].style.borderWidth = '2px'
  }  
}
Task2();

function Task3(){
  var table = document.getElementsByTagName('table')[0];
  table.className = 'jsStyle'

  console.log(table.className)
}
Task3();

function zebra(){
  const tableRows = document.getElementsByTagName('tr')
  
  for (let i = 1; i < tableRows.length; i++) {
    if(i % 2 == 0){
      tableRows[i].style.backgroundColor = 'white';    
    }
    else{
      tableRows[i].style.backgroundColor = 'green';
    }
  }
}
zebra()

function addNewRow(table, lastName, firstName, lehrJahr, sitzplatz){
  const tBody = table.getElementsByTagName('tbody')[0]

  var row = document.createElement('tr')

  var name1 = document.createElement('td')
  name1.innerText = lastName
  row.appendChild(name1)

  var name2 = document.createElement('td')
  name2.innerText = firstName
  row.appendChild(name2)
  
  var Lj = document.createElement('td')
  Lj.innerText = lehrJahr
  row.appendChild(Lj)

  var sitzplaz = document.createElement('td')
  sitzplaz.innerText = sitzplatz
  row.appendChild(sitzplaz)

  tBody.appendChild(row)  
}


function newPerson(){
  const table = document.getElementsByTagName('table')[0]
  const tBody = document.getElementsByTagName('tbody')[0]
  
  const removedRow = tBody.getElementsByTagName('tr')[3]
  // console.log(removedRow)
  tBody.removeChild(removedRow)
  addNewRow(table, ':3', 'Emilia', '4', removedRow.getElementsByTagName('td')[3].innerText)

}
newPerson()
