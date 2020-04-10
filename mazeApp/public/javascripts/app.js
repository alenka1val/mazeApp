
function start() {

    var timeCounter = width * 2;

    Mymatrix = Mymatrix.split(',');

    const settings = {
        matrix: Mymatrix,
        width: width,
        height: height,
        wallSize: 10,
        entryType: 'diagonal',
        color: '#000000',
        backgroudColor: '#FFFFFF',
        solveColor: '#cc3737',

        // restrictions
        maxMaze: maxMaze,
        maxCanvas: maxCanvas,
        maxCanvasDimension: maxCanvasDimension,
        maxSolve: maxSolve,
        maxWallsRemove: maxWallsRemove,

        //My data
        cross: '',
        pathLength: '',
    };

    maze = new Maze(settings);
    maze.draw();
    startGame();

    /*TIMER*/
    var countdownNumberEl = document.getElementById('countdown-number');
    var countdown = timeCounter;

    countdownNumberEl.textContent = countdown;

    timer = setInterval(function () {
        if (countdown - 1 <= 0) {
            clearInterval(myGameArea.interval);
            clearInterval(timer);//


            //ModalTitle
            document.getElementById('ModalTitle').innerHTML = "Ojoj!";
            document.getElementsByClassName('modal-body')[0].innerHTML = "<strong>Nevadí!</strong> Skúsiš to znova. Pre opakovanie úlohy klikni na <strong>znova</strong> alebo stlač <strong>Enter</strong>";
            document.getElementById("ModalNext").style.display = "none";

            $('.info').modal({
                backdrop: 'static',
                keyboard: false

            });

            document.getElementById("info").addEventListener("keyup", function (e) {
                if (e.keyCode == 13) {
                    console.log("enter");
                    //clearInterval(myGameArea.interval);
                    e.preventDefault();
                    document.getElementById("ModalRetry").click();
                }
            });

            $('.info').modal('show');
            countdown = 0;
        } else {
            countdown = --countdown;
        }
        countdownNumberEl.textContent = countdown;
    }, 1000);
}

function reset() {

    $('.info').modal('hide');

    attemps=attemps+1;

    var timeCounter = width * 2;

    maze.draw();
    startGame();

    /*TIMER*/
    var countdownNumberEl = document.getElementById('countdown-number');
    var countdown = timeCounter;

    countdownNumberEl.textContent = countdown;

    timer = setInterval(function () {
        if (countdown - 1 <= 0) {
            clearInterval(myGameArea.interval);
            clearInterval(timer);

            //ModalTitle
            document.getElementById('ModalTitle').innerHTML = "Ojoj!";
            document.getElementsByClassName('modal-body')[0].innerHTML = "<strong>Nevadí!</strong> Skúsiš to znova. Pre opakovanie úlohy klikni na <strong>znova</strong> alebo stlač <strong>Enter</strong>";
            document.getElementById("ModalNext").style.display = "none";
            document.getElementById("next").style.display = "none";
            document.getElementById("retry").style.display = "block";

            $('.info').modal('show');
            countdown = 0;
        } else {
            countdown = --countdown;
        }
        countdownNumberEl.textContent = countdown;
    }, 1000);
}

function first() {
    $('.zero-level').modal('hide');
    start();
}

