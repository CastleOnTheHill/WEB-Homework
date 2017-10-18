
window.onload = function(){
	var stack = new Array();
	function show() {
		var x = stack.join("");
		alert(stack.length)
		document.getElementById("output").textContent = x;
	}

	function update_stack(ele) {
		stack.push(ele);
		show();
	}		


	function calculate() {
		var x = stack.join("");
		document.getElementById("output").textContent = eval(x);
	}

}