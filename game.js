let mazePlanStorage = new Array (
                new Array (
                "###############",
                "#00010#000#000#",
                "#####0#0#0#0#0#",
                "#000#000#0#0#1#",
                "#0#######0#0###",
                "#00000#000#000#",
                "#0###0#0#####0#",
                "#000#0#0000000#",
                "###0#0#######0#",
                "S000#00001#000#",
                "#0###0#####0###",
                "#0#0#00000#0#0E",
                "#0#0#####0#0#0#",
                "#0000000#00000#",
                "###############"),
                new Array (
                "###############",
                "#0#0001#00#0#1#",
                "#0#0####0##0#0#",
                "S0#0#0##0##000#",
                "#000000#0000###",
                "#0####0#0###00#",
                "#000000#00000##",
                "######0#####0##",
                "#1#00000000000#",
                "#0######0###0##",
                "#000#0#000#000E",
                "##0##000#0##0##",
                "##0##0#0#0#00##",
                "#00000#00000###",
                "###############"),
                new Array (
                "####S##########",
                "#000000#0####0#",
                "#0####00000000#",
                "#000000#0##0###",
                "###0####000001#",
                "#000000####0###",
                "#0###0##000000#",
                "#01#000#0######",
                "####0###00#00##",
                "#00000000000#0#",
                "#0#######0###0E",
                "#00#1#000000#0#",
                "#0##0#0######0#",
                "#0000#00000000#",
                "###############"),
                new Array (
                "##########S####",
                "#000000#000000#",
                "##0#0#0000#####",
                "#00#0####000#1#",
                "##0##0##00###0#",
                "#00#00#00000#0#",
                "##0##0####0000#",
                "#0000000000####",
                "######0###0000#",
                "#100#00#0##0###",
                "###0000#00#000#",
                "E0#0#0000000#0#",
                "#0###0#####0#0#",
                "#000000000#0#1#",
                "###############")
                );
    
function randomMaze() { 

    // Random maze plan

    let numberOfMaze =  Math.floor(Math.random() * mazePlanStorage.length);
           
    return numberOfMaze;

}
                    
let mazePlan = mazePlanStorage[randomMaze()];
                               
let canvas = document.getElementById('maze');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let mazeWidth = mazePlan[0].length;
let mazeHeight = mazePlan.length;
    
let tileWidth = canvasWidth / mazeWidth;
let tileHeight = canvasHeight / mazeHeight;
    
let ctx = canvas.getContext('2d');
 
let player = {
    x: 1,
    y: 1,
    points: 0
}

function searchStart() {

    // Player position definied

    for (let  i = 0; i < mazePlan.length; i++) { //* row
        for (let  j = 0; j < mazePlan[i].length; j++) { //* column
            if (mazePlan[i][j] === 'S') {
                if ( j === 0) {
                    player.x = j + 1;
                    player.y = i;
                    return;
                } else
                    if (j === 14) {
                        player.x = j - 1;
                        player.y = i;
                        return;
                    } else
                        if (i === 0) {
                            player.x = j;
                            player.y = i + 1;
                            return;
                        } else
                            if ( j === 14) {
                                player.x = j;
                                player.y = i - 1;
                                return;
                            }
                
            }
        }
    }

}

searchStart();

let time = 60;
    
function drawWall(x, y) {

    ctx.fillStyle = '#009688';
    ctx.fillRect(x, y, tileWidth, tileHeight);

}
    
function drawBlank(x, y) {

    ctx.fillStyle = '#fffde4';
    ctx.fillRect(x, y, tileWidth, tileHeight);

}
    
function drawGold(x, y) {

    ctx.fillStyle = '#fee038';
    ctx.fillRect(x, y, tileWidth, tileHeight);

}
  
function drawExit(x, y) {

    ctx.fillStyle = '#a7dcd2';
    ctx.fillRect(x, y, tileWidth, tileHeight);

}
    
function drawEntrance(x, y) {

    ctx.fillStyle = '#0dd0bd';
    ctx.fillRect(x, y, tileWidth, tileHeight);

}
    
function drawPlayer() {

    ctx.fillStyle = '#11312e';
    ctx.fillRect(
                player.x * tileWidth, 
                player.y * tileHeight, 
                tileWidth, tileHeight);

}
 
function drawMaze() {

    for (let i = 0; i < mazePlan.length; i++) { // row
        for (let  j = 0; j < mazePlan[i].length; j++) { //* column
            let tileType = mazePlan[i][j];
        
            let x = j * tileWidth;
            let y = i * tileHeight;
        
            switch(tileType) {
                case '#': 
                    drawWall(x, y);
                    break;
                case '0':
                    drawBlank(x, y);
                    break;
                case '1':
                    drawGold(x, y);
                    break;
                case 'S':
                    drawEntrance(x, y);
                    break;
                case 'E':
                    drawExit(x, y);
                    break;
                default: 
                    break;
            }
        }
    }
    drawPlayer();

}
    
drawMaze();
    
function goLeft() {

    if (player.x < 1) return;
    if (mazePlan[player.y][player.x - 1] === '#') return;
    player.x--;

}
    
function goRight() {

    if (player.x === mazeWidth - 1) return;
    if (mazePlan[player.y][player.x + 1] === '#') return;
    player.x++;

}
    
function goDown() {

    if (player.y === mazeHeight -1) return;
    if (mazePlan[player.y + 1][player.x] === '#') return;
    player.y++;

}
    
function goUp() {

    if (player.y < 1) return;
    if (mazePlan[player.y - 1][player.x] === '#') return;
    player.y--;

}
    
function pickUpGold() {

    if (mazePlan[player.y][player.x] === '1') {
        player.points++;
        mazePlan[player.y] = 
            mazePlan[player.y].substr(0, player.x) +
            '0' +
            mazePlan[player.y].substr(player.x + 1);
    }

}
    
function showPreviousResults() {

    let results = document.getElementById('previousResults');
    results.innerText = (localStorage.getItem('gamesWon') 
                        ? localStorage.getItem('gamesWon') + ' game(s) won '
                        : '') +
                        (localStorage.getItem('gamesLost') 
                        ? localStorage.getItem('gamesLost') + ' game(s) lost '
                        : '')

                    }
    
showPreviousResults();
    
function storeResult(isGameWon) {

    if (isGameWon) {
        let newGamesWon = localStorage.getItem('gamesWon') 
                          ? parseInt(localStorage.getItem('gamesWon'))  + 1 
                            : 1;
        localStorage.setItem('gamesWon', newGamesWon);
        } else {
            let newGamesLost = localStorage.getItem('gamesLost') 
                            ? parseInt(localStorage.getItem('gamesLost'))  + 1 
                            : 1;
            localStorage.setItem('gamesLost', newGamesLost);
        }
    showPreviousResults();
    
}
 
function askQuestion() {

    // create paragraph

    let para = document.createElement('p');
    para.innerText = 'Would you like to play again?';

    let newGameDiv = document.getElementById('newGame');
    newGameDiv.appendChild(para);

    
    // create buttons
    
    let buttonOk = document.createElement('button');
    buttonOk.innerText = 'Ok';
    
    document.getElementById('buttons').appendChild(buttonOk);
    buttonOk.addEventListener('click', function () {
        window.location.reload()});
    
}

let clock = setInterval(function () {
    time--;
    if (time === 0) {
        clearInterval(clock);
        document.onkeydown = null
        document.getElementById('result').innerText = 'GAME OVER! your points: ' + player.points;
        storeResult(false);
        askQuestion();    
    }
    document.getElementById('time').innerText = time;
    }, 1000);



function checkEndOfGame() {

    if (player.points === 3 && mazePlan[player.y][player.x] === 'E') {
        clearInterval(clock);
        document.onkeydown = null;
        document.getElementById('result').innerText = 'YOU WON! your points: ' + player.points; 
        storeResult(true);
    }

}
 
document.onkeydown = function (event) {

    switch (event.keyCode) {
        case 37: goLeft(); break;
        case 38: goUp(); break;
        case 39: goRight(); break;
        case 40: goDown(); break;
        default: break;
    }
    pickUpGold();
    drawMaze();
    checkEndOfGame();

}
