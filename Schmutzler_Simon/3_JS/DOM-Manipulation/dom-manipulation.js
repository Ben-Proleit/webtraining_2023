
let table = document.getElementsByTagName('table')[0];

function changeTableStyle (table, fontFamily, fontSize, bColor, borderStyle){
    var row = table.getElementsByTagName('tr');
    for(var i = 0; i < row.length; i++)
    {
        var headerCells = row[i].getElementsByTagName('th');
        for(k = 0; k < headerCells.length; k++)
        {
            headerCells[k].style.backgroundColor = bColor;
            headerCells[k].style.border= borderStyle;  
        }

        var cells = row[i].getElementsByTagName('td');
        for(var j = 0; j < cells.length; j++)
        {
            cells[j].style.fontFamily = fontFamily;
            cells[j].style.fontSize = fontSize;          
        }

    }   
}

function addClass(table, className){
    // table.setAttribute('class', className); // Überschreibt die Class komplett
    document.getElementsByTagName("Table").item(0).classList.add("myTable"); // fügt Class hinzu
}

function zebraMuster(table, bColor){
    let rows = table.getElementsByTagName('tr');
    for(var i = 0; i < rows.length; i+=2)
    {
        rows[i].style.backgroundColor = bColor;
    }
}

function addRow (){
    const tr = document.getElementsByTagName('tbody').item(0).appendChild(document.createElement('tr'));
    tr.appendChild(document.createElement("td")).innerText = "Schmutzler";
    tr.appendChild(document.createElement("td")).innerText = "Simon";
    tr.appendChild(document.createElement("td")).innerText = "2";
    tr.appendChild(document.createElement("td")).innerText = "9";
}

function setLink(){
    const link = document.getElementsByTagName("a").item(0);
    link?.setAttribute("href", "https://www.proleit.com/");
    link?.setAttribute("target","_blank");
}

changeTableStyle(table, "Arial", 20, "yellowgreen", "3px solid black");
addClass(table, "myTable");
zebraMuster(table, "aquamarine");
addRow();
changeTableStyle(table, "Arial", 20, "yellowgreen", "3px solid black");
setLink();









