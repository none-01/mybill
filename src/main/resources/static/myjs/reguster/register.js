$(function () {
    layui.use('layer', function () {
        var layer = layui.layer;
    });
    $(".register_btn").click(function(){
        if(checkRegisterUser()){
            checkUserInfoIsNull();
        }
    });
});

/**
 * 注册用户
 */
function registerUser() {
    $.ajax({
        url:'registerUser',
        data:$(".userInfo").serialize(),
        type:'post',
        dataType:'json',
        success:function (data) {
            if(data.flag){
                layer.msg('注册成功!');
            }else {
                layer.msg('注册失败-1!');
            }
        }
    });
}

/**
 * 检查文本框是否为空
 * @returns {boolean}
 */
function checkRegisterUser() {
    if($("#userName").val()==''||$("#userName").val().length==0){
        layer.msg('用户名不能为空！', function () {});
        return false;
    }
    if($("#nickName").val()==''||$("#nickName").val().length==0){
        layer.msg('账号名称不能为空！', function () {});
        return false;
    }
    if($(".password").val()==''||$(".password").val().length==0){
        layer.msg('密码不能为空！', function () {});
        return false;
    }
    if($(".compassword").val()==''||$(".compassword").val().length==0){
        layer.msg('请再次确认密码！', function () {});
        return false;
    }
    if($(".compassword").val()!=$(".password").val()){
        layer.msg('两次输入的密码不一致,请再次输入！', function () {});
        return false;
    }
    return true;
}

/**
 * 检查用户名是否存在
 */
function checkUserInfoIsNull() {
    $.ajax({
        url:'checkUserInfoIsNull',
        data:{userName:$("#userName").val()},
        type:'post',
        dataType:'json',
        success:function (data) {
            if(data.flag){
                registerUser();
            }else{
                layer.msg(data.msg,function () {});
            }
        }
    });
}