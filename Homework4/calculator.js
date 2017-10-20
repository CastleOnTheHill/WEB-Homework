
window.onload = function() {
	var elements = document.getElementsByName("num");
	for (var i = 0; i < elements.length; i++) {
		elements[i].onclick = update_stack;
	}
	document.getElementById("back").onclick = back;
	document.getElementById("clear_").onclick = clear_;
	document.getElementById("equal").onclick = calculate;
}
	
var stack = new Array();
function show() {
	var x = stack.join("");
	document.getElementById("output").textContent = x;
}
function clear_() {
	stack.splice(0, stack.length);
	show();
}
function back(){
	stack.pop();
	show();
}
function update_stack(event) {
	stack.push(event.target.textContent);
	show();
}
function check_error(){
	var num_count = 0, operator_count = 0, left_brackets_count = 0, last_ele = 0, point_sign = 0, count = 0;

	 // last ele: 1 stands for number, 2 stands for operator, 3 stands for LeftBracket, 4 stands for RightBracket;
	while (count < stack.length) {
		if(!isNaN(stack[count])){
			if(last_ele == 4) return false;
			else {
				last_ele = 1;
				count++;
				continue;
			}
		}
		else if(stack[count] == '('){
			if(last_ele == 1 || last_ele == 4) return false;
			else {
				left_brackets_count++;
				last_ele = 3;
				count++;
				point_sign = 0;
				continue;
			}
		}
		else if(stack[count] == ')'){
			left_brackets_count--;
			if(left_brackets_count < 0 || !(last_ele == 1 || last_ele == 4)) return false;
			else {
				last_ele = 4;
				count++;
				point_sign = 0;
				continue;
			}
		}
		else if(stack[count] == '+' || stack[count] == '-' || stack[count] == '*' || stack[count] == '/') {
			if(last_ele != 1 && last_ele != 4) {
				if(last_ele == 0) {
					if(stack[count] == '*' || stack[count] == '/') return false;
				}
				else return false;
			}
			last_ele = 2;
			count++;
			point_sign = 0;
			continue;
		}
		else {
			if(last_ele != 1 || point_sign == 1) return false;
			point_sign = 1;
			count++;
			continue;
		} 
			
	}
	if(last_ele == 2 || last_ele == 3) return false;
	else return true;
}		
function calculate() {
	var x = stack.join("");
	if(check_error())
		document.getElementById("output").textContent = eval(x);
	else
		alert(x + " is invaild !");
}

