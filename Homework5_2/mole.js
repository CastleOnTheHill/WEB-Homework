var t;
var timecount_id, mole_show_id;
var hit_sign = 1,
    start_sign, random_hole;
window.onload = function() {
    addbutton();
    document.getElementsByTagName('button')[0].onclick = start_stop;
}

function addbutton() {
    var map = document.getElementById('map');
    for (var i = 0; i < 60; i++) {
        var newbutton = document.createElement('button');
        newbutton.className = 'mole';
        newbutton.addEventListener("click", wrong_click);
        map.appendChild(newbutton);
    }
}

function start_stop() {
    var msg = document.getElementsByTagName('button')[1];
    if (msg.textContent == "Game Over") {
        msg.textContent = 'Playing';
        start();
    } else {
        msg.textContent = "Game Over";
        end();
    }

}

function start() {
    t = 30;
    hit_sign = 1;
    start_sign = 1;
    timecount();
    document.getElementById("score").textContent = "0";
    var mole_hole = document.getElementById("map").childNodes;
    mole_show();
}


function timecount() {
    var time = document.getElementById("time");
    time.textContent = t;
    t--;
    if (t >= 0)
        timecount_id = setTimeout("timecount()", 1000);
    else
        end();
}

function mole_show() {
    if (hit_sign) {
        random_hole = Math.random();
        while (random_hole == 1) random_hole = Math.random();
        random_hole = Math.floor(random_hole * 60);
        var mole_hole = document.getElementById("map").childNodes[random_hole];
        mole_hole.className += " mole_show";
        mole_hole.removeEventListener("click", wrong_click);
        mole_hole.addEventListener("click", mole_hit);
        hit_sign = 0;
    }
    mole_show_id = setTimeout(mole_show, 50);
}

function end() {
    start_sign = 0;
    clearTimeout(timecount_id);
    clearTimeout(mole_show_id);
    document.getElementsByTagName('button')[1].textContent = "Game Over";
    if (random_hole != -1) {
        var temp = document.getElementById("map").childNodes[random_hole];
        temp.className = "mole";
        temp.removeEventListener("click", mole_hit);
        temp.addEventListener("click", wrong_click);
        random_hole = -1;
    }
}

function wrong_click() {
    if (start_sign == 1) {
        var score = document.getElementById("score").textContent;
        if (score > 0) {
            score = score - 1;
            document.getElementById("score").textContent = score;
        }
    }
}

function mole_hit(event) {
    hit_sign = 1;
    random_hole = -1;
    var score = document.getElementById("score").textContent;
    score++;
    document.getElementById("score").textContent = score;
    event.target.removeEventListener("click", mole_hit);
    event.target.addEventListener("click", wrong_click);
    event.target.className = "mole";
}