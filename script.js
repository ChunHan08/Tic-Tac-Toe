let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnX = true;

let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];
const resetGame = () => {
  turnX = true;
  count = 0;
  enableBox();
  msgContainer.classList.add("hide")
}
boxes.forEach((box) => {
  
  box.addEventListener ("click", () => {
    
    console.log("box was clicked")
    if (turnX) {
      box.innerText = "X";
      turnX = false;
    } else {
      box.innerText = "O";
      turnX = true;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});
const enableBox = () =>{
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
    msgContainer.classList.add("hide")
  }
}
const showWinner = (winner) => {  
  msg.innerText = `Congratulations, Winner is ${winner}`; // Use backticks for string interpolation
  msgContainer.classList.remove("hide");
  disableBoxes();
}
const gameDraw = () => {
  msg.innerText = 'Game Was A Draw.';
  msg.Container.classList.remove("hide");
  disableBoxes();
};
const disableBoxes = () => {
  for(let box of boxes){
    box.disabled = true;
  }
}
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val)
        return true;
      }
    }
  }
};

resetBtn.addEventListener("click", resetGame); 