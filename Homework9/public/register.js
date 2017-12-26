$(document).ready(function () {
	var errFlag = false;
	$("input").change(function() {
		errFlag = false;
		var index = $("input").index($(this));
		switch(index) {
			case 0: 
				if(/^[a-zA-Z]\w{5,17}$/.test(this.value)) $(".msg").eq(index).html("");
				else {
					errFlag = true;
					$(".msg").eq(index).html("用户名6~18位英文字母、数字或下划线，必须以英文字母开头");
				}
				break; 
			case 1:
				if(/^\w{6,12}$/.test(this.value)) $(".msg").eq(index).html("");
				else {
					errFlag = true; 
					$(".msg").eq(index).html("密码为6~12位数字、大小写字母、中划线、下划线");
				}
				break;
			case 2:
				if(this.value == $("input")[(index - 1)].value) $(".msg").eq(index).html("");
				else {
					errFlag = true; 
					$(".msg").eq(index).html("两次密码不一致!");
				}
				break;								
			case 3:
				if(/^[1-9][0-9]{7}$/.test(this.value)) $(".msg").eq(index).html("");
				else {
					errFlag = true; 
					$(".msg").eq(index).html("学号8位数字，不能以0开头.");
				}
				break;
			case 4:
				if(/^[1-9][0-9]{10}$/.test(this.value)) $(".msg").eq(index).html("");
				else {
					errFlag = true; 
					$(".msg").eq(index).html("电话11位数字，不能以0开头.");
				}
				break;
			case 5:
				if(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(this.value)) $(".msg").eq(index).html("");
				else {
					errFlag = true; 
					$(".msg").eq(index).html("请输入正确的邮箱格式.");
				}
				break;							 					
		}
		if(errFlag) {
			$("#sub").attr("disabled", true);
		}
		else {
			$("#sub").attr("disabled", false);
		}		
	});

});