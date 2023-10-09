function addEntry() {
    let divInput = document.getElementById('inputText').value;

    createDIVEntry('div4', divInput, false, true);

    document.getElementById('inputText').value = "";
}


function createDIVEntry(divToAppendTo, divInput, checkBoxChecked, editButton) {
    const divEntry = document.createElement('div');
    divEntry.id = 'divEntry';

    const checkbox = document.createElement('input');
    checkbox.id = 'checkDone';
    checkbox.type = 'checkbox';
    checkbox.checked = checkBoxChecked;
    checkbox.addEventListener('change', function(){ entryDone(this); });

    const entryText = document.createElement('div');
    entryText.id = 'entryText';
    entryText.append(divInput);
    

    const genericDiv2 = document.createElement('div');
    const buttonTrash = document.createElement('button');
    buttonTrash.classList.add('btn');
    const iTrash = document.createElement('i');
    iTrash.classList.add('fa', 'fa-trash');
    buttonTrash.addEventListener('click', function(){ removeEntry(this); });

    const div = document.getElementById(divToAppendTo);



    div.appendChild(divEntry);
    divEntry.appendChild(checkbox);
    divEntry.appendChild(entryText);

    if (editButton) {
        const genericDiv1 = document.createElement('div');
        const buttonEdit = document.createElement('button');
        buttonEdit.classList.add('btn');
        const iEdit = document.createElement('i');
        iEdit.classList.add('fa', 'fa-edit');
        buttonEdit.addEventListener('click', function(){ editEntry(this); });

        divEntry.appendChild(genericDiv1);
        genericDiv1.appendChild(buttonEdit);
        buttonEdit.appendChild(iEdit);
    }
    
    divEntry.appendChild(genericDiv2);
    genericDiv2.appendChild(buttonTrash);
    buttonTrash.appendChild(iTrash);
}



function editEntry(button) {
    const div4 = document.getElementById('div4');

    let parentDIV = button.parentElement.parentElement;
    let entryText = parentDIV.querySelector(':nth-child(2)').textContent;

    const divEdit = document.createElement('div');
    divEdit.id = 'divEdit';

    const divInput = document.createElement('div');
    divInput.id = 'divInput'
    const editedText = document.createElement('input');
    editedText.id = 'editedText';
    editedText.type = 'text';
    editedText.value = entryText;

    const divPlus = document.createElement('div');
    divPlus.id = 'divPlus'
    const buttonCheck = document.createElement('button');
    buttonCheck.classList.add('btn');
    const iCheck = document.createElement('i');
    iCheck.classList.add('fa', 'fa-check');

    parentDIV.replaceWith(divEdit);
    divEdit.appendChild(divInput);
    divInput.appendChild(editedText);
    divEdit.appendChild(divPlus);
    divPlus.appendChild(buttonCheck);
    buttonCheck.appendChild(iCheck);

    buttonCheck.addEventListener('click', function(){ confirmChange(divEdit, editedText); });
}


function confirmChange(divEdit, editedText) {
    createDIVEntry('div4', editedText.value, false, true);
    divEdit.remove();
}

function removeEntry(button) {
    let parentDIV = button.parentElement.parentElement;
    parentDIV.remove();
}


function entryDone(obj) {
    if(obj.checked == true){
        let parentDIV = obj.parentElement;
        let entryText = parentDIV.querySelector(':nth-child(2)').textContent;
        createDIVEntry('div6', entryText, true, false)
        parentDIV.remove();
      }
      else{
        let parentDIV = obj.parentElement;
        let entryText = parentDIV.querySelector(':nth-child(2)').textContent;
        createDIVEntry('div4', entryText, false, true)
        parentDIV.remove();
      }
}