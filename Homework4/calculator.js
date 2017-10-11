



function calculate() {
	for (var i = 0; i < stack.length - 1; i++) {
		if(Number(stack[i]) != NaN) {
			var n = i + 1;
			while (stack[n] != NaN && n < stack.length) {
				n++;
			}
			var total = 0;
			for (var k = i; k < n; k++) {
				total *= 10;
				total += stack[k];
			}
			stack.splice(i, n - i, total);
		}
	}
	// for (var i = 0; i < stack.length; i++) {
	// 	if(stack[i] == '*' || stack[i] == '/'){
	// 	}
	}
}
