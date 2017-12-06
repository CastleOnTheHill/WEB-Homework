
var visited_count = 0;
var Gaming = false;
var requestCounter = 0;
$(document).ready(function() {
	
	$("#control-ring-container li span").hide();
	$("#control-ring-container li").attr("visited", "");
	$("#control-ring-container li").attr("clicked", "");
	$("#control-ring-container li").attr("occupied", "");	
	$("#info-bar").attr("visited", "");
	$("#info-bar").attr("occupied", "");
	$("#button").click(function() {
		Gaming = true;
		var li_index = $(event.target).index();
		if($(event.target).attr("visited") || $(event.target).attr("occupied"));
		else{
			if($(event.target).is('li') && !$(event.target).attr("clicked")) {
				console.log("When click RequsetCounter: " + requestCounter);
				$(event.target).attr("clicked", "true");
				requestCounter ++; 
				AJAX($(event.target), reciveAndRes);
			}
			if($(event.target).attr("id") === "info-bar" && visited_count == 5) caculate($(event.target));		
		}
	});
	$("#button").mouseleave(function() {
		Gaming = false;
		// alert("HERE");
		$("#control-ring-container li span").hide();
		$("#control-ring-container li").attr("visited", "");
		$("#control-ring-container li").attr("clicked", "");
		$("#control-ring-container li").attr("occupied", "");	
		$("#info-bar").attr("visited", "");
		$("#info-bar").attr("occupied", "");
		$("#control-ring li").css("color", "white");
		$("#info-bar").text("");
		visited_count = 0;
		console.log("When mouseleave RequestCounter: " + requestCounter);		
	});
});

function reciveAndRes(JQobject, responseText) {
	requestCounter--;
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
	console.log("When finished a request RequsetCounter: " + requestCounter);
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
			console.log("When recieve a request RequsetCounter: " + requestCounter);
			if(Gaming && requestCounter == 1)
				callback(JQobject, xmlhttp.responseText);
			else requestCounter --;									
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

