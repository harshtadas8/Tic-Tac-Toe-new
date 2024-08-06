/*accesing all the elements of website*/

let btn = document.querySelectorAll(".but");
let resscobtn = document.querySelector("#ressco");
let resetbtn = document.querySelector("#rebtn");
let turncard = document.querySelector("#turn");
let p1score = document.querySelector("#p1s");
let p2score = document.querySelector("#p2s");
let modal = document.querySelector("#modal");
let modres = document.querySelector("#modres");
let cancel = document.querySelector("#cancel");

/*declaring some helping variables, turnO is for showing turn is of player1 having symbol "O", count is for countinng the number of moves*/
let turnO = true;
let p1turn = true;
let count = 0;
let countp1 = 0;
let countp2 = 0;

/*storing winning patterns in an array*/

const winpat = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

/*this function shows the winner & also reset game automatically after 5 seconds*/
const showwinner = (winner) => {
  turncard.innerHTML = `<b>${winner} Won!</b>`;
  setTimeout(() => {
    turnO = true;
    count = 0;

    for (let but of btn) {
      but.disabled = false;
      but.innerText = "";
      turncard.innerHTML = "<b>Player 1's Turn<b/>";
    }
    modal.classList.add("hide");
  }, 5000);
};

/*this function resets scores or leaderboard showing player's turn also,disabling the bubttons after reseting*/
const resetscores = () => {
  count = 0;
  p1score.innerHTML = "<b>0</b>";
  p2score.innerHTML = "<b>0</b>";
  turncard.innerHTML = "<b>Player 1's Turn</b>";
  for (let but of btn) {
    but.disabled = false;
    but.innerText = "";
  }
};

/*showing player's turn*/
const turnshow = () => {
  if (p1turn) {
    turncard.innerHTML = "<b>Player 1's Turn</b>";
  } else {
    turncard.innerHTML = "<b>Player 2's Turn</b>";
  }
};

/*function checks for winner, and if winner not found, game is drawn*/
const checkwinner = () => {
  for (let patt of winpat) {
    let pos1 = btn[patt[0]].innerText;
    let pos2 = btn[patt[1]].innerText;
    let pos3 = btn[patt[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        console.log("winner detected");
        console.log(pos1, pos2, pos3);
        let win = true;
        
        for (let but of btn) {
          but.disabled = true;
        }

        showwinner(pos1);

        if (pos1 === "O") {
          console.log(countp1);
          countp1 = countp1 + 0.5;
          console.log(countp1);
          turncard.innerHTML = `<b>Player 1 Won!</b>`;
          p1score.innerHTML = `<b>${countp1}</b>`;
        } else {
          countp2 = countp2 + 0.5;
          turncard.innerHTML = `<b>Player 2 Won!</b>`;
          p2score.innerHTML = `<b>${countp2}</b>`;
        }
        return true;
      }
    }
  }
};

/*this function ensures that on clicking button, "O" and "X" are printed*/
btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (turnO) {
      btn.innerText = "O";
      console.log("O");
      turnO = false;
      p1turn = false;
      turnshow();
    } else {
      btn.innerText = "X";
      console.log("X");
      turnO = true;
      p1turn = true;
      turnshow();
    }
    checkwinner();
    btn.disabled = true;
    count++;
    let win = checkwinner();

    if (count === 9 && !win) {
      drawcond();
    }
  });
});

/*condition for draw condition*/
const drawcond = () => {
  console.log("drawn");
  turncard.innerHTML = "<b>Game is Draw!</b>";
  setTimeout(() => {
    turnO = true;
    count = 0;

    for (let but of btn) {
      but.disabled = false;
      but.innerText = "";
      turncard.innerHTML = "<b>Player 1's Turn<b/>";
    }
    modal.classList.add("hide");
  }, 5000);
};

/*assigning events to buttons*/
resscobtn.addEventListener("click", resetscores);
resetbtn.addEventListener("click", () => {
  modal.classList.remove("hide");
});
modres.addEventListener("click", () => {
  turnO = true;
  count = 0;

  for (let but of btn) {
    but.disabled = false;
    but.innerText = "";
    turncard.innerHTML = "<b>Player 1's Turn<b/>";
  }
  modal.classList.add("hide");
});

cancel.addEventListener("click", () => {
  modal.classList.add("hide");
});


