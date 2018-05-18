//
var maze;
var screenWidth = 1024;
var screenHeight = 768;


var size = 32;

var LineButton;
var TileButton;
var SpriteButton;

window.onload = function() {
	maze = new Phaser.Game(screenWidth, screenHeight, Phaser.AUTO, "");
    maze.state.add("PlayGame", playGame);
    maze.state.start("PlayGame");
}

var playGame = function(maze){};
playGame.prototype = {
    preload: function() {
        maze.load.image("braun", "braun.png");
        maze.load.image("green", "green.png");

        maze.load.image("line", "line.png");
        maze.load.image("tile", "tile.png");
        maze.load.image("sprite", "sprite.png");

        maze.load.image("pipe0", "pipe0.png");
        maze.load.image("pipe1", "pipe1.png");
        maze.load.image("pipe2", "pipe2.png");
        maze.load.image("pipe3", "pipe3.png");
        maze.load.image("pipe4", "pipe4.png");
    },
    create: function() {
        maze.stage.backgroundColor = '#011052';

        lineOnClick();
     },
     update: function(){
     }          
}

function addButtons() {
    LineButton = maze.add.button(10, 10, 'line', lineOnClick, this, 2, 1, 0);
    tileButton = maze.add.button(120, 10, 'tile', tileOnClick, this, 2, 1, 0);
    spriteButton = maze.add.button(230, 10, 'sprite', spriteOnClick, this, 2, 1, 0);
}

function lineOnClick(){
    maze.world.removeAll();
    addButtons();

    size = 32;
    var data = createMaze(24, 16);
    drawLineMaze(data, 24, 16, size, size, maze);
}

function tileOnClick(){
    maze.world.removeAll();
    addButtons();

    size = 32;
    var data = createMaze(12, 8);
    drawTileMaze(data, 24, 16, size, size, maze, ["braun", "green"]);
}

function spriteOnClick(){
    maze.world.removeAll();
    addButtons();

    size = 90;
    var data = createMaze(9, 6);
    drawSpriteMaze(data, 9, 6, size, size, maze, ["pipe0", "pipe1", "pipe2", "pipe3", "pipe4"]);
}
