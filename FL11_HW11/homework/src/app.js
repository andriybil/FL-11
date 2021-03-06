let rootNode = document.getElementById('root');
let itemCounter = 0;
const MAX_ITEMS = 10;
let addButton;
let dragSrcEl = null;

function handleChange(event) {
    addButton = document.getElementById('add-button');
    addButton.disabled = !event.target.value;
}

function addItem() {
    let inputValue = document.getElementById('action-input').value;
    let itemContainer = document.createElement('div');
    itemContainer.className = 'item';
    itemContainer.draggable = true;

    let newCheckbox = document.createElement('button');
    let checkboxIcon = document.createElement('i');
    checkboxIcon.className = 'material-icons';
    checkboxIcon.appendChild(document.createTextNode('check_box_outline_blank'));
    newCheckbox.appendChild(checkboxIcon);
    itemContainer.appendChild(newCheckbox);
    itemContainer.appendChild(document.createTextNode(inputValue));

    let newEditBtn = document.createElement('button');
    let editIcon = document.createElement('i');
    editIcon.className = 'material-icons';
    editIcon.appendChild(document.createTextNode('create'));
    newEditBtn.appendChild(editIcon);
    itemContainer.appendChild(newEditBtn);

    let newSaveBtn = document.createElement('button');
    let saveIcon = document.createElement('i');
    saveIcon.className = 'material-icons';
    saveIcon.appendChild(document.createTextNode('save'));
    newSaveBtn.appendChild(saveIcon);
    itemContainer.appendChild(newSaveBtn);
    newSaveBtn.style.display = 'none';


    let deleteButton = document.createElement('button');
    let icon = document.createElement('i');
    icon.className = 'material-icons';
    icon.appendChild(document.createTextNode('delete'));
    deleteButton.appendChild(icon);
    itemContainer.appendChild(deleteButton);

    rootNode.appendChild(itemContainer);
    itemCounter++;
    document.getElementById('action-input').value = '';
    addButton.disabled = true;
    addEventsDragAndDrop(itemContainer);

    newCheckbox.onclick = function () {
        checkboxIcon.innerText = 'check_box';
        newCheckbox.disabled = true;
    }

    newEditBtn.onclick = function () {
        newEditBtn.style.display = 'none';
        itemContainer.contentEditable = 'true';
        newSaveBtn.style.display = '';
    }
    
    newSaveBtn.onclick = function () {
        newEditBtn.style.display = '';
        itemContainer.contentEditable = 'false';
        newSaveBtn.style.display = 'none';
    }



    deleteButton.onclick = function () {
        itemContainer.remove();
        itemCounter--;
        document.querySelector('.alert').style.display = 'none';
        addButton.disabled = false;
        document.getElementById('action-input').disabled = false;
    }

    if (itemCounter === MAX_ITEMS) {
        document.querySelector('.alert').style.display = 'block';
        addButton.disabled = true;
        document.getElementById('action-input').disabled = true;
    }

}
//DnD
function dragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
    this.classList.add('dragElem');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('over');
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function dragDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    if (dragSrcEl !== this) {
        this.parentNode.removeChild(dragSrcEl);
        let dropHTML = e.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        let dropElem = this.previousSibling;
        addEventsDragAndDrop(dropElem);
    }
    this.classList.remove('over');
    return false;
}


function dragEnd() {
    this.classList.remove('over');
}

function addEventsDragAndDrop(el) {
    el.addEventListener('dragstart', dragStart, false);
    el.addEventListener('dragover', dragOver, false);
    el.addEventListener('dragleave', dragLeave, false);
    el.addEventListener('drop', dragDrop, false);
    el.addEventListener('dragend', dragEnd, false);
}

let listItems = document.querySelectorAll('#root .item');
[].forEach.call(listItems, addEventsDragAndDrop);