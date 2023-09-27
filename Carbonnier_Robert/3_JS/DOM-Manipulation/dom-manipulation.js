

function task2(){
    document.getElementsByTagName("body")[0].style.fontFamily = "Impact,Charcoal,sans-serif";
    var tableheader = document.getElementsByTagName('th');
    changeBackgroundcolor(tableheader, '#3DCD58');
    changeBorder(tableheader);
}

function changeBackgroundcolor(elements, color){
    var arr = Array.from(elements);
    for (var i =  0;  i < arr.length ; i++ ){
        arr[i].style.backgroundColor = color;
       
    }
}

function changeBorder(elements){
    var arr = Array.from(elements);
    for (var i =  0;  i < arr.length ; i++ ){
        arr[i].style.border = "thick solid #000";
    }
}




function task3(){
    //fragen
}

function task4(){
    var tablerows = document.getElementsByTagName("tr")
    var arr = Array.from(tablerows)
    for (var j = 0; j < arr.length; j+=2){
        arr[j].style.backgroundColor = "#626469"
    }
}

function task5(seat){
    var table = document.getElementsByTagName("table")
    var row = table[0].insertRow(3)

    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)
    var cell4 = row.insertCell(3)
    
    cell1.innerHTML = "Hans"
    cell2.innerHTML = "Peter"
    cell3.innerHTML = "2"
    cell4.innerHTML = seat

}

function task6(position){
    let table = document.getElementsByTagName("table")
    //get the table data
    let tabledata = document.getElementsByTagName("td")
    let pos = 4* position -1 
    let number = tabledata[pos]
    //Je nach dem welche Zeile tr mit 4 malnehmen
    table[0].deleteRow(position)
    return number.innerText;
}
task2()
task5(task6(5))
task4()
