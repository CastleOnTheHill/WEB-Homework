

$(document).ready(function() {
	
	$("#control-ring-container li span").hide();
	$("#control-ring-container li").attr("visited", "");
	$("#control-ring-container li").attr("occupied", "");	
	$("#info-bar").attr("visited", "");
	$("#info-bar").attr("occupied", "");
	$("#showOrder").hide();
	$("#button").mouseleave(function() {
		$("#control-ring-container li span").hide();
		$("#showOrder").hide();
		$("#control-ring-container li").attr("visited", "");
		$("#control-ring-container li").attr("occupied", "");	
		$("#info-bar").attr("visited", "");
		$("#info-bar").attr("occupied", "");
		$("#control-ring li").css("color", "white");
		$("#info-bar").text("");
		$("#control-ring-container li span").html("");
		$("#button").one("click", Robot);	
	});

	$("#button").one("click", Robot);
});

function Robot() {
	Gaming = true;
	var JQobjects = [];
	var orderText = ["The Order is"];
	$("#control-ring-container li").each(function() {
		JQobjects.push($(this));
	});
	for(var i = 5; i >= 1; i--) {
		var Random_num = Math.ceil((Math.random() * 100)) % i;
		order.push(JQobjects[Random_num]);
		orderText.push(JQobjects[Random_num].text().match(/[A,B,C,D,E]/)[0]);
		JQobjects.splice(Random_num, 1);
	}
	$("#showOrder").text(orderText.join(" "));
	$("#showOrder").show();
	AJAX(order[0], reciveAndRes);
}


function aHandler(currnetSum, callback) {

}

function bHandler(currnetSum, callback) {

}

function cHandler(currnetSum, callback) {

}

function dHandler(currnetSum, callback) {

}

function eHandler(currnetSum, callback) {

}

function bubbleHandler(currnetSum, callback) {

}

	
// function caculate(JQobject) {
// 	JQobject.attr("visited", "true");
// 	var sum = 0;
// 	$("#control-ring-container li span").each(function() {
// 		sum += +$(this).text();
// 	});
// 	JQobject.text(sum);
// }

