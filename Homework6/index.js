window.onload = function() {
	var main = document.getElementById("main");
	for (var i = 0; i < 9; i++) {
		var newdiv = document.createElement('div');
		newdiv.className = 'map';
		main.appendChild(newdiv);
	}
	var maps = document.getElementsByClassName('map');
	for (var i = 0; i < 9; i++) {
		var id = " part" + (i + 1);
		maps[i].className +=  id;
	}
	$(".map").click(function() {
		var temp = [1, -1, 3, -3];
		var index = $(this).index();
		for (var i = temp.length - 1; i >= 0; i--) {
		 	if(index + temp[i] >= 0 && index + temp[i] <= 8 && $(".map").eq(index + temp[i]).hasClass('part9')){
				var mid = this.className;
				this.className = $(".map").eq(index + temp[i]).className;
				$(".map").eq(index + temp[i]).removeClass('part9');
				$(".map").eq(index + temp[i]).addClass(mid);
				break;		 		
		 	}
		 }
	});
	// main.addEventListener('click', function(event){
	// 	alert("yse");
	// 	var temp = [1, -1, 3, -3];
	// 	var index = $(event.target).index();
	// 	for (var i = temp.length - 1; i >= 0; i--) {
	// 	 	if(index + temp[i] >= 0 && index + temp <= 8 && $("#main:gt(index + temp[i])").hasClass('part9')){
	// 			var mid = event.target.className;
	// 			event.target.className = $("#main:gt(index + temp[i])").className;
	// 			$("#main:gt(index + temp[i])").className = mid;
	// 			break;
	// 	 	}
	// 	 } 
	// });

	// $("#main").click(function)





}