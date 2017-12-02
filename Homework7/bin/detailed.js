$(document).ready(function() {
	// $.getJSON("users.json", function(result) {
	// 	alert(JSON.parse(result));
	// 	var user1 = JSON.parse(result)["user1"];
	// 	$("userName").append(user1.name);
	// 	$("schoolId").append(user1.schoolId);
	// 	$("phoneNumber").append(user1.phoneNumber);
	// 	$("email").append(user1.email);
	// });
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var user1 = JSON.parse(xmlhttp.responseText);
			$("#userName").append(user1.name);
			$("#schoolId").append(user1.schoolId);
			$("#phoneNumber").append(user1.phoneNumber);
			$("#email").append(user1.email);				
		}
		
	}
	xmlhttp.open("GET", "users.json", true);
	xmlhttp.send();
});