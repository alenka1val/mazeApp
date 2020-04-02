/*This function counts number of crosses in maze (Cross is when there are 3 or 4 options in future step)*/

function check(maze, x, y) {
    if (maze[y][x] == 0) {

        var temp = 0;

        //UP
        if (maze[y - 1][x] == 0) {
            temp++;
        }

        //LEFT
        if (maze[y][x - 1] == 0) {
            temp++;
        }

        //RIGHT
        if (maze[y][x + 1] == 0) {
            temp++;
        }

        //DOWN
        if (maze[y + 1][x] == 0) {
            temp++;
        }

        if (temp > 2) {
            return 1;
        }
    } else {
        console.log('ERROR: USER: ALA');
        return "error";
    }
    return 0;
}

function crossNumber(maze) {

    var labyrinth = maze.matrix;
    var counter = 0;

    for (var i = 1; i < (maze.height * 2); i++) {

        for (var j = 1; j < (maze.width * 2); j++) {


            if (labyrinth[i][j] == 0) {
                //console.log(labyrinth[i][j]);
                var temp = 0;

                //UP
                if (labyrinth[i - 1][j] == 0) {
                    temp++;
                }

                //LEFT
                if (labyrinth[i][j - 1] == 0) {
                    temp++;
                }

                //RIGHT
                if (labyrinth[i][j + 1] == 0) {
                    temp++;
                }

                //DOWN
                if (labyrinth[i + 1][j] == 0) {
                    temp++;
                }

                if (temp > 2) {
                    counter++;
                }
            }

        }
    }

    return counter;
}

function pathLenght(alasArray) {

    var length = 0;

    for (var i = 0; i < alasArray.length; i++) {
        if (alasArray[i].width > alasArray[i].height) {
            length += (alasArray[i].width / 10)
        } else {
            length += (alasArray[i].height / 10)
        }
    }

    length -= (alasArray.length - 1);

    return length
}

function directionChange(alasArray) {

    var counter = 1;

    for (var i = 1; i < alasArray.length; i++) {

        if (i === 0) {
            counter = 1;

        } else {

            if ((alasArray[i].width === 10 && alasArray[i - 1].width > 10)) {
                counter++;
            }

            if ((alasArray[i].width > 10 && alasArray[i - 1].width === 10)) {
                counter++;
            }
        }
    }

    console.log('Change direction: ' + counter);
}

function pathCross(alasArray, maze) {

    var counter = 0;

    for (var i = 1; i < alasArray.length; i++) {

        if (i == 1) {
            counter += check(maze, alasArray[0].width / 10, alasArray[0].height / 10);
        }

        if (alasArray[i].from_x > 10) {
            if (!alasArray[i].width > 10) {
                alasArray[i].width = alasArray[i].from_x
            } else {
                alasArray[i].width = alasArray[i].width + alasArray[i].from_x - 10;
            }
        }

        if (alasArray[i].from_y > 10) {
            if (!alasArray[i].height > 10) {
                alasArray[i].height = alasArray[i].from_y;
            } else {
                alasArray[i].height = alasArray[i].height + alasArray[i].from_y - 10;
            }
        }


        if (!((alasArray[i].from_x == alasArray[i - 1].from_x && alasArray[i].from_y == alasArray[i - 1].from_y) || (alasArray[i].from_x == alasArray[i - 1].width && alasArray[i].from_y == alasArray[i - 1].height))) {
            counter += check(maze, alasArray[i].from_x / 10, alasArray[i].from_y / 10);
        }

        if (!((alasArray[i].width == alasArray[i - 1].from_x && alasArray[i].height == alasArray[i - 1].from_y) || (alasArray[i].width == alasArray[i - 1].width && alasArray[i].height == alasArray[i - 1].height))) {
            counter += check(maze, alasArray[i].width / 10, alasArray[i].height / 10);
        }
    }

    return counter;
}

module.exports.crossNumber = crossNumber;
module.exports.pathLenght = pathLenght;
module.exports.directionChange = directionChange;
module.exports.pathCross = pathCross;