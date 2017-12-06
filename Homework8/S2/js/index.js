
var visited_count = 0;
var Gaming = false;
var requestCounter = 0;
$(document).ready(function() {
	
	$("#control-ring-container li span").hide();
	$("#control-ring-container li").attr("visited", "");
	$("#control-ring-container li").attr("occupied", "");	
	$("#info-bar").attr("visited", "");
	$("#info-bar").attr("occupied", "");
	$("#button").mouseleave(function() {
		// alert("HERE");
		Gaming = false;
		$("#control-ring-container li span").hide();
		$("#control-ring-container li").attr("visited", "");
		$("#control-ring-container li").attr("occupied", "");	
		$("#info-bar").attr("visited", "");
		$("#info-bar").attr("occupied", "");
		$("#control-ring li").css("color", "white");
		$("#info-bar").text("");
		$("#button .apb").one("click", Robot);
		visited_count = 0;		
	});
	$("#button .apb").one("click", Robot);
});

function Robot() {
	Gaming = true;
	if($(event.target).attr("class") === "apb") {
		AJAX($("#control-ring-container li").eq(0), reciveAndRes);
	}
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
		if(Gaming) {
			if(visited_count != 5) AJAX(JQobject.next(), reciveAndRes);
			else caculate($("#info-bar")); 
		}
}

function AJAX(JQobject, callback) {
	requestCounter++;
	var xmlhttp = new XMLHttpRequest();
	JQobject.children("span").html("...").show();
	JQobject.attr("visited", "true");
	$("#info-bar").attr("occupied", "true");
	JQobject.siblings().attr("occupied", "true");
	JQobject.siblings().css("color", "#55b694");
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if(Gaming && requestCounter == 1){
				callback(JQobject, xmlhttp.responseText);
			}
			requestCounter--;									
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

