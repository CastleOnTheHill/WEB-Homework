
var visited_count = 0;
var Gaming = false;
var requestCounter = 0;
var requestCounterForEach = {
	"A":0,
	"B":0,
	"C":0,
	"D":0,
	"E":0
}
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
		$(".apb").one("click", Robot);
		visited_count = 0;		
	});

	$(".apb").one("click", Robot);
});

function Robot() {
	Gaming = true;
	requestCounter++;
	$("#control-ring-container li").each(function() {		
		AJAX($(this), reciveAndRes);
	});
}
 
function reciveAndRes(JQobject, responseText, callback) {
	// alert("HERE");
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
		if(visited_count == 5) {
			requestCounterForEach["A"] = 0;
			requestCounterForEach["B"] = 0;
			requestCounterForEach["C"] = 0;
			requestCounterForEach["D"] = 0;
			requestCounterForEach["E"] = 0;
			requestCounter = 0;
			callback($("#info-bar"));
		}
}

function AJAX(JQobject, callback) {
	// requestCounter++;
	var xmlhttp = new XMLHttpRequest();
	JQobject.children("span").html("...").show();
	JQobject.attr("visited", "true");
	$("#info-bar").attr("occupied", "true");
	JQobject.siblings().attr("occupied", "true");
	JQobject.siblings().css("color", "#55b694");
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var temp = JQobject.text().match(/[A,B,C,D,E]/)[0];
			requestCounterForEach[temp]++;
			console.log("Letter: " + temp);
			console.log("requestCounterForEach: " + requestCounterForEach[temp]);
			console.log("requestCounter: " + requestCounter);
			if(Gaming && requestCounterForEach[temp] == requestCounter) callback(JQobject, xmlhttp.responseText, caculate);							
		}
	}
	xmlhttp.open("POST", true);
	xmlhttp.send();
	console.log("send successfully!");
}
	
function caculate(JQobject) {
	JQobject.attr("visited", "true");
	var sum = 0;
	$("#control-ring-container li span").each(function() {
		sum += +$(this).text();
	});
	JQobject.text(sum);
}

/*
	bug
	出现这种情况
	第一次5个中有A是1s，B是3s；
	第二次同样A是1s，而B是3s；
	这样如果两次间隔的时间比较短的时候，按照个数过滤的话就会阻隔两个A而进入两个B；
*/ 

