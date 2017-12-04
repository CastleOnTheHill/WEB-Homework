$(document).ready(function() {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var user1 = JSON.parse(xmlhttp.responseText);
            $("#userName span").append(user1.name);
            $("#schoolId span").append(user1.schoolId);
            $("#phoneNumber span").append(user1.phoneNumber);
            $("#email span").append(user1.email);
        }

    }
    xmlhttp.open("GET", "users.json", true);
    xmlhttp.send();
});