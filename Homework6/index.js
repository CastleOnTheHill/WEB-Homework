window.onload = function() {
	$("button").eq(0).click(start);
	$("button").eq(1).click(change);
}

var dir = [1, -1, 4, -4];

function start() {
	if($(".map").length == 0) {
		for(var i = 0; i < 16; i++) {
			var class_name = "Allparts map part" + (i + 1);
			var new_div = $("<div></div>").addClass(class_name);
			$("#main").append(new_div);
		}
	}
	$(".map").css("background-image" ,$("#main").css("background-image"));	
	mix();
	$(".map").click(function() {
		var index = $(this).index();
		for (var i = dir.length - 1; i >= 0; i--) {
		 	if(index + dir[i] > 0 && index + dir[i] <= 16 && $(".map").eq(index + dir[i]).hasClass('part16')){
				if(dir[i] == 1 && (index == 3 || index == 7 || index == 11)) continue;
				if(dir[i] == -1 && (index == 4 || index == 8 || index == 12)) continue;
				var mid = this.className;
				this.className = $(".map").eq(index + dir[i]).attr("class");
			  $(".map").eq(index + dir[i]).removeClass().addClass(mid);
				break;		 		
		 	}
		 }
	});
	$(".map").click(function(){
		var winFlag = true;
		$(".map").each(function(){
			var rightName = "part" + ($(this).index() + 1);
			if(!$(this).hasClass(rightName)) {
				winFlag = false;
				return false;
			}  
		})
		if(winFlag) {
			$(".map").remove();
		}
	})
}


function mix() {
	var blank_pos =	15;
	var count = 0;
	while(count < 10) {
		var other_pos = -1;
		while(other_pos < 0 || other_pos > 15){
			var random_dir = dir[Math.ceil(Math.random() * 10) % 4]
			if(random_dir == 1 && (blank_pos == 3 || blank_pos == 7 || blank_pos == 11)) continue;
			if(random_dir == -1 && (blank_pos == 4 || blank_pos == 8 || blank_pos == 12)) continue;
			other_pos = random_dir + blank_pos;
		}
		other = $(".map").eq(other_pos);
		blank = $(".map").eq(blank_pos);
		var mid_name = blank.attr("class");
		blank.removeClass().addClass(other.attr("class"));
		other.removeClass().addClass(mid_name);
		blank_pos = other_pos;
		count ++;		
	}
}

function change() {
	if($("#platform div").length == 0) {
		$("#main").addClass("change");
		$("body").append($("<div></div>").attr("id", "platform"));
		for(var i = 0; i < 3; i++) {
		switch(i) {
			case 0: 
				var temp = $("<div></div>").addClass("img_panda");
				break;
			case 1: 
				var temp = $("<div></div>").addClass("img_Gakki");
				break;
			case 2: 
				var temp = $("<div></div>").addClass("img_Girl");
				break;
		}
		$("#platform").append(temp);
		}
		$("#platform div").click(function() {
			$("#main").css("background-image" ,$(this).css("background-image"));
			$(".map").css("background-image" ,$(this).css("background-image"));
			$("#platform").remove();
			$("#main").removeClass("change");			
		})
	}
	else {
		$("#platform").remove();
		$("#main").removeClass("change");
	}
}