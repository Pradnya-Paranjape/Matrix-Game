const originalMatrix = [1,2,3,4,5,6,7,8,9,10,11,''];
const generatedMatrix = [];
const totalNoOfElements = 12;
const totalRows = 3;
let elementsToMove = [];
const noOfElementPerRow = originalMatrix.length/totalRows;
let emptyElement = null;
let indexEmptyRowEle = null;
let rowIndexContainingEmpty = 0;
let dragged = '';
function sample () {
    return originalMatrix[Math.floor(Math.random()*originalMatrix.length)];
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    dragged = ev;
    const movedEle = parseInt(ev.target.innerText);
    if (elementsToMove.indexOf(movedEle) > -1) {
        // ev.dataTransfer.setData("text", ev.target.id);
    }
}

function drop(ev) {
    ev.preventDefault();
    // var data = ev.dataTransfer.getData("text");
    ev.target.style.top = (ev.target.offsetTop - 2) + "px";
    ev.target.style.left = (ev.target.offsetLeft - 0) + "px";
    const origcloneNode = document.getElementById(dragged.target.id).cloneNode(true);
    const empcloneNode = document.getElementById(ev.target.id).cloneNode(true);
    ev.target.replaceWith(origcloneNode);
    dragged.target.replaceWith(empcloneNode);
    // ev.target.appendChild(document.getElementById(data));
}

function moveElement(ele) {
    const elem = ele.target;
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const movedEle = parseInt(ele.target.innerText);
    if (elementsToMove.indexOf(movedEle) > -1) {
        // const currentElementIndex = generatedMatrix.indexOf(movedEle);
        // generatedMatrix[emptyElement] = movedEle;
        // emptyElement = currentElementIndex;
        // generatedMatrix[currentElementIndex] = '';
        document.getElementById(movedEle + 'no').onmousedown = dragMouseDown;
        console.log("after changing", generatedMatrix);
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elem.style.top = (elem.offsetTop - pos2) + "px";
        elem.style.left = (elem.offsetLeft - pos1) + "px";
        console.log('ele', elem);
      }
}



function load() {
    let mainDiv = document.getElementById('mainDiv'); 
    const rows = [];
    let nos = [];
    for(let i=0;i<totalNoOfElements;i++) {
        const pickedNo = sample();
        let divElement = document.createElement('div');
        divElement.className = 'noDiv';
        // divElement.onclick = moveElement;
        divElement.innerHTML = pickedNo;
        divElement.id = pickedNo + 'no';
        const index = originalMatrix.indexOf(pickedNo);
        nos.push(pickedNo);
        const itemsInRow = nos.length;
        if(itemsInRow === noOfElementPerRow) {
            rows.push(nos);
            nos = [];
        } 
        divElement.draggable = true;
        divElement.ondragstart = drag;
        if(pickedNo === '') {
            indexEmptyRowEle = itemsInRow - 1;
            rowIndexContainingEmpty = rows.length;
            emptyElement = i;
            divElement.className = 'emptyClass noDiv';
            divElement.ondrop = drop;
            divElement.ondragover = allowDrop;
        }
        generatedMatrix.push(pickedNo);
        originalMatrix.splice(index, 1); 
        mainDiv.appendChild(divElement);
    } 
    highlightNeighbouringElemets(rows); 
} 

function highlightNeighbouringElemets(rows) {
      let elements = [];
      const len = rows.length;
      elements.push(rows[rowIndexContainingEmpty][indexEmptyRowEle - 1]);
      elements.push(rows[rowIndexContainingEmpty][indexEmptyRowEle + 1]);
      for(let jk = 0; jk < len; jk++) {
          if(jk !== rowIndexContainingEmpty && ((jk - 1 === rowIndexContainingEmpty) || (jk + 1 === rowIndexContainingEmpty))) {
              elements.push(rows[jk][indexEmptyRowEle]);
          }
      }
      elementsToMove = elements;
      console.log('elements to move ', elementsToMove);
}
