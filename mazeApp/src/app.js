const mazeImport = require('./maze');
const solverImport = require('./solver');
const dataImport = require('./data');


function initMaze(w, h) {
    const settings = {
        width: w,
        height: h,
        wallSize: 10,
        //removeWalls: getInputIntVal('remove_walls', 0),
        entryType: 'diagonal',
        //bias: '',
        color: '#000000',
        backgroudColor: '#FFFFFF',
        solveColor: '#cc3737',

        // restrictions
        maxMaze: 0,
        maxCanvas: 0,
        maxCanvasDimension: 0,
        maxSolve: 0,
        maxWallsRemove: 0,

        //alas data
        cross: '', //number of crosses in maze
        pathLength: '',// length of path
        pathCross: ''//number of crosses in path
    };

    const maze = new mazeImport.Maze(settings);
    maze.generate();

    maze.cross = dataImport.crossNumber(maze);


    initSolve(maze);

    return maze;
}

function initSolve(maze) {
    if ((typeof maze.matrix === 'undefined') || !maze.matrix.length) {
        return;
    }

    const solver = new solverImport.Solver(maze);
    solver.solve();



    if (maze.wallsRemoved) {
        solver.drawAstarSolve();
    } else {
        solver.draw(maze);
    }
}

module.exports.initMaze = initMaze;