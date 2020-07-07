$(function () {
    layui.use('layer', function () {
        var layer = layui.layer;
    });
    $(".login_btn").click(function () {
        userLogin();
    });
    $(document).keydown(function (e) {
       if(e.which==13){
           userLogin();
       }
    });
});

function userLogin() {
    var userInfo = $(".userInfo").serializeArray();
    var userName = userInfo[0].value;
    var passWord = userInfo[1].value;
    if (userName == '') {
        layer.msg("用户名不能为空!", function () {
        });
        return;
    }
    if (passWord == '') {
        layer.msg("密码不能为空!", function () {
        });
        return;
    }
    $.ajax({
        url: "userLogin",
        data: $(".userInfo").serialize(),
        type: "post",
        dataType: "json",
        beforeSend: function () {
            $(".login_btn").text("正在登录");
        },
        success: function (data) {
            if (data.flag) {
                window.location.href = "index";
                $(".login_btn").text("登录");
            } else {
                layer.msg(data.msg, function () {
                });
                $(".login_btn").text("登录");
            }
        }
    });
}