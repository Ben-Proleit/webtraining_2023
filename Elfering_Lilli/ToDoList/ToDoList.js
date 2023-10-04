function addEntry() {
    const divInput = document.getElementById('inputText').value;

    const divEntry = document.createElement('div');
    divEntry.id = 'divEntry';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    const entryText = document.createElement('div');
    entryText.id = 'entryText';
    entryText.append(divInput);

    const genericDiv1 = document.createElement('div');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn');
    const iEdit = document.createElement('i');
    iEdit.classList.add('fa', 'fa-edit');

    const genericDiv2 = document.createElement('div');
    const buttonTrash = document.createElement('button');
    buttonTrash.classList.add('btn');
    const iTrash = document.createElement('i');
    iTrash.classList.add('fa', 'fa-trash');

    const div4 = document.getElementById('div4');



    div4.appendChild(divEntry);
    divEntry.appendChild(checkbox);
    divEntry.appendChild(entryText);
    divEntry.appendChild(genericDiv1);
    genericDiv1.appendChild(buttonEdit);
    buttonEdit.appendChild(iEdit);
    divEntry.appendChild(genericDiv2);
    genericDiv2.appendChild(buttonTrash);
    buttonTrash.appendChild(iTrash);
}