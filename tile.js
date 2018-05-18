// draw a tile maze
function drawTileMaze(data, sizeX, sizeY, width, height, game, image) {
	var ox = (screenWidth - sizeX * width) / 2;
	var oy = (screenHeight - sizeY * height) / 2;
	// walls
	for(j = 0; j <= sizeY - 1; j += 2) {
		for(var i = 0; i < sizeX - 1; i += 2) {
			addSprite(ox + i * width, oy + j * height, image[0], game);
			addSprite(ox + (i + 1) * width, oy + (j + 1) * height, image[1], game);
		}
	}
	for(var i = 0; i < sizeX / 2; i++) {
		for(var j = 0; j < sizeY / 2; j++) {
			// up wall
			if((data[i][j] & 1) == 0) {
				addSprite(ox + width * i * 2 + width, oy + height * j * 2, image[0], game);
			}
			else {
				addSprite(ox + width * i * 2 + width, oy + height * j * 2, image[1], game);
			}
			// left wall
			if((data[i][j] & 2) == 0) {
				addSprite(ox + width * i * 2, oy + height * j * 2 + height, image[0], game);
			}
			else {
				addSprite(ox + width * i * 2, oy + height * j * 2 + height, image[1], game);
			}
		}
	}
	// bottom
	for(var i = 0; i <= sizeX; i++) {
		addSprite(ox + i * width, oy + sizeY * height, image[0], game);
	}
	// right
	for(var i = 0; i < sizeY; i++) {
		addSprite(ox + sizeX * width, oy + i * height, image[0], game);
	}
}

//
function drawTilePath(path, sizeX, sizeY, width, height, game, image) {
	var ox = (screenWidth - sizeX * width) / 2;
	var oy = (screenHeight - sizeY * height) / 2;
	for(var i = 0; i < path.length; i++) {
		var cell = path[i];
		addSprite(ox + width * cell[0] * 2 + width, oy + height * cell[1] * 2 + height, image, game[0]);
	}
}

//
function addSprite(x, y, image, game) {
	var sprite = game.add.sprite(x, y, image);	
	return sprite;
}