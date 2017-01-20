/*
   该脚本用于完成用户注册的表单验证
   * 阻止默认行为
     * 页面的默认行为
	   * <form>表单 - 点击submit按钮,提交表单
	   * <a>链接 - 点击<a>链接,通过href属性进行跳转
	 * 阻止默认行为
	   * return false;
	   * event.preventDefault();
   * 事件的处理函数,获取绑定事件的目标元素
     * this用法
	 * event.target
   * 事件对象event
     * event事件对象,被封装在所有DOM事件底层逻辑中
	 * 事件对象的标准写法 - event
	 * 提供内容
	   * target - 绑定事件的目标元素
	   * offsetX/pageX/clientX/x - 鼠标的坐标值x
	     * offsetX - 鼠标相对绑定事件的目标元素的坐标值
		 * pageX - 鼠标相对当前页面的坐标值
	   * offsetY/pageY/clientY/y - 鼠标的坐标值y
	   * keyCode
	   * return value
   * jQuery操作样式
     * attr("class",className) - 设置样式

	 * addClass() - 追加样式
	 * removeClass()
	 * toggleClass()
	 * hasClass()

	 * css()
   * 需求
     * 每个元素分别绑定focus和blur事件
	   * focus事件触发时 - 给出提示信息内容
	   * blur事件触发时 - 进行表单元素验证
	 * 提交表单时 - 表单内所有元素必须验证通过
   * CSS提供的样式(Class)
     * hide - 表示隐藏样式
	 * focus - 获取焦点样式
	 * error - 验证错误样式
 */
$(function(){
	/*
	$("input[class=text]").focus(function(){
		$("#"+this.id+"_msg").text(this.title).attr("class","focus");
		this.title = "";
	}).blur(function(){
		
	});
	*/
	
	// 用户名的获取焦点与失去焦点事件
	$("#username").focus(function(){
		// 获取焦点事件 - 给出提示信息内容
		$("#username_msg").text("请输入6至12之间的英文和数字组合.").attr("class","focus");
	}).blur(function(){
		eleValidator(this,$("#username_msg"),"用户名",/^[a-zA-Z0-9]{6,12}$/);
	});
	// 密码的获取焦点与失去焦点事件
	$("#password").focus(function(){
		$("#password_msg").text("请输入6至8之间的数字").attr("class","focus");
	}).blur(function(){
		eleValidator(this,$("#password_msg"),"密码",/^[0-9]{6,8}$/);
	});
	// 确认密码的获取焦点与失去焦点事件
	$("#pwdRepeat").focus(function(){
		$("#pwdRepeat_msg").text("请输入6至8之间的数字").attr("class","focus");
	}).blur(function(){
		if(eleValidator(this,$("#pwdRepeat_msg"),"密码",/^[0-9]{6,8}$/)){
			// 两次密码输入是否一致的验证
			if(this.value != $("#password").val()){
				$("#pwdRepeat_msg").text("两次密码输入不一致.").attr("class","error");
			}
		}
	});
	// email的获取焦点与失去焦点事件
	$("#mail").focus(function(){
		$("#mail_msg").text("请输入你的Email地址.").attr("class","focus");
	}).blur(function(){
		eleValidator(this,$("#mail_msg"),"Email",/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
	});
});

/*
   代码实现过程中,逻辑体出现类似结构(优化)
   * 封装一个通用的表单元素验证函数
   * 每一段逻辑代码中不同的内容:
     * 作为函数的参数进行传递
   * 定义的函数参数:
     * 需要验证的元素不同
	 * 显示消息的元素不同
	 * 提示消息不同
	 * 正则表达式不同
   * 为该通用验证函数增加返回Boolean值
 */
function eleValidator(elem,msgElem,msg,regExp){
	var value = elem.value;
	if(value == "" || value == null){
		msgElem.text("请输入你的"+msg+".").attr("class","error");
		return false;
	}else if(!regExp.test(value)){
		msgElem.text(msg+"输入有误.").attr("class","error");
		return false;
	}else{
		msgElem.text("").attr("class","hide");
		return true;
	}
}

// 表单提交验证函数
function validateForm(){
	if(!eleValidator(this,$("#username_msg"),"用户名",/^[a-zA-Z0-9]{6,12}$/) ||
		eleValidator(this,$("#password_msg"),"密码",/^[0-9]{6,8}$/) || 
		eleValidator(this,$("#password_msg"),"密码",/^[0-9]{6,8}$/) || 
		eleValidator(this,$("#mail_msg"),"Email",/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
	){// 其中有一个验证错误
		return false;
	}
	return true;
}