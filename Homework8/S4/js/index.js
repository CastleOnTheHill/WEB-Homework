
var visited_count = 0;
var order = [];
$(document).ready(function() {
	
	$("#control-ring-container li span").hide();
	$("#control-ring-container li").attr("visited", "");
	$("#control-ring-container li").attr("occupied", "");	
	$("#info-bar").attr("visited", "");
	$("#info-bar").attr("occupied", "");
	$("#showOrder").hide();
	// $("#button").click(function() {
	// 	var li_index = $(event.target).index();
	// 	if($(event.target).attr("visited") || $(event.target).attr("occupied"));
	// 	else{
	// 		if($(event.target).is('li')) AJAX($(event.target), reciveAndRes);
	// 		if($(event.target).attr("id") === "info-bar" && visited_count == 5) caculate($(event.target));		
	// 	}
	// });
	$("#button").mouseleave(function() {
		// alert("HERE");
		$("#control-ring-container li span").hide();
		$("#showOrder").hide();
		$("#control-ring-container li").attr("visited", "");
		$("#control-ring-container li").attr("occupied", "");	
		$("#info-bar").attr("visited", "");
		$("#info-bar").attr("occupied", "");
		$("#control-ring li").css("color", "white");
		$("#info-bar").text("");
		order.splice(0, order.length);
		$("#control-ring-container li span").each(function() {
			$(this).html("");
		});
		alert(order.length);
		visited_count = 0;	
		$("#button").one("click", Robot);	
	});

	$("#button").one("click", Robot);
});

function Robot() {
	var JQobjects = [];
	var orderText = ["The Order is"];
	$("#control-ring-container li").each(function() {
		JQobjects.push($(this));
	});
	for(var i = 5; i >= 1; i--) {
		var Random_num = Math.ceil((Math.random() * 100)) % i;
		order.push(JQobjects[Random_num]);
		orderText.push(JQobjects[Random_num].text());
		JQobjects.splice(Random_num, 1);
	}
	$("#showOrder").text(orderText.join(" "));
	$("#showOrder").show();
	AJAX(order[0], reciveAndRes);
}

function reciveAndRes(JQobject, responseText) {
	JQobject.children("span").html(responseText);
	JQobject.css("color", "#55b694");
	JQobject.siblings().attr("occupied", "");
	$("#info-bar").attr("occupied", "");
	JQobject.siblings().each(function(){
		// alert($(this).attr("visited"));
		if(!!$(this).attr("visited"));
		else $(this).css("color", "white");
	});
	visited_count ++;
	if(visited_count == 5) caculate($("#info-bar"));
	else AJAX(order[visited_count], reciveAndRes);
}

function AJAX(JQobject, callback) {
	var xmlhttp = new XMLHttpRequest();
	JQobject.children("span").html("...").show();
	JQobject.attr("visited", "true");
	$("#info-bar").attr("occupied", "true");
	JQobject.siblings().attr("occupied", "true");
	JQobject.siblings().css("color", "#55b694");
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				callback(JQobject, xmlhttp.responseText)									
		}
	}
	xmlhttp.open("GET", true);
	xmlhttp.send();
}
	
function caculate(JQobject) {
	JQobject.attr("visited", "true");
	var sum = 0;
	$("#control-ring-container li span").each(function() {
		sum += +$(this).text();
	});
	JQobject.text(sum);
}

