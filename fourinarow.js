const cell00 = document.getElementById('00');
const cell01 = document.getElementById('01');
const cell02 = document.getElementById('02');
const cell03 = document.getElementById('03');
const cell04 = document.getElementById('04');
const cell05 = document.getElementById('05');
const cell06 = document.getElementById('06');
const cell10 = document.getElementById('10');
const cell11 = document.getElementById('11');
const cell12 = document.getElementById('12');
const cell13 = document.getElementById('13');
const cell14 = document.getElementById('14');
const cell15 = document.getElementById('15');
const cell16 = document.getElementById('16');
const cell20 = document.getElementById('20');
const cell21 = document.getElementById('21');
const cell22 = document.getElementById('22');
const cell23 = document.getElementById('23');
const cell24 = document.getElementById('24');
const cell25 = document.getElementById('25');
const cell26 = document.getElementById('26');
const cell30 = document.getElementById('30');
const cell31 = document.getElementById('31');
const cell32 = document.getElementById('32');
const cell33 = document.getElementById('33');
const cell34 = document.getElementById('34');
const cell35 = document.getElementById('35');
const cell36 = document.getElementById('36');
const cell40 = document.getElementById('40');
const cell41 = document.getElementById('41');
const cell42 = document.getElementById('42');
const cell43 = document.getElementById('43');
const cell44 = document.getElementById('44');
const cell45 = document.getElementById('45');
const cell46 = document.getElementById('46');
const cell50 = document.getElementById('50');
const cell51 = document.getElementById('51');
const cell52 = document.getElementById('52');
const cell53 = document.getElementById('53');
const cell54 = document.getElementById('54');
const cell55 = document.getElementById('55');
const cell56 = document.getElementById('56');

const redWinMsg = document.getElementById('redWon');
const yellowWinMsg = document.getElementById('yellowWon');
const tieMsg = document.getElementById('tie');

const restartButton = document.getElementById('restartButton');

console.log('test')

/*0 - blank, 1 - red, 2 - yellow.  6 tall 7 wide*/ 
let state = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
]

let board = [
    [cell00,cell01,cell02,cell03,cell04,cell05,cell06],
    [cell10,cell11,cell12,cell13,cell14,cell15,cell16],
    [cell20,cell21,cell22,cell23,cell24,cell25,cell26],
    [cell30,cell31,cell32,cell33,cell34,cell35,cell36],
    [cell40,cell41,cell42,cell43,cell44,cell45,cell46],
    [cell50,cell51,cell52,cell53,cell54,cell55,cell56],
]

gameCondition = [false,false,false]; /* red won, yellow won, tie */
won = false
redTurn = true;

function checkForClick(cell) {
    cell.addEventListener('click', function() {
        if (cell.classList.contains("blank") && !won) {
            if (redTurn){
                redTurn = false;
                for(let i = 5; i >= 0; i--){
                    if (state[i][cell.id % 10] == 0){
                        state[i][cell.id%10] = 1;
                        board[i][cell.id%10].classList.remove("blank");
                        board[i][cell.id%10].classList.add('red');
                        winCheck();
                        if (!freeSpace() && (!gameCondition[0] && !gameCondition[1])) {
                            gameCondition[2] = true;
                        }

                        break;
                    }
                }
            }
            else {
                redTurn = true;
                for(let i = 5; i >= 0; i--){
                    if (state[i][cell.id % 10] == 0){
                        state[i][cell.id%10] = 2;
                        board[i][cell.id%10].classList.remove("blank");
                        board[i][cell.id%10].classList.add('yellow');
                        winCheck();
                        if (!freeSpace() && (!gameCondition[0] && !gameCondition[1])) {
                            gameCondition[2] = true;
                            restartButton.style.display = "inline-block"; 
                            tieMsg.style.display = "inline-block";
                            console.log('tie');
                        }
                        break;
                    }
                }
            }
        }
    });
}

restartButton.addEventListener('click', function() {
    for (let i = 0; i < 6; i++) {
        for (let ii = 0; ii < 7; ii++){
            board[i][ii].classList.remove("yellow");
            board[i][ii].classList.remove("red");
            board[i][ii].classList.add("blank");
        }
    }

    state = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
    gameCondition = [false,false,false];
    won = false
    redTurn = true;
    restartButton.style.display = "none";
    redWinMsg.style.display = "none";
    yellowWinMsg.style.display = "none";
    tieMsg.style.display = "none";
});

function freeSpace(){
    for (let i = 0; i < state.length; i++){
        for (let ii = 0; ii < state[i].length; ii++){
            if (state[i][ii] == 0){
                return true;
            }
        }
    }
    return false;
}

function winCheck(){
    for (let i = 0; i < 6; i++) {
        /*console.log(`i: ${i}`);*/
        for (let j = 0; j < 7; j++){ /* vertical check */
            /*console.log(`j: ${j}`);*/
            if ((i > 2) && (j > 2)) {
                if ((state[i][j] == state[i-1][j-1]) && (state[i][j] == state[i-2][j-2]) && (state[i][j] == state[i-3][j-3]) && (state[i][j] != 0)){
                    if (state[i][j] == 1){gameCondition[0] = true; won=true; restartButton.style.display = "inline-block"; redWinMsg.style.display = "inline-block";}
                    if (state[i][j] == 2){gameCondition[1] = true; won=true; restartButton.style.display = "inline-block"; yellowWinMsg.style.display = "inline-block";}
                    break;
                }
            }

            if (j < 4){
                if (i > 2){
                    if ((state[i][j] == state[i-1][j+1]) && (state[i][j] == state[i-2][j+2]) && (state[i][j] == state[i-3][j+3]) && (state[i][j] != 0)){
                        if (state[i][j] == 1){gameCondition[0] = true; won=true; restartButton.style.display = "inline-block"; redWinMsg.style.display = "inline-block";}
                        if (state[i][j] == 2){gameCondition[1] = true; won=true; restartButton.style.display = "inline-block"; yellowWinMsg.style.display = "inline-block";}
                        break;
                    }
                }

                if (state[i][j] == state[i][j+1] && state[i][j] == state[i][j+2] && state[i][j] == state[i][j+3] && (state[i][j] != 0)){
                    if (state[i][j] == 1){gameCondition[0] = true; won=true; restartButton.style.display = "inline-block"; redWinMsg.style.display = "inline-block";}
                    if (state[i][j] == 2){gameCondition[1] = true; won=true; restartButton.style.display = "inline-block"; yellowWinMsg.style.display = "inline-block";}
                    break;
                }
            }
            
            if (i < 3){
                if (j < 4){
                    if ((state[i][j] == state[i+1][j+1]) && (state[i][j] == state[i+2][j+2]) && (state[i][j] == state[i+3][j+3]) && (state[i][j] != 0)){
                        if (state[i][j] == 1){gameCondition[0] = true; won=true; restartButton.style.display = "inline-block"; redWinMsg.style.display = "inline-block";}
                        if (state[i][j] == 2){gameCondition[1] = true; won=true; restartButton.style.display = "inline-block"; yellowWinMsg.style.display = "inline-block";}
                        break;
                    }
                }

                if (j > 2){
                    if ((state[i][j] == state[i+1][j-1]) && (state[i][j] == state[i+2][j-2]) && (state[i][j] == state[i+3][j-3]) && (state[i][j] != 0)){
                        if (state[i][j] == 1){gameCondition[0] = true; won=true; restartButton.style.display = "inline-block"; redWinMsg.style.display = "inline-block";}
                        if (state[i][j] == 2){gameCondition[1] = true; won=true; restartButton.style.display = "inline-block"; yellowWinMsg.style.display = "inline-block";}
                        break;
                    }
                }

                if ((state[i][j] == state[i+1][j]) && (state[i][j] == state[i+2][j]) && (state[i][j] == state[i+3][j]) && (state[i][j] != 0)){
                    if (state[i][j] == 1){gameCondition[0] = true; won=true; restartButton.style.display = "inline-block"; redWinMsg.style.display = "inline-block";}
                    if (state[i][j] == 2){gameCondition[1] = true; won=true; restartButton.style.display = "inline-block"; yellowWinMsg.style.display = "inline-block";}
                    break;
                }
            }
        }
    }

}

for (let i = 0; i < board.length; i++) {
    for (let ii = 0; ii < board[i].length; ii++){
        checkForClick(board[i][ii])
    }
}
