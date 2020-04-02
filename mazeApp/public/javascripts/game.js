var myGamePiece;
var movementLock = true;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(10, 10, "red", 15, 15);
}

var myGameArea = {
    start: function () {

        //add to canvas
        this.context = canvas.getContext("2d");
        document.getElementById("maze").appendChild(canvas, document.body.childNodes[0]);

        //set interval for updating Game area
        this.interval = setInterval(getMyKey, 20);

        //DONT KNOW what is this doing. Just dont tuoch it.
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear: function () {
        this.context.clearRect(myGamePiece.x - 5, myGamePiece.y - 5, myGamePiece.width, myGamePiece.height);
    },
    stop: function () {

        //stop updating movement
        clearInterval(this.interval);

        //stop countdown
        clearInterval(timer);

        $.post('/user/'+user+'/maze/'+level+'/store', {time: (2*width)-parseInt(document.getElementById('countdown-number').textContent), attemps:attemps });

        if(level<10){
            document.getElementById('ModalTitle').innerHTML = "Výborne!";
            document.getElementsByClassName('modal-body')[0].innerHTML = "<strong>Podarilo sa ti to skvelo!</strong> Pre ďalšiu úlohu klikni na <strong>pokračovať</strong>.";
            document.getElementById("ModalRetry").style.display = "none";
            document.getElementById("retry").style.display = "none";
            document.getElementById("ModalNext").style.display = "block";
        }else{
            document.getElementById("next").innerText = "Ukončiť";
            document.getElementById("ModalNext").innerText = "Ukončiť";
            document.getElementById('ModalTitle').innerHTML = "Gratulujem!";
            document.getElementsByClassName('modal-body')[0].innerHTML = "<strong>Zvládol si to výborne!</strong> Pre ukončenie testu klikni na <strong>ukončiť</strong>.";
        }
        //Show winning modal
        document.getElementById("ModalRetry").style.display = "none";
        document.getElementById("retry").style.display = "none";
        document.getElementById("ModalNext").style.display = "block";

        $('#next').prop('disabled', false);
        $('.info').modal('show');


    }
};

function component(width, height, color, x, y) {

    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.prevSpeedX = 0;
    this.prevSpeedY = 0;
    this.x = x;
    this.y = y;

    ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.strokeStyle = "red";
    ctx.stroke();

    this.update = function () {
        ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.strokeStyle = "red";
        ctx.stroke();

        movementLock = true;
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        //console.log("X: " + this.x + " Y: " + this.y);

    };
}

function getMyKey() {

    if (movementLock) {

        myGamePiece.speedX = 0;
        myGamePiece.speedY = 0;
        //LEFT
        if (myGameArea.key && myGameArea.key == 37 && Mymatrix[Math.floor(myGamePiece.y / 10)][Math.floor(myGamePiece.x / 10) - 1] == 0) {
            movementLock = false;
            //console.log("left");
            clearInterval(myGameArea.interval);
            myGamePiece.speedX = -10;
            updateMovement();
            return;
        }
        //RIGHT
        if (myGameArea.key && myGameArea.key == 39 && (Mymatrix[Math.floor(myGamePiece.y / 10)][Math.floor(myGamePiece.x / 10) + 1] == 0)) {
            movementLock = false;
            //console.log("right");
            clearInterval(myGameArea.interval);
            myGamePiece.speedX = 10;
            updateMovement();
            return;
        }
        //UP
        if (myGameArea.key && myGameArea.key == 38 && Mymatrix[Math.floor(myGamePiece.y / 10) - 1][Math.floor(myGamePiece.x / 10)] == 0) {
            movementLock = false;
            //console.log("up");
            clearInterval(myGameArea.interval);
            myGamePiece.speedY = -10;
            updateMovement();
            return;
        }
        //DOWN
        if (myGameArea.key && myGameArea.key == 40 && Mymatrix[Math.floor(myGamePiece.y / 10) + 1][Math.floor(myGamePiece.x / 10)] == 0) {
            movementLock = false;
            //console.log("down");
            clearInterval(myGameArea.interval);
            myGamePiece.speedY = 10;
            updateMovement();
            return;
        }
        //END
        if (myGameArea.key && myGameArea.key == 39 && myGamePiece.y == (20 * maze.height) - 5 && myGamePiece.x == (20 * maze.width) - 5) {
            //console.log("left");
            clearInterval(myGameArea.interval);
            myGamePiece.speedX = 10;
            updateGameArea()
            myGameArea.stop();
            return;
        }
    }

}

function updateMovement() {

    updateGameArea();
    //console.log("movement x:" + myGamePiece.x + "Y:" + myGamePiece.y);

    myGamePiece.prevSpeedX = myGamePiece.speedX;
    myGamePiece.prevSpeedY = myGamePiece.speedY;

    //console.log("updated");

    myGameArea.interval = setInterval(move, 100);

}

function move() {

    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;

    if (checkAround() == 2) {
        //console.log("checkAround");

        //END
        if (myGamePiece.y == (20 * maze.height) - 5 && myGamePiece.x == (20 * maze.width) - 5) {
            myGamePiece.speedX = 10;
            updateGameArea();
            myGameArea.stop();
        } else {
            //LEFT
            if (Mymatrix[Math.floor(myGamePiece.y / 10)][Math.floor(myGamePiece.x / 10) - 1] == 0 && myGamePiece.prevSpeedX != 10) {
                myGamePiece.speedX = -10;
                myGamePiece.prevSpeedX = myGamePiece.speedX;
                myGamePiece.prevSpeedY = 0;
                //console.log("left");
            } else {
                //RIGHT
                if ((Mymatrix[Math.floor(myGamePiece.y / 10)][Math.floor(myGamePiece.x / 10) + 1] == 0 && myGamePiece.prevSpeedX != -10)) {
                    myGamePiece.speedX = 10;
                    myGamePiece.prevSpeedX = myGamePiece.speedX;
                    myGamePiece.prevSpeedY = 0;
                    //console.log("right");
                } else {
                    //UP
                    if (Mymatrix[Math.floor(myGamePiece.y / 10) - 1][Math.floor(myGamePiece.x / 10)] == 0 && myGamePiece.prevSpeedY != 10) {
                        myGamePiece.speedY = -10;
                        myGamePiece.prevSpeedX = 0;
                        myGamePiece.prevSpeedY = myGamePiece.speedY;
                    } else {
                        //DOWN
                        if (Mymatrix[Math.floor(myGamePiece.y / 10) + 1][Math.floor(myGamePiece.x / 10)] == 0 && myGamePiece.prevSpeedY != -10) {
                            myGamePiece.speedY = 10;
                            myGamePiece.prevSpeedX = 0;
                            myGamePiece.prevSpeedY = myGamePiece.speedY;
                        }
                    }
                }
            }
        }

        updateGameArea();

    } else {

        if (myGamePiece.y == (20 * maze.height) - 5 && myGamePiece.x == (20 * maze.width) - 5) {
            myGamePiece.speedX = 10;
            updateGameArea();
            myGameArea.stop();
            updateGameArea()
        } else {
            clearInterval(myGameArea.interval);
            //console.log("stopped");
            myGameArea.interval = setInterval(getMyKey, 20);
        }
    }

}

function updateGameArea() {

    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();

}
