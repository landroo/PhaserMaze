
// draw a line maze
function drawLineMaze(data, sizeX, sizeY, width, height, game){
	var ox = (screenWidth - sizeX * width) / 2;
	var oy = (screenHeight - sizeY * height) / 2;
	for( var i = 0; i < sizeX; i++) {
		for(var j = 0; j < sizeY; j++) {
			// horizontal
			if((data[i][j] & 1) == 0) {
                drawLine(ox + width * i, oy + height * j, ox + width * (i + 1), oy + height * j, game);
            }
			// vertical
			if((data[i][j] & 2) == 0) {
                drawLine(ox + width * i, oy + height * j, ox + width * i, oy + height * (j + 1), game);
            }
        }
    }

    drawLine(ox, oy + sizeY * height, ox + sizeX * width, oy + sizeY * height, game);
    drawLine(ox + sizeX * width, oy, ox + sizeX * width, oy + sizeY * height, game);
}
function drawLine(x1, y1, x2, y2, game) {
    var gra = game.add.graphics(0, 0);
    gra.lineStyle(3, 0xff0000);
    gra.moveTo(x1, y1);
    gra.lineTo(x2, y2);
}
//
function drawSolve(path, sizeX, sizeY, width, height) {
	var color = Color(0.0, 1.0, 0.0);
	var ox = (get_viewport().get_rect().size.width - sizeX * width) / 2;
	var oy = (get_viewport().get_rect().size.height - sizeY * height) / 2;
	for( var i = 0; i < path.size() - 1; i++) {
		var cell1 = path[i];
		var cell2 = path[i + 1];
		var point1 = Vector2(ox + width * cell1[0] + width / 2, oy + height * cell1[1] + height / 2);
		var point2 = Vector2(ox + width * cell2[0] + width / 2, oy + height * cell2[1] + height / 2);
		draw_line(point1, point2, color, 2);
    }
}
