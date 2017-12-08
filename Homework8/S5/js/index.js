
$(document).ready(function() {
	
	$("#control-ring-container li span").hide();
	$("#control-ring-container li").attr("visited", "");
	$("#info-bar").attr("visited", "");
	$("#showOrder").hide();
	$("#control-ring-container li").attr("requestCounter", "0");
	$("#control-ring-container li").attr("nowIn", "");
	$("#button").attr("Gaming", "");

	$("#button").mouseleave(function() {
		$("#button").attr("Gaming", "");
		$("#control-ring-container li").attr("nowIn", "");
		$("#control-ring-container li span").hide();
		$("#showOrder").hide();
		$("#control-ring-container li").attr("visited", "");
		$("#control-ring li").css("color", "white");
		$("#info-bar").html("");
		$("#control-ring-container li span").html("");
		// if($("#button").data("events").click.length == 0) 	$("#button").one("click", Robot);
		// console.log(($._data($("#button"),"events").click));
		if(typeof($._data(document.getElementById("button"), "events").click) == "undefined") $("#button").one("click", Robot);
	});

	$("#button").one("click", Robot);
	console.log($._data(document.getElementById("button"), "events").click.length);
});

function Robot() {
	var JQobjects = [];
	var functionOrder = [];
	var orderText = ["The Order is"];
	$("#button").attr("Gaming", "true");
	$("#control-ring-container li").each(function() {
		JQobjects.push($(this));
	});
	for(var i = 5; i >= 1; i--) {
		var Random_num = Math.ceil((Math.random() * 100)) % i;
		orderText.push(JQobjects[Random_num].html().match(/[A,B,C,D,E]/)[0]);
		JQobjects.splice(Random_num, 1);
	}
	for (var i = 1; i < 6; i++) {
		switch(orderText[i]) {
			case "A": functionOrder.push(aHandler); break;
			case "B": functionOrder.push(bHandler); break;
			case "C": functionOrder.push(cHandler); break;
			case "D": functionOrder.push(dHandler); break;
			case "E": functionOrder.push(eHandler); break;
		}
	}
	$("#showOrder").html(orderText.join(" "));
	$("#showOrder").show();
	Handler(functionOrder[0], functionOrder[1], functionOrder[2], functionOrder[3], functionOrder[4], bubbleHandler);
}

function Handler() {
	var Handlers = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
	var lastHandler = arguments[arguments.length - 1];
	var callbacks = [];
	for(var i = 1; i < Handlers.length; i++) {
		(function(i) {
			callbacks[i] = function(currentSum) {
				(Handlers[i])(currentSum, errback ,callbacks[i + 1]);
			}
		})(i);
	}
	callbacks[Handlers.length] = function(currentSum) {
		lastHandler(currentSum, errback);
	};
	(Handlers[0])(0, errback, callbacks[1]);
}

function errback(err) {
	console.log("Catching Error");
	var letter = (err["message"])[0];
	if(letter.charCodeAt() < 70)
		$("#" + letter).html(err["message"]);
	else $("#Bubble").html(err["message"]);
}

function aHandler(currentSum, errback, callback) {
	var letter_post = 0;
	console.log("now in aHandler");
	var JQobject = $("#control-ring-container li").eq(letter_post);
	JQobject.attr("nowIn", "true");
	var requestCounter = Number(JQobject.attr("requestCounter"));
	requestCounter ++;
	JQobject.attr("requestCounter", requestCounter);
	console.log("Sending request in A, request counter:" + JQobject.attr("requestCounter"));
	JQobject.siblings().css("color", "#55b694");
	JQobject.attr("visited", true);
	var A = JQobject.children("span").eq(0);
	var msg = "A：这是个天大的秘密";
	var negtive_msg = "A：<span>这不是个天大的秘密</span>";
	$("#control-ring-container li span").eq(letter_post).show();
	A.html("...");
	$.ajax({
		type: "GET",
		url: "/",
		cache: false,
		success: function(data) {
			console.log("Receving a A response");
			if($("#button").attr("Gaming") && requestCounter == 1 && JQobject.attr("nowIn")) {
				currentSum += Number(data);
				if(Math.random() - 0.5 < 0) {
					errback({
					"message":negtive_msg ,
					"currentSum":currentSum
					});
				}
				else $("#A").html(msg); 	
				A.html(data);
				JQobject.siblings().each(function() {
					if($(this).attr("visited"));
					else $(this).css("color", "white");
				});
				JQobject.css("color", "#55b694");
				callback(currentSum);
				JQobject.attr("nowIn", "");
			}
			JQobject.attr("requestCounter", --requestCounter);
		}
	});	
}

function bHandler(currentSum, errback, callback) {
	var letter_post = 1;
	console.log("now in bHandler");
	var JQobject = $("#control-ring-container li").eq(letter_post);
	JQobject.attr("nowIn", "true");
	var requestCounter = Number(JQobject.attr("requestCounter"));
	requestCounter ++;
	JQobject.attr("requestCounter", requestCounter);
	console.log("Sending request in B, request counter:" + JQobject.attr("requestCounter"));
	JQobject.siblings().css("color", "#55b694");
	JQobject.attr("visited", true);	
	var B = JQobject.children("span").eq(0);
	var msg = "B：我不知道";
	var negtive_msg = "B：<span>我知道</span>";
	$("#control-ring-container li span").eq(letter_post).show();
	B.html("...");
	$.ajax({
		type: "GET",
		url: "/",
		cache: false,
		success: function(data) {
			console.log("Receving a B response");
			if($("#button").attr("Gaming") && requestCounter == 1 && JQobject.attr("nowIn")) {
				currentSum += Number(data);
				if(Math.random() - 0.5 < 0) {
					errback({
					"message":negtive_msg ,
					"currentSum":currentSum
					});
				}
				else $("#B").html(msg); 	
				B.html(data);
				JQobject.siblings().each(function() {
					if($(this).attr("visited"));
					else $(this).css("color", "white");
				});
				JQobject.css("color", "#55b694");			
				callback(currentSum);
				JQobject.attr("nowIn", "");
			}
			JQobject.attr("requestCounter", --requestCounter);
		}
	});	
}

function cHandler(currentSum, errback, callback) {
	var letter_post = 2;
	var JQobject = $("#control-ring-container li").eq(letter_post);
	JQobject.attr("nowIn", "true");
	var requestCounter = Number(JQobject.attr("requestCounter"));
	requestCounter ++;
	JQobject.attr("requestCounter", requestCounter);
	console.log("Sending request in C, request counter:" + JQobject.attr("requestCounter"));
	console.log("now in cHandler");
	JQobject.siblings().css("color", "#55b694");
	JQobject.attr("visited", true);		
	var C = JQobject.children("span").eq(0);
	var msg = "C：你不知道";
	var negtive_msg = "C：<span>你知道</span>";
	$("#control-ring-container li span").eq(letter_post).show();
	C.html("...");
	$.ajax({
		type: "GET",
		url: "/",
		cache: false,
		success: function(data) {
			console.log("Receving a C response");
			if($("#button").attr("Gaming") && requestCounter == 1 && JQobject.attr("nowIn")) {
				currentSum += Number(data);
				if(Math.random() - 0.5 < 0) {
					errback({
					"message":negtive_msg ,
					"currentSum":currentSum
					});
				}
				else $("#C").html(msg); 	
				C.html(data);
				JQobject.siblings().each(function() {
					if($(this).attr("visited"));
					else $(this).css("color", "white");
				});
				JQobject.css("color", "#55b694");			
				callback(currentSum);
				JQobject.attr("nowIn", "");
			}
			JQobject.attr("requestCounter", --requestCounter);
		}
	});	
}

function dHandler(currentSum, errback, callback) {
	var letter_post = 3;
	var JQobject = $("#control-ring-container li").eq(letter_post);
	JQobject.attr("nowIn", "true");
	var requestCounter = Number(JQobject.attr("requestCounter"));
	requestCounter ++;
	JQobject.attr("requestCounter", requestCounter);
	console.log("Sending request in D, request counter:" + JQobject.attr("requestCounter"));
	console.log("now in dHandler");
	JQobject.siblings().css("color", "#55b694");
	JQobject.attr("visited", true);		
	var D = JQobject.children("span").eq(0);
	var msg = "D：他不知道";
	var negtive_msg = "D：<span>他知道</span>";
	$("#control-ring-container li span").eq(letter_post).show();
	D.html("...");
	$.ajax({
		type: "GET",
		url: "/",
		cache: false,
		success: function(data) {
			console.log("Receving a D response");
			if($("#button").attr("Gaming") && requestCounter == 1 && JQobject.attr("nowIn")) {
				currentSum += Number(data);
				if(Math.random() - 0.5 < 0) {
					errback({
					"message":negtive_msg ,
					"currentSum":currentSum
					});
				}
				else $("#D").html(msg); 	
				D.html(data);
				JQobject.siblings().each(function() {
					if($(this).attr("visited"));
					else $(this).css("color", "white");
				});
				JQobject.css("color", "#55b694");				
				callback(currentSum);
				JQobject.attr("nowIn", "");
			}
			JQobject.attr("requestCounter", --requestCounter);
		}
	});	
}

function eHandler(currentSum, errback, callback) {
	var letter_post = 4;
	var JQobject = $("#control-ring-container li").eq(letter_post);
	JQobject.attr("nowIn", "true");
	var requestCounter = Number(JQobject.attr("requestCounter"));
	requestCounter ++;
	JQobject.attr("requestCounter", requestCounter);
	console.log("Sending request in E, request counter:" + JQobject.attr("requestCounter"));
	console.log("now in eHandler");
	JQobject.siblings().css("color", "#55b694");
	JQobject.attr("visited", true);			
	var E = JQobject.children("span").eq(0);
	var msg = "E：才怪";
	var negtive_msg = "E：<span>真的</span>";
	$("#control-ring-container li span").eq(letter_post).show();
	E.html("...");
	$.ajax({
		type: "GET",
		url: "/",
		cache: false,
		success: function(data) {
			console.log("Receving a E response");
			if($("#button").attr("Gaming") && requestCounter == 1 && JQobject.attr("nowIn")) {
				currentSum += Number(data);
				if(Math.random() - 0.5 < 0) {
					errback({
					"message":negtive_msg ,
					"currentSum":currentSum
					});
				}
				else $("#E").html(msg); 	
				E.html(data);
				JQobject.siblings().each(function() {
					if($(this).attr("visited"));
					else $(this).css("color", "white");
				});
				JQobject.css("color", "#55b694");				
				callback(currentSum);
				JQobject.attr("nowIn", "");
			}
			JQobject.attr("requestCounter", --requestCounter);
		}
	});	
}

function bubbleHandler(currentSum, errback) {
	console.log("now in bubbleHandler");
	var bubble = $("#info-bar");
	var msg = "大气泡：楼主异步调用战斗力感人，目测不超过" + currentSum + "</span>";
	var negtive_msg = "大气泡：<span>楼主异步调用战斗力感人，目测超过" + currentSum + "</span>";
	if(Math.random() - 0.5 < 0) {
		errback({
		"message":negtive_msg ,
		"currentSum":currentSum
		});
	}
	else $("#Bubble").html(msg);
	bubble.html(currentSum); 	
}


