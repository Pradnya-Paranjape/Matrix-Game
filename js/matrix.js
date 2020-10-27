function load() {
    let noOfElement = 12;
    let mainDiv = document.getElementById('mainDiv');
    const arrayOfNos = [1,2,3,4,5,6,7,8,9,10,11];
    const newRandomNos = [];
    for(let i=1;i<noOfElement;i++) {
        const pickedNo = arrayOfNos.sample();
        let divElement = document.createElement('div');
        divElement.className = 'noDiv'
        divElement.innerHTML = pickedNo;
        const index = arrayOfNos.indexOf(pickedNo)
        arrayOfNos.splice(index, 1); 
        mainDiv.appendChild(divElement);
    }  
}

Array.prototype.sample = function() {
    return this[Math.floor(Math.random()*this.length)];
}