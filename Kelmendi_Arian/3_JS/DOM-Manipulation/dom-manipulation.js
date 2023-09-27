function Aufgabe2()
{
    document.querySelector("table").style.fontFamily = "Arial";
    document.querySelector("table").style.fontSize = "18px";

    let tableHeaders = document.getElementsByTagName("th");
    tableHeaders[0].style.backgroundColor = "#073a73";
    tableHeaders[1].style.backgroundColor = "#fc0";
    tableHeaders[2].style.backgroundColor = "#3dcd58";
    tableHeaders[3].style.backgroundColor = "#ca0130";

    for (var i = 0; i < tableHeaders.length; i++)
    {
        tableHeaders[i].style.border = "1px solid black";
    }
}

function Aufgabe3()
{
    document.querySelector("table").classList.add("tableClass");
}

function Aufgabe4()
{
    let evenRows = document.querySelectorAll("tr:nth-of-type(2n+1)");
    Array.from(evenRows).forEach((element) => {
        element.style.backgroundColor = "#f0f0f0";
    });
}

function Aufgabe5()
{
    let newRow = document.createElement("tr");
    addColumnToRow(newRow, "Siegreich");
    addColumnToRow(newRow, "Viktoria");
    addColumnToRow(newRow, "1");
    addColumnToRow(newRow, "64");

    document.querySelector("tbody").appendChild(newRow);
}

function addColumnToRow(rowNode, input)
{
    let columnNode = document.createElement("td");
    columnNode.innerText = input;
    rowNode.appendChild(columnNode);
}

function Aufgabe6()
{
    let rowToRemove = document.querySelector("tr:nth-of-type(5)");

    console.debug(rowToRemove);
    let rowNumber = rowToRemove.getElementsByTagName("td")[3].innerText;
    rowToRemove.parentNode.removeChild(rowToRemove);

    console.debug(document.querySelector("td:last-of-type"));

    document.querySelector("tr:last-of-type td:last-of-type").innerText = rowNumber;
}

function Aufgabe7()
{
    document.querySelector("a").href = "https://proleit.com/";
    document.querySelector("a").target = "_blank";
}


// Aufruf der Funktionen
Aufgabe2();
Aufgabe3();
Aufgabe4();
Aufgabe5();
Aufgabe6();
Aufgabe7();