$(document).ready(function () {
	var errFlag = false;

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange=function() {
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			var errMsg = JSON.parse(xmlhttp.responseText);
			if(errMsg.nameRE) {
				// $("#mgs1").css("borderColor", "red")
				$(".msg").eq(0).html("用户名重复，请重新输入！");
			}
			if(errMsg.schoolIdRE) {
				// $("#mgs2").css("borderColor", "red")
				$(".msg").eq(1).html("学号重复，请重新输入！");
			}
			if(errMsg.phoneNumberRE) {
				// $("#mgs3").css("borderColor", "red")
				$(".msg").eq(2).html("您的手机号码已被注册！");
			}
			if(errMsg.emailRE) {
				// $("#mgs4").css("borderColor", "red")
				$(".msg").eq(3).html("您的邮箱已被注册！");
			}											
		}
		
	}
	xmlhttp.open("GET", "errMsg.json", true);
	xmlhttp.send();

	$("input").change(function() {
		errFlag = false;
		// $("input").attr("borderColor", "#c8cccf");
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
				if(/^[1-9][0-9]{7}$/.test(this.value)) $(".msg").eq(index).html("");
				else {
					errFlag = true; 
					$(".msg").eq(index).html("学号8位数字，不能以0开头.");
				}
				break;
			case 2:
				if(/^[1-9][0-9]{10}$/.test(this.value)) $(".msg").eq(index).html("");
				else {
					errFlag = true; 
					$(".msg").eq(index).html("电话11位数字，不能以0开头.");
				}
				break;
			case 3:
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