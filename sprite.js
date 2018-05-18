//
function drawSpriteMaze(data, sizeX, sizeY, width, height, game, sprites){
    var ox = (screenWidth - sizeX * width) / 2;
    var oy = (screenHeight - sizeY * height) / 2;
    var pipe = [
        sprites[0], sprites[0], sprites[0], sprites[0], // L
        sprites[2], sprites[2],                         // I
        sprites[3], sprites[3], sprites[3], sprites[3], // T
        sprites[1], sprites[1], sprites[1], sprites[1], // E
        sprites[4]];                                    // X
	var angles = [
        0, 90, 180, 270,
		0, 90, 
        0, 270, 90, 180, 
        180, 0, 90, 270, 
		0];
	
	for( var i = 0; i < sizeX; i++) {
		for( var j = 0; j < sizeY; j++) {
			var type = getMazeType(data, i, j, sizeX, sizeY);
			var texture = pipe[type - 1];
            var angle = angles[type - 1];
           
            var sprite = addSprite(ox + width * i + width / 2, oy + height * j + height / 2, texture, game);
            sprite.anchor.setTo(0.5, 0.5);
            sprite.angle = angle;
        }
    }
}
	
// acoount the types
function getMazeType(data, x, y, width, height) {
	var left;
	var right;
	var up;
	var down;
	var type = 0;
	
	if((data[x][y] & 2) == 0) left = true;
	
	if(x + 1 == width) right = true;
	else if((data[x + 1][y] & 2) == 0)right = true;
		
	if((data[x][y] & 1) == 0) up = true;
		
	if(y + 1 == height) down = true;
	else if((data[x][y + 1] & 1) == 0) down = true;
		
	// L from right to down way, left up wall
	if(left && !right && up && !down) type = 1;
	// L from left to down way, right, up wall
	if(!left && right && up && !down) type = 2;
	// L from up to left way, right up wall
	if(!left && right && !up && down) type = 3;
	// L from up to right way, left down wall
	if(left && !right && !up && down) type = 4;
		
	// I horizontal way, up, down wall
	if(!left && !right && up && down) type = 5;
	// I vertical way left, right wall
	if(left && right && !up && !down) type = 6;
		
	// T left, down and right way, up wall
	if(!left && !right && up && !down) type = 7;
	// T up, right and down way, left wall
	if(left && !right && !up && !down) type = 8;
	// T up, left and down way, right wall
	if(!left && right && !up && !down) type = 9;
	// T up, right and left way, down wall
	if(!left && !right && !up && down) type = 10;
		
	// E way from right
	if(!left && right && up && down) type = 11;
	// E way from left
	if(left && !right && up && down) type = 12;
	// E way from down
	if(left && right && up && !down) type = 13;
	// E way from up
	if(left && right && !up && down) type = 14;
		
	// X no wall
	if(!left && !right && !up && !down) type = 15;
		
	return type;
}