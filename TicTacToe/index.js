console.log("hello");

let canvas = document.getElementById("grid");
let context = canvas.getContext("2d");



let x;
let y;
let x0 = canvas.width / 3
let y0 = canvas.height / 3;
let pO = true;
let pX = false;

let scoreX = 0;
let scoreO = 0;

let gridArr = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
//                  h         v         d1        d2
let result = [[false, 0], [false, 0], [false, 0], [false, 0]];

console.log(gridArr.length);

let withPlayer2;
let playPC = false;

function insert(x, y, player) {
    if (x < x0 && y < y0) {
        if (gridArr[0][0] != "")
            return false;
        gridArr[0][0] = player;
    }
    else if (x0 < x && x < x0 * 2 && y < y0) {
        if (gridArr[0][1] != "")
            return false;
        gridArr[0][1] = player;
    }
    else if (x > x0 * 2 && y < y0) {
        if (gridArr[0][2] != "")
            return false;
        gridArr[0][2] = player;
    }

    else if (x < x0 && y > y0 && y < y0 * 2) {
        if (gridArr[1][0] != "")
            return false;
        gridArr[1][0] = player;
    }
    else if (x0 < x && x < x0 * 2 && y > y0 && y < y0 * 2) {
        if (gridArr[1][1] != "")
            return false;
        gridArr[1][1] = player;
    }
    else if (x > x0 * 2 && y > y0 && y < y0 * 2) {
        if (gridArr[1][2] != "")
            return false;
        gridArr[1][2] = player;
    }

    else if (x < x0 && y > y0 * 2) {
        if (gridArr[2][0] != "")
            return false;
        gridArr[2][0] = player;
    }
    else if (x0 < x && x < x0 * 2 && y > y0 * 2) {
        if (gridArr[2][1] != "")
            return false;
        gridArr[2][1] = player;
    }
    else if (x0 * 2 < x && y > y0 * 2) {
        if (gridArr[2][2] != "")
            return false;
        gridArr[2][2] = player;
    }
    return true;
};

function checWin(player) {
    //return checkHor()[1] == 3 && checkVer()[1] == 3 && checkDir1()[1] == 3 && checkDir2()[1] == 3;
    let horVer = false;
    for (let i = 0; i < gridArr.length; i++) {
        if (checkHor(player, i)[1] == 3 || checkVer(player, i)[1] == 3) {
            horVer = true;
            break;
        }
    }
    //console.log(checkDir1()[1] == 3 )//|| checkDir2()[1] == 3);
    return horVer || checkDir1(player)[1] == 3 || checkDir2(player)[1] == 3;
}
function checkHor(player, index) {
    let counterPLayer = 0;
    let indexEmpty;
    let emptyCounter = 0;
    for (let i = 0; i < gridArr[index].length; i++) {
        if (gridArr[index][i] == player) {
            counterPLayer++;
            result[0][1] = (counterPLayer == 3) ? (index + 1) : 0;
            console.log(result);
        }
        if (gridArr[index][i] == "") {
            emptyCounter++;
        }
    }
    indexEmpty = emptyCounter == 1;
    if (counterPLayer == 3) {
        result[0][0] = true;
    }
    return [indexEmpty, counterPLayer];
}
function checkVer(player, index) {
    let counterPLayer = 0;
    let indexEmpty;
    let emptyCounter = 0;
    for (let i = 0; i < gridArr[index].length; i++) {
        if (gridArr[i][index] == player) {
            counterPLayer++;
            result[1][1] = counterPLayer == 3 ? index + 1 : 0;
            console.log(result);
        }
        if (gridArr[i][index] == "") {
            emptyCounter++;
        }
    }
    indexEmpty = emptyCounter == 1;
    if (counterPLayer == 3) {
        result[1][0] = true;
    }
    return [indexEmpty, counterPLayer];
}
function checkDir1(player) {
    let counterPLayer = 0;
    let indexEmpty;
    let emptyCounter = 0;
    for (let i = 0; i < gridArr.length; i++) {
        for (let j = 0; j < gridArr.length; j++) {
            if (j == i) {
                if (gridArr[i][j] == player) {
                    counterPLayer++;
                    result[2][1] = counterPLayer == 3 ? i + 1 : 0;
                }
                if (gridArr[i][j] == "") {
                    emptyCounter++;
                }
            }
        }
    }
    indexEmpty = emptyCounter == 1;
    if (counterPLayer == 3) {
        result[2][0] = true;
    }
    return [indexEmpty, counterPLayer];
}
function checkDir2(player) {
    let counterPLayer = 0;
    let indexEmpty;
    let emptyCounter = 0;
    for (let i = 0; i < gridArr.length; i++) {
        for (let j = gridArr.length - 1; j >= 0; j--) {
            if ((i == 0 && j == 2) || (i == 1 && j == 1) || (i == 2 && j == 0)) {
                if (gridArr[i][j] == player) {
                    counterPLayer++;
                    result[3][1] = counterPLayer == 3 ? i + 1 : 0;
                }
                if (gridArr[i][j] == "") {
                    emptyCounter++;
                }
            }
        }
    }
    indexEmpty = emptyCounter == 1;
    if (counterPLayer == 3) {
        result[3][0] = true;
    }
    return [indexEmpty, counterPLayer];
}

function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 10;
    context.strokeStyle = "black";
    context.beginPath();
    context.moveTo(canvas.width / 3, 0);
    context.lineTo(canvas.width / 3, canvas.height);
    context.moveTo(canvas.width / 3 * 2, 0);
    context.lineTo(canvas.width / 3 * 2, canvas.height);

    context.moveTo(0, canvas.height / 3);
    context.lineTo(canvas.width, canvas.height / 3);
    context.moveTo(0, canvas.height / 3 * 2);
    context.lineTo(canvas.width, canvas.height / 3 * 2);
    context.stroke();

    context.font = "60px cursive";
    context.textAlign = "start";
    for (let i = 0; i < gridArr.length; i++) {
        console.log(i);
        for (let j = 0; j < gridArr[i].length; j++) {
            if (gridArr[i][j] != "") {
                if (i == 0) {
                    if (j == 0)
                        context.fillText(gridArr[i][j], 15, 65);
                    if (j == 1)
                        context.fillText(gridArr[i][j], 15 * 6.8, 65);
                    if (j == 2)
                        context.fillText(gridArr[i][j], 15 * 6.8 * 1.8, 65);
                }
                else if (i == 1) {
                    if (j == 0)
                        context.fillText(gridArr[i][j], 15, 65 * 2.3);
                    if (j == 1)
                        context.fillText(gridArr[i][j], 15 * 6.8, 65 * 2.3);
                    if (j == 2)
                        context.fillText(gridArr[i][j], 15 * 6.8 * 1.8, 65 * 2.3);
                }
                else if (i == 2) {
                    if (j == 0)
                        context.fillText(gridArr[i][j], 15, 65 * 2.3 * 1.56);
                    if (j == 1)
                        context.fillText(gridArr[i][j], 15 * 6.8, 65 * 2.3 * 1.56);
                    if (j == 2)
                        context.fillText(gridArr[i][j], 15 * 6.8 * 1.8, 65 * 2.3 * 1.56);
                }
            }
        }
    }
}
drawCanvas();
let won = false;

let startPC = true;




function eventSeterPlay() {

    let player;
    let ss;

    canvas.addEventListener("mousedown", (event) => {
        if (!won) {
            //   return ("x: "+event.clientX+" "+"y: "+event.clientY);
            let rect = canvas.getBoundingClientRect();
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;

            console.log(x0 * 2, y0 * 2);
            console.log(x, y);

            if (!playPC || withPlayer2) {
                playPC = true;
                if (pO) {
                    player = "O";

                    pO = false;
                    pX = true;
                    if (!insert(x, y, player)) {
                        pO = true;
                        pX = false;
                    }
                    if (withPlayer2 && pX)
                        document.getElementById("p").innerHTML = "Play: X";
                }
                else {
                    player = "X";

                    pO = true;
                    pX = false;
                    if (!insert(x, y, player)) {
                        pO = false;
                        pX = true;
                    }
                    if (withPlayer2 && pO)
                        document.getElementById("p").innerHTML = "Play: O";

                }
            }
            drawCanvas();
            console.log(gridArr);

            ss = winning(player);


        }
        else {
            console.log("hi...");
            drawCanvas();
            if (withPlayer2) {
                player = player == "O" ? "X" : "O";
                document.getElementById("p").innerHTML = "Play: " + player;
            }
            else
                document.getElementById("p").innerHTML = "Play: with PC";
            won = false;
        }
        if (!withPlayer2) {
            if (playPC && won == false) {
                playPC = false;
                setTimeout(() => {
                    PlayPC(player)
                }, 500);


            }

        }


    });

}

function winning(player) {
    let t = checWin(player);
    let total = 0;
    for (let i = 0; i < gridArr.length; i++) {
        for (let j = 0; j < gridArr.length; j++) {
            if (gridArr[i][j] == "") {
                total++;
            }
        }
    }
    if (t) {
        if (player == "X") {
            scoreX++;
        }
        else {
            scoreO++;
        }
        document.getElementById("s").innerHTML = `Score, O : ${scoreO} , X : ${scoreX}`;
        document.getElementById("p").innerHTML = `Player ${player} won !!!`;
        won = true;
        for (let i = 0; i < gridArr.length; i++) {
            for (let j = 0; j < gridArr.length; j++) {
                gridArr[i][j] = "";
            }
        }
        console.log(gridArr);
        console.log("player " + player + " wins");//blur(15px);
        //document.getElementById("grid").style.filter = "blur(15px)";
        if (result[0][0] == true) {
            if (result[0][1] == 1) {
                context.beginPath();
                context.moveTo(0, canvas.height / 5.6);
                context.lineTo(canvas.width, canvas.height / 5.6);
                context.stroke();
            }
            else if (result[0][1] == 2) {
                context.beginPath();
                context.moveTo(0, (canvas.height / 5.6) * 2.9);
                context.lineTo(canvas.width, canvas.height / 5.6 * 2.9);
                context.stroke();
            }
            else if (result[0][1] == 3) {
                context.beginPath();
                context.moveTo(0, canvas.height / 5.6 * 4.7);
                context.lineTo(canvas.width, canvas.height / 5.6 * 4.7);
                context.stroke();
            }
        }
        else if (result[1][0] == true) {
            if (result[1][1] == 1) {
                context.beginPath();
                context.moveTo(canvas.height / 5.6, 0);
                context.lineTo(canvas.height / 5.6, canvas.width);
                context.stroke();
            }
            else if (result[1][1] == 2) {
                context.beginPath();
                context.moveTo((canvas.height / 5.6) * 2.9, 0);
                context.lineTo(canvas.height / 5.6 * 2.9, canvas.width);
                context.stroke();
            }
            else if (result[1][1] == 3) {
                context.beginPath();
                context.moveTo(canvas.height / 5.6 * 4.7, 0);
                context.lineTo(canvas.height / 5.6 * 4.7, canvas.width);
                context.stroke();
            }
        }
        else if (result[2][0] == true) {
            context.beginPath();
            context.moveTo(0, 0);
            context.lineTo(canvas.height, canvas.width);
            context.stroke();
        }
        else if (result[3][0] == true) {
            context.beginPath();
            context.moveTo(canvas.width, 0);
            context.lineTo(0, canvas.width);
            context.stroke()
        }

        result = [[false, 0], [false, 0], [false, 0], [false, 0]];

    }
    if (total == 0) {
        won = true;
        document.getElementById("p").innerHTML = `it's a tie !!!`;
        for (let i = 0; i < gridArr.length; i++) {
            for (let j = 0; j < gridArr.length; j++) {
                gridArr[i][j] = "";
            }
        }
    }
    return t;
}


document.getElementById("b1").onclick = function () {
    document.getElementById("p").style.display = "flex";
    document.getElementById("s").style.display = "flex";
    document.getElementById("buttons").style.display = "none";
    document.getElementById("grid").style.filter = "none";
    eventSeterPlay();
    withPlayer2 = false;
    document.getElementById("p").innerHTML = "Play: with PC";
};

document.getElementById("b2").onclick = function () {
    document.getElementById("p").style.display = "flex";
    document.getElementById("s").style.display = "flex";
    document.getElementById("buttons").style.display = "none";
    document.getElementById("grid").style.filter = "none";
    eventSeterPlay();
    withPlayer2 = true;
    playPC = false;
    document.getElementById("p").innerHTML = "Play: O";
};

function PlayPC(player) {
    let w = false;
    let hor, ver, dir1, dir2;
    let opp = player;
    player = opp == "O" ? "X" : "O";
    let x = Math.floor(Math.random() * 3)
    let y = Math.floor(Math.random() * 3);
    let f = false;
    //checWin
    for (let i = 0; i < gridArr.length; i++) {
        if (f) {
            break;
        }
        hor = checkHor(player, i);
        ver = checkVer(player, i);
        if (hor[0] && hor[1] == 2) {
            for (let j = 0; j < gridArr.length; j++) {
                if (gridArr[i][j] == "") {
                    gridArr[i][j] = player;
                    w = true;
                    f = true;
                    break;
                }
            }
        }
        else if (ver[0] && ver[1] == 2) {
            for (let j = 0; j < gridArr.length; j++) {
                if (gridArr[j][i] == "") {
                    gridArr[j][i] = player;
                    w = true;
                    f = true;
                    break;
                }
            }
        }
    }

    if (!w) {
        dir1 = checkDir1(player);
        dir2 = checkDir2(player);
        if (dir1[0] && dir1[1] == 2) {
            for (let i = 0; i < gridArr.length; i++) {
                if (f) {
                    break;
                }
                for (let j = 0; j < gridArr.length; j++) {
                    if (i == j) {
                        if (gridArr[i][j] == "") {
                            gridArr[i][j] = player;
                            w = true;
                            f = true;
                            break;
                        }
                    }
                }
            }
        }
        else if (dir2[0] && dir2 == 2) {
            for (let i = 0; i < gridArr.length; i++) {
                if (f) {
                    break;
                }
                for (let j = gridArr.length - 1; j >= 0; j--) {
                    if ((i == 0 && j == 2) || (i == 1 && j == 1) || (i == 2 && j == 0)) {
                        if (gridArr[i][j] == "") {
                            gridArr[i][j] = player;
                            w = true;
                            f = true;
                            break;
                        }
                    }
                }
            }
        }
    }

    //checklose
    if (!w) {
        for (let i = 0; i < gridArr.length; i++) {
            if (f) {
                break;
            }
            hor = checkHor(opp, i);
            ver = checkVer(opp, i);
            if (hor[0] && hor[1] == 2) {
                for (let j = 0; j < gridArr.length; j++) {
                    if (gridArr[i][j] == "") {
                        gridArr[i][j] = player;
                        w = true;
                        f = w;
                        break;
                    }
                }
            }
            else if (ver[0] && ver[1] == 2) {
                for (let j = 0; j < gridArr.length; j++) {
                    if (gridArr[j][i] == "") {
                        gridArr[j][i] = player;
                        w = true;
                        f = w;
                        break;
                    }
                }
            }
        }

        if (!w) {
            dir1 = checkDir1(opp);
            dir2 = checkDir2(opp);
            if (dir1[0] && dir1[1] == 2) {
                for (let i = 0; i < gridArr.length; i++) {
                    if (f) {
                        break;
                    }
                    for (let j = 0; j < gridArr.length; j++) {
                        if (i == j) {
                            if (gridArr[i][j] == "") {
                                gridArr[i][j] = player;
                                w = true;
                                f = w;
                                break;
                            }
                        }
                    }
                }
            }
            else if (dir2[0] && dir2[1] == 2) {
                for (let i = 0; i < gridArr.length; i++) {
                    if (f) {
                        break;
                    }
                    for (let j = gridArr.length - 1; j >= 0; j--) {
                        if ((i == 0 && j == 2) || (i == 1 && j == 1) || (i == 2 && j == 0)) {
                            if (gridArr[i][j] == "") {
                                gridArr[i][j] = player;
                                w = true;
                                f = w;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    let g = [];
    if (!w) {
        for (let i = 0; i < gridArr.length; i++) {
            for (let j = 0; j < gridArr.length; j++) {
                if (gridArr[i][j] == "") {
                    g.push([i,j]);
                }
            }
        }
        let indexing = g[Math.floor(Math.random() * g.length)];
        gridArr[indexing[0]][indexing[1]] = player;
    }
    drawCanvas();
    let results = winning(player);
    player = opp;
    pO = player == "O" ? true : false;
}
function stall() {console.log("stalling");}