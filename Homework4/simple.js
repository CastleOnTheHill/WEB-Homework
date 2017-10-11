
window.onload = function(){
	document.getElementById("add-button").onclick = function(){
		var leftOperand = parseInt(document.getElementById("left-operand").value);
		var rightOperand = parseInt(document.getElementById("right-operand").value);
		var result = leftOperand + rightOperand;
		document.getElementById("result").value = result;
	}
}

function test() {
	alert(123);
}