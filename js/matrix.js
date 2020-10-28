const originalMatrix = [1,2,3,4,5,6,7,8,9,10,11,''];
const generatedMatrix = [];
const totalNoOfElements = 12;
const totalRows = 3;
let elementsToMove = [];
const noOfElementPerRow = originalMatrix.length/totalRows;
let emptyElement = null;
let indexEmptyRowEle = null;
let rowIndexContainingEmpty = 0;
function sample () {
    return originalMatrix[Math.floor(Math.random()*originalMatrix.length)];
}

function moveElement(ele) {
    const movedEle = parseInt(ele.target.innerText);
    if (elementsToMove.indexOf(movedEle) > -1) {
        const currentElementIndex = generatedMatrix.indexOf(movedEle);
        generatedMatrix[emptyElement] = movedEle;
        emptyElement = currentElementIndex;
        generatedMatrix[currentElementIndex] = '';
        console.log("after changing", generatedMatrix);
    }
}

function load() {
    let mainDiv = document.getElementById('mainDiv');
    for(let i=0;i<totalNoOfElements;i++) {
        const pickedNo = sample();
        let divElement = document.createElement('div');
        divElement.className = 'noDiv';
        divElement.onclick = moveElement;
        if(pickedNo === '') {
            emptyElement = i;
            divElement.className = 'emptyClass noDiv';
        }
        divElement.innerHTML = pickedNo;
        const index = originalMatrix.indexOf(pickedNo);
        generatedMatrix.push(pickedNo);
        originalMatrix.splice(index, 1); 
        mainDiv.appendChild(divElement);
    } 
    highlightElement(); 
}

function highlightElement() {
    let startInd = 0, endEle = noOfElementPerRow;
    const rows = []
    for(let j=0;j<totalRows;j++) {
        if(j > 0) {
            startInd = startInd + noOfElementPerRow;
            endEle = endEle + noOfElementPerRow;
        }
        const rowElemets = generatedMatrix.slice(startInd, endEle);
        if(indexEmptyRowEle === null) {
            const index = rowElemets.indexOf('');
            if (index > -1) {
                indexEmptyRowEle  = index;
                rowIndexContainingEmpty = (rows.length === 0) ? 0 : rows.length;
            }
        }
        rows.push(rowElemets);        
    }
    console.log(rows, rowIndexContainingEmpty, indexEmptyRowEle, 'genrated');
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
      console.log('elements', elements);
}
