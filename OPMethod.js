// Optimal Path

// member variables
var cellStat = [];
var cellData = [];
var path = [];
var sizeX = 12;
var sizeY = 12;
//
function createMaze(width, height) {
	var end = false;
	var idxSrc;
	var idxDsc;
	var dir = 0;
	var newCell = [];
	var actCell = [];
	var stack = [];

	sizeX = width;
	sizeY = height;

	//initialize array
	for(var i = 0; i < sizeX; i++) {
		var array = [];
		for(var j = 0; j < sizeY; j++) {
			array[j] = 0;
			cellStat[i + j * sizeX] = -1;
		}
		cellData[i] = array;
	}
	actCell[0] = Math.floor(Math.random() * sizeX);
	actCell[1] = Math.floor(Math.random() * sizeY);
	actCell[2] = 0;

	// main cicle
	while(true) {
		if(actCell[2] == 15) {
			while(actCell[2] == 15) {
				//actCell = stack[stack.length - 1];
				actCell = stack.pop();
				if(stack.length == 0){
					end = true;
					break;
				}
			}
			if(end) {
				break;
			}
		}
		else {
			while(actCell[2] != 15) {
				dir = parseInt(Math.pow(2, Math.floor(Math.random() * 4)));
				if((actCell[2] & dir) == 0) {
					break;
				}
			}
			actCell[2] |= dir;
			idxSrc = actCell[0] + actCell[1] * sizeX;

			// left
			if(dir == 1 && actCell[0] > 0) {
				idxDsc = actCell[0] - 1 + actCell[1] * sizeX;
				var bs = baseCell(idxSrc);
				var bd = baseCell(idxDsc);
				if(bs != bd) {
					cellStat[bd] = bs;
					cellData[actCell[0]][actCell[1]] |= 2;

					newCell = copyCell(actCell);
					stack.push(newCell);
					actCell[0] -= 1;
					actCell[2] = 0;
				}
			}

			// right
			if(dir == 2 && actCell[0] < sizeX - 1){
				idxDsc = actCell[0] + 1 + actCell[1] * sizeX;
				var bs = baseCell(idxSrc);
				var bd = baseCell(idxDsc);
				if(bs != bd) {
					cellStat[bd] = bs;
					cellData[actCell[0] + 1][actCell[1]] |= 2;

					newCell = copyCell(actCell);
					stack.push(newCell);
					actCell[0] += 1;
					actCell[2] = 0;
				}
			}
			// up
			if(dir == 4 && actCell[1] > 0) {
				idxDsc = actCell[0] + (actCell[1] - 1) * sizeX;
				var bs = baseCell(idxSrc);
				var bd = baseCell(idxDsc);
				if(bs != bd) {
					cellStat[bd] = bs;
					cellData[actCell[0]][actCell[1]] |= 1;

					newCell = copyCell(actCell);
					stack.push(newCell);
					actCell[1] -= 1;
					actCell[2] = 0;
				}
			}
			// down
			if(dir == 8 && actCell[1] < sizeY - 1) {
				idxDsc = actCell[0] + (actCell[1] + 1) * sizeX;
				var bs = baseCell(idxSrc);
				var bd = baseCell(idxDsc);
				if(bs != bd) {
					cellStat[bd] = bs;
					cellData[actCell[0]][actCell[1] + 1] |= 1;

					newCell = copyCell(actCell);
					stack.push(newCell);
					actCell[1] += 1;
					actCell[2] = 0;
				}
			}
		}
	}

	return cellData;
}
// serach base cell
function baseCell(idx) {
	while(cellStat[idx] >= 0) {
		idx = cellStat[idx];
	}
	return idx;
}
// copy a cell
function copyCell(act) {
	var cell = [];
	cell[0] = act[0];
	cell[1] = act[1];
	cell[2] = act[2];

	return cell;
}
//
function solveMaze(sx, sy, dx, dy) {
	var mazePath = [];
	var destOK = false
	var calcPos = []
	var cellPos = []
	cellPos[0] = sx
	cellPos[1] = sy

	var state = []
	state[0] = sx
	state[1] = sy

	var step = 0

	for(var i = 0; i < sizeX; i++) {
		var ar = [];
		mazePath[i] = ar;
		for(var j = 0; j < sizeY; j++) {
			mazePath[i][j] = -1;
		}
	}
	mazePath[sx][sy] = step;

	while(destOK == false && state.length > 0) {
		step = step + 1;
		var nextState = [];

		for(var i = 0; i < state.length; i++) {
			calcPos = state[i];

			// up
			if(calcPos[1] > 0 && (mazePath[calcPos[0]][calcPos[1] - 1] == -1 && cellData[calcPos[0]][calcPos[1]] & 1) != 0) {
				mazePath[calcPos[0]][calcPos[1] - 1] = step;
				var nextPos = [];
				nextPos[0] = calcPos[0];
				nextPos[1] = calcPos[1] - 1;
				nextState.push(calcPos[0]);
				nextState.push(calcPos[1] - 1);

				if(nextPos[0] == dx && nextPos[1] == dy){
					destOK = true;
				}
			}
			// left
			if(calcPos[0] > 0 && mazePath[calcPos[0] - 1][calcPos[1]] == -1 && (cellData[calcPos[0]][calcPos[1]] & 2) != 0) {
				mazePath[calcPos[0] - 1][calcPos[1]] = step;
				var nextPos = [];
				nextPos[0] = calcPos[0] - 1;
				nextPos[1] = calcPos[1];
				nextState.push(calcPos[0] - 1);
				nextState.push(calcPos[1]);

				if(nextPos[0] == dx && nextPos[1] == dy) {
					destOK = true;
				}
			}
			// down
			if(calcPos[1] < sizeY - 1 && mazePath[calcPos[0]][calcPos[1] + 1] == -1 && (cellData[calcPos[0]][calcPos[1] + 1] & 1) != 0) {
				mazePath[calcPos[0]][calcPos[1] + 1] = step;
				var nextPos = [];
				nextPos[0] = calcPos[0];
				nextPos[1] = calcPos[1] + 1;
				nextState.push(calcPos[0]);
				nextState.push(calcPos[1] + 1);

				if(nextPos[0] == dx && nextPos[1] == dy) {
					destOK = true;
				}
			}
			// rigth
			if(calcPos[0] < sizeX - 1 && mazePath[calcPos[0] + 1][calcPos[1]] == -1 && (cellData[calcPos[0] + 1][calcPos[1]] & 2) != 0) {
				mazePath[calcPos[0] + 1][calcPos[1]] = step;
				var nextPos = [];
				nextPos[0] = calcPos[0] + 1;
				nextPos[1] = calcPos[1];
				nextState.push(calcPos[0] + 1);
				nextState.push(calcPos[1]);

				if(nextPos[0] == dx && nextPos[1] == dy) {
					destOK = true;
				}
			}
		}
		state = nextState;
	}

	var tx = dx;
	var ty = dy;
	var ex = false;
	var path = [];

	if(destOK != false) {
		mazePath[dx][dy] = step;

		var nextPos = [];
		nextPos[0] = tx;
		nextPos[1] = ty;
		path.push(tx);
		path.push(ty);

		while(tx != sx || ty != sy) {
			step = mazePath[tx][ty];
			ex = false;

			// up
			if(ty > 0 && ex == false && mazePath[tx][ty - 1] == step - 1 && (cellData[tx][ty] & 1) != 0) {
				ty = ty - 1;
				ex = true;
				var nextPos = [];
				nextPos[0] = tx;
				nextPos[1] = ty;
				path.push(tx);
				path.push(ty);
			}
			// left
			if(tx > 0 && ex == false && mazePath[tx - 1][ty] == step - 1 && (cellData[tx][ty] & 2) != 0) {
				tx = tx - 1;
				ex = true;
				var nextPos = [];
				nextPos[0] = tx;
				nextPos[1] = ty;
				path.push(tx);
				path.push(ty);
			}
			// down
			if(ty < sizeY - 1 && ex == false && mazePath[tx][ty + 1] == step - 1 && (cellData[tx][ty + 1] & 1) != 0) {
				ty = ty + 1;
				ex = true;
				var nextPos = [];
				nextPos[0] = tx;
				nextPos[1] = ty;
				path.push(tx);
				path.push(ty);
			}
			// right
			if(tx < sizeX - 1 && ex == false && mazePath[tx + 1][ty] == step - 1 && (cellData[tx + 1][ty] & 2) != 0) {
				tx = tx + 1;
				ex = true;
				var nextPos = [];
				nextPos[0] = tx;
				nextPos[1] = ty;
				path.push(tx);
				path.push(ty);
			}
		}
	}

	return path;
}



