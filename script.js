var areaGame = document.querySelector(".area-game");
var scoreOne = document.querySelector(".one-score-div");
var scoreTurn = document.querySelector(".score-turn");
var scoreTwo = document.querySelector(".two-score-div");
var continueButton = document.querySelector(".continue-button");
var winnerLabel = document.querySelector(".winnerLabel")
var winnerDiv = document.querySelector(".winnerDiv");
var tilesArray = document.querySelectorAll(".tile");

var game = {
    turn: "X",
    tilesArrayBoard: [],
    lastWinner: "",
    setTurn() {
        if(this.turn == "X") this.turn = "O";
        else this.turn = "X";
    },
    verifyWinner(player){
        if (this.tilesArrayBoard.some(row => row.every(cell => cell.innerHTML === player))) {
            return true;
        }
        
        for (let col = 0; col < 3; col++) {
            if (this.tilesArrayBoard.every(row => row[col].innerHTML === player)) {
              return true;
            }
        }

        if (this.tilesArrayBoard.every((row, index) => row[index].innerHTML === player)) {
            return true;
        }

        if (this.tilesArrayBoard.every((row, index) => row[2 - index].innerHTML === player)) {
            return true;
        }

        return false;
    },
    restart(){
        this.tilesArrayBoard.forEach((row) => {
            row.forEach((col) => {
                col.innerHTML = "";
            });
        });
        if(this.lastWinner == "E"){
            this.turn = this.turn === 'X' ? 'O' : 'X';
        }else{
            this.turn = this.lastWinner;
        }
        scoreTurn.innerHTML = this.turn;
        var oppositeTurn = this.turn === 'X' ? 'O' : 'X';
        scoreTurn.classList.remove(oppositeTurn);
        scoreTurn.classList.add(this.turn);
    },
    isFull(){
        for (let i = 0; i < this.tilesArrayBoard.length; i++) {
            for (let j = 0; j < this.tilesArrayBoard[i].length; j++) {
              if (this.tilesArrayBoard[i][j].innerHTML === "") {
                return false;
              }
            }
          }
          return true;
    }
};

continueButton.addEventListener('click', () => {
    game.restart();
    winnerDiv.classList.toggle("show");
});

(function(){
    let tilesArrayObject = [];
    tilesArray.forEach((tile) => {
        tile.addEventListener('click', (e) => {
            e.preventDefault();
            if(tile.innerHTML == ""){
                tile.innerHTML = game.turn;

                var oppositeTurn = game.turn === 'X' ? 'O' : 'X';
                tile.classList.remove(oppositeTurn);
                tile.classList.add(game.turn);

                game.setTurn();
                scoreTurn.innerHTML = game.turn;
                

                var oppositeTurn = game.turn === 'X' ? 'O' : 'X';
                scoreTurn.classList.remove(oppositeTurn);
                scoreTurn.classList.add(game.turn);

                
                

                if (game.verifyWinner('X')) {
                    console.log('Jogador X ganhou!');
                    winnerLabel.innerHTML = "Jogador X ganhou!";
                    winnerDiv.classList.toggle("show");
                    game.lastWinner = "X";
                    scoreOne.innerHTML = parseInt(scoreOne.innerHTML) + 1;
                } else if (game.verifyWinner('O')) {
                    console.log('Jogador O ganhou!');
                    winnerLabel.innerHTML = "Jogador O ganhou!";
                    winnerDiv.classList.toggle("show");
                    game.lastWinner = "O";
                    scoreTwo.innerHTML = parseInt(scoreTwo.innerHTML) + 1;
                } else if(game.isFull()){
                    console.log('Empate!');
                    winnerLabel.innerHTML = "Empate!";
                    winnerDiv.classList.toggle("show");
                    game.lastWinner = "E";
                }
            }
        });
        tilesArrayObject.push(tile);
    });
    for (let i = 0; i < tilesArrayObject.length; i += 3) {
        game.tilesArrayBoard.push(tilesArrayObject.slice(i, i + 3));
      }
})();


