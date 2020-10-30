const originalMatrix = [1,2,3,4,5,6,7,8,9,10,11,0], totalNoOfElements = 12, totalRows = 3, noOfElementPerRow = originalMatrix.length/totalRows;
let rows = [], nos = [];
let elementsToMove = [], indexEmptyRowEle = null, rowIndexContainingEmpty = 0;
let dragged = '';
function sample () {
    return originalMatrix[Math.floor(Math.random()*originalMatrix.length)];
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    dragged = ev;
}

function drop(ev) {
    if (elementsToMove.indexOf(parseInt(dragged.target.innerText)) > -1) {
        ev.preventDefault();
        ev.target.style.top = (ev.target.offsetTop - 2) + "px";
        ev.target.style.left = (ev.target.offsetLeft - 0) + "px";
        const origcloneNode = document.getElementById(dragged.target.id).cloneNode(true);
        origcloneNode.draggable = true;
        origcloneNode.ondragstart = drag;
        const empcloneNode = document.getElementById(ev.target.id).cloneNode(true);
        empcloneNode.ondrop = drop;
        empcloneNode.ondragover = allowDrop;
        ev.target.replaceWith(origcloneNode);
        dragged.target.replaceWith(empcloneNode);
        restructureElements();
    }
}

function restructureElements() {
    const validateArr = [];
    const children = document.getElementById('mainDiv').childNodes;
    const childNodesLength = children.length;
    rows = [], nos = [];
    for(let i=0; i<childNodesLength; i++) {
        if(children[i] && children[i].id) {
            const content = parseInt(children[i].textContent);
            validateArr.push(content);
            const len = rows.length;
            pushToRow(content, len);
        }
    }

    highlightNeighbouringElemets(rows);
}

compareWithOriginalArr() {
      
}

function createNewDivElement(pickedNo) {
    let divElement = document.createElement('div');
    divElement.className = 'noDiv';
    divElement.draggable = true;
    divElement.ondragstart = drag;
    divElement.innerHTML = pickedNo;
    divElement.id = pickedNo + 'no';
    if(pickedNo === 0) {
        divElement.className = 'emptyClass noDiv';
        divElement.ondrop = drop;
        divElement.ondragover = allowDrop;
    }
    return divElement;
}

function pushToRow(pickedNo, len) {
    nos.push(pickedNo);
    const itemsInRow = nos.length;
    if(itemsInRow === noOfElementPerRow) {
        rows.push(nos);
        nos = [];
    }
    if(pickedNo === 0) {
        indexEmptyRowEle = itemsInRow - 1;
        rowIndexContainingEmpty = (len === 0) ? 0 : len;
    }
}

function load() {
    rows = [], nos = [];
    let mainDiv = document.getElementById('mainDiv'); 
    for(let i=0;i<totalNoOfElements;i++) {
        const pickedNo = sample();
        let divElement = createNewDivElement(pickedNo);
        const index = originalMatrix.indexOf(pickedNo);
        const len = rows.length;
        pushToRow(pickedNo, len);
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
}
