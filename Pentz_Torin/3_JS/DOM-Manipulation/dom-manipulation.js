
DoPart2()
DoPart3()
ColorRowsAsAZebra()
DoPart5()
DoPart6("Blum")
LinkTheProLeiT()

function DoPart2() {
    document.getElementsByTagName("body")[0].style.fontFamily = "Impact,Charcoal,sans-serif";


    let myTableHeaders = document.getElementsByTagName("th")
    SetBackgroundForList(myTableHeaders, "#17A")

}

function SetBackgroundForList(list, color) {
    for (let i = 0; i < list.length; i++) {
        list[i].style.backgroundColor = color
        list[i].style.border = "thick solid #000"

    }

}

function DoPart3() {
    let table = document.getElementsByTagName("table")[0];
    let tableStyle = `
       table {
            margin: 20px 20px 20px 20px;
           width: calc(100% - 40px)
        }
    `
    let styleSheet = document.createElement("style")
    styleSheet.innerText = tableStyle
    table.appendChild(styleSheet)

}

function ColorRowsAsAZebra() {
    let rows = document.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        if (i % 2 == 0)
            rows[i].style.backgroundColor = '#3DCD58'
        else
            rows[i].style.backgroundColor = '#c1e1ff'

    }
}

function DoPart5() {
    let table = document.getElementsByTagName("table")[0];
    let row = document.createElement('tr');
    row.innerHTML = ` <td>Dittmar</td>
        <td>Ben</td >
        <td>7</td>
        <td>27</td>`
    table.appendChild(row);
    ColorRowsAsAZebra()
}

function DoPart6(name) {
    let placeNumber
    let childToRemove
    let childToRemoveIndex
    let table = document.getElementsByTagName("table")[0];
    let cells = document.getElementsByTagName("td");
    for (let i = 0; i < cells.length; i++) {

        if (cells[i].innerText == name) {
            placeNumber = cells[i + 3].innerText
            childToRemove = cells[i].parentElement
            childToRemoveIndex = (i + 7) / 4
            break;
        }
    }
    cells[cells.length - 1].innerText = placeNumber
    table.deleteRow(childToRemoveIndex)
    ColorRowsAsAZebra()

}

function LinkTheProLeiT() {
    let emptyLink = document.getElementsByTagName("a")[0];
    emptyLink.href = "https://www.proleit.com/"
    emptyLink.target = "_blank"
}