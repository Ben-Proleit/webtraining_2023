function a2(){

    var table = document.getElementsByTagName("table")[0];
    table.style.fontFamily = "Arial";
    // console.log(table);
    Array.from(document.getElementsByTagName("th")).forEach(element => {
        element.style.backgroundColor = Math.floor(Math.random()*16777215).toString(16);
        element.style.border = "2px solid black";
        
});
}

function a3(){
    var table = document.getElementsByTagName("table")[0];
    table.setAttribute("class", "Table");
}

function a4(){
    Array.from(document.querySelectorAll("tr:nth-of-type(2n+1)")).forEach(element => {
        element.style.backgroundColor = "red";
    });
}

function a5(){
    var table = document.getElementsByTagName("table")[0];
    let newElement = document.createElement("tr");
    newElement.appendChild(addColumToNode("Wenzel"));
    newElement.appendChild(addColumToNode("Ruben"));
    newElement.appendChild(addColumToNode(2));
    newElement.appendChild(addColumToNode(9));
    table.appendChild(newElement);
}

function addColumToNode(text){
    let newChild = document.createElement("td");
    newChild.innerText = text;
    return newChild;
}

function a6(){
    var table = document.getElementsByTagName("tbody")[0];
    table.removeChild(document.querySelector("tr:nth-of-type(5)"));
}

function a7(){
    let Link = document.getElementsByTagName("a")[0];
    Link.href = "https://www.proleit.com/"
    Link.target = "_blank";
}

a6();
a2();
a3();
a5();
a7();
a4();