
var lose_sign = 0;
var wall_sign = 0;
var path = new Array(0, 0, 0);
window.onload = function() {
	document.getElementById("start").onmouseover = start;
	document.getElementById("end").onmouseover = end;
	document.getElementById("path").onmouseover = function(){this.style.cursor = 'pointer';}
}

function start(){
	wall_sign = 0;
	lose_sign = 0;
	path[0] = 0;
	path[1] = 0;
	path[2] = 0;
	document.getElementById("result").className = "";
	var wall = document.getElementsByName("wall");
	for (var i = 0; i < wall.length; i++) {
		wall[i].className = "touch";
		wall[i].addEventListener("mouseover", wall_touch);
		wall[i].addEventListener("mouseout", stop);
	}
	document.getElementById("road_1").addEventListener("mouseover", function(){path[0] = 1});
	document.getElementById("road_2").addEventListener("mouseover", function(){path[1] = 1});
	document.getElementById("road_3").addEventListener("mouseover", function(){path[2] = 1});
}

function wall_touch() {
	wall_sign = 1;
	end();
}

function stop() {
	var wall = document.getElementsByName("wall");
	for (var i = 0; i < wall.length; i++) {
		wall[i].className = "";
	}	
}

function end() {
	if(wall_sign == 1){
		lose_sign = 1;
		document.getElementById("result").textContent = "You Lose.";
	}
	else if(path[0] && path[1] && path[2])
		document.getElementById("result").textContent = "You Win.";
	else
		document.getElementById("result").textContent = "Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!";
	document.getElementById("result").className = "result_show";

	var wall = document.getElementsByName("wall");
	for (var i = 0; i < wall.length; i++) {
		wall[i].removeEventListener("mouseover", wall_touch);
		if(!lose_sign)
			wall[i].className = "";
	}
}