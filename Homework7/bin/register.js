$(document).ready(function () {
	$("input").change(function() {
		var index = $("input").index($(this));
		switch(index) {
			case 0: 
				if(/^[a-zA-Z]\w{5,17}/.test(this.value)) $(".msg").eq(index).html("");
				else $(".msg").eq(index).html("Worng!");
				break; 
			case 1:
				if(/^[1-9][0-9]{7}/.test(this.value)) $(".msg").eq(index).html("");
				else $(".msg").eq(index).html("Worng!");
				break;
			case 2:
				if(/^[1-9][0-9]{10}/.test(this.value)) $(".msg").eq(index).html("");
				else $(".msg").eq(index).html("Worng!");
				break;
			case 3:
				if(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(this.value)) $(".msg").eq(index).html("");
				else $(".msg").eq(index).html("Worng!");
				break;							 					
		}
	});
});