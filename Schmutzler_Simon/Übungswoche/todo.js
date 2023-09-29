var counter = 0;

window.alert("Bitte gebe deine ToDos ein!")

function addTodo() {


    var todoInput = document.getElementById("todoInput");
    var todoList = document.getElementById("todoList");


    if (todoInput.value.trim() != '') {
        var li = document.createElement("li");
        var span = document.createElement("span");
        span.style = "margin: 10px";
        span.textContent = todoInput.value;
        li.appendChild(span);

        var removeButton = document.createElement('button');
        //removeButton.textContent = 'Delete';
        removeButton.style = "margin-left: 10px;"
        removeButton.innerHTML += "<img src='trash3.svg' width ='20' height='20'></img>"
        removeButton.onclick = function () {
            todoList.removeChild(li);
        }

        var editButton = document.createElement('button');
        //editButton.textContent = 'Edit';
        editButton.style = "margin-left: 10px;"
        editButton.innerHTML += "<img src='pencil-square.svg' width ='20' height='20'></img>"
        editButton.onclick = function () {
            var newText = prompt('Neuer Text', span.textContent);
            if (newText.trim() != '') {
                span.textContent = newText;
            }
        }

        var finishButton = document.createElement('button');
        //finishButton.textContent = 'Finish'
        finishButton.style = "margin-left: 10px;"
        finishButton.innerHTML += "<img src='check2.svg' width ='20' height='20'></img>"
        finishButton.onclick = function () {
            span.innerHTML = "<del>" + span.textContent + "</del>";
        }


        li.appendChild(editButton);
        li.appendChild(removeButton);
        li.appendChild(finishButton);

        todoList.appendChild(li);
    }
    /*

    var listItem = '<div style=font-size:15pt> <button id=counter onclick="editTodo()" class="grid13 editButton">Edit</button> <button onclick="deleteTodo()" class="grid13 deleteButton">Delete</button> <button id=@ID onclick="finishTodo(@ID)" class="grid13 finishButton">Finish</button> <br></br></div>';
    listItem.replaceAll('@ID', counter );

    counter++;
    document.getElementById("todoList").innerHTML += listItem;
    */
}



function testFunction() {
    window.alert("Alarm");
}