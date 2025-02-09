const btns = document.querySelectorAll(".btn");
let board = Array(9).fill(null); // Store Xs and Os .
let count = 0;
let xWins = localStorage.getItem("xWins")
  ? parseInt(localStorage.getItem("xWins"))
  : 0;
let oWins = localStorage.getItem("oWins")
  ? parseInt(localStorage.getItem("oWins"))
  : 0;

document.getElementById('x-score').textContent = xWins  ;
document.getElementById('o-score').textContent = oWins ; 

btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (!board[index]) {
      btn.style.opacity = 1;
      board[index] = count === 0 ? "X" : "O"; //Store x or O in the array .
      btn.innerHTML = ` ${
        count === 0
          ? `<i class = "fa-solid fa-xmark"></i>`
          : `<i class = "fa-regular fa-circle"></i>`
      } `;
      count = 1 - count; // toggle turn .
      setTimeout(() => {
        checkWinner();
      }, 50);
    }
  });
});

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8], // Rows
    [0, 3, 6],[1, 4, 7],[2, 5, 8], // Cloumns
    [0, 4, 8],[2, 4, 6], // Diagonals
  ];

  for (const patern of winPatterns) {
    const [a, b, c] = patern; // Destrucuring : get three positions in the board .
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // Check if all three position have the same symbol (x or o)
      // we found a winner !

      // set color green for those boards are matched with patterns win .and we do this with adding win class to them .   
      document
        .querySelectorAll(".btn")
        [a].querySelector("i")
        .classList.add("win");
      document
        .querySelectorAll(".btn")
        [b].querySelector("i")
        .classList.add("win");
      document
        .querySelectorAll(".btn")
        [c].querySelector("i")
        .classList.add("win");

      setTimeout(() => {
        Swal.fire({
          title: `"${board[a]}" Wins! 🎉`,
          text: "Do you want to play again?",
          icon: "success",
          confirmButtonText: "Yes!",
          background: "#222",
          color: "#fff",
          confirmButtonColor: "#28a745",
        }).then(() => {
            updateScore(board[a]);
            resetGame();
          });
      }, 500);
      return ;
    }
  }

  if (!board.includes(null)) {
    // If board is full and no winner
    setTimeout(() => {
      Swal.fire({
      title : "It's a Draw!",
      icon : "info",
      confirmButtonText : "OK",
      background : "#222",
      color : "#fff"
      }).then(()=> resetGame()) ; 
    } , 500);
  }
}

function updateScore(winner){
  if(winner === "X"){
    xWins++; 
    localStorage.setItem('xWins' , xWins) ;  
  }else if (winner === "O"){
    oWins++ ;
    localStorage.setItem('oWins' , oWins);
  }
  document.getElementById('x-score').textContent = xWins  ;
  document.getElementById('o-score').textContent = oWins  ;
}

function resetGame() {
  board.fill(null);
  btns.forEach((btn) => (btn.innerHTML = ""));
  count = 0;
}

function resetScore(){
  localStorage.setItem('xWins' , 0);
  localStorage.setItem('oWins' , 0);

  // xWins and oWins reset the in-memory variable 
  xWins = 0 ; 
  oWins = 0 ; 
  
  document.getElementById('x-score').textContent = xWins  ;
  document.getElementById('o-score').textContent = oWins  ;
}


