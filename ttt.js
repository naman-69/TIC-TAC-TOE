let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#resetButt');
let newGameBtn = document.querySelector('#newbutt');
let msg = document.querySelector('#mms');
let msgContainer = document.querySelector('.msg');
let count=0;

let turn0 = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        count=count+1;
        console.log("Button clicked");
        if(turn0){
            box.innerHTML = "O";
            turn0 = false;
        }
        else{
            box.innerHTML = "X";
            turn0 = true; 
        }
        box.disabled = true;

        checkWinner(count);
    });
});

const checkWinner = (number) => {
    let key=false;
    for (pattern of winPatterns){
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if(pos1Value != "" && pos2Value != "" && pos3Value != ""){
            if(pos1Value === pos2Value  && pos2Value === pos3Value){
                console.log("Winner" , pos3Value);
                showWinner(pos1Value);
                key=true;
            }
        }
    }
    if(number===9){
        if(!key){
            showDraw();
        }
    }
};

const showDraw = () => {
    msg.innerText = 'Match Tied';
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showWinner = (winner) => {
     msg.innerText = `Congratulations, Winner is ${winner}`;
     msgContainer.classList.remove("hide");
     disableBoxes();
}

const disableBoxes = () => {
    for(box of boxes){
        box.disable = true;
    }
}

const enableBoxes = () => {
    for(box of boxes){
        box.disabled = false;
        box.innerText="";
        count=0;
    }
}

const resetGame = ()=> {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");

}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);