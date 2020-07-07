$(function () {
    $(".userInfo-Btn").click(function () {
        upQueryPersonalData();
    });
    selectHeadImgs();
    $("body").on('click','.updateUserInfo-Btn',function () {
        updateUserInfo();
    });
    //修改密码
    $("body").on('click','.updatePassWord-btn',function () {
        updateUserPassWord();
    });
});

/**
 * 查询要修改的个人资料
 */
function upQueryPersonalData(){
    layer.load(0, {
        shade: [0.1,'#000'] //0.1透明度的白色背景
    }); //0代表加载的风格，支持0-2
    $.ajax({
        url:'queryPersonalData',
        type:'get',
        dataType:'json',
        success:function (data) {
            layer.closeAll();
            userInfoUi(data);
        }
    });
}

/**
 * 个人资料对话框
 */
function userInfoUi(data) {
    layer.open({
        type: 1 //Page层类型
        , area: ['510px', '370px']
        , title: '个人资料'
        , shade: 0.6 //遮罩透明度
        , maxmin: false //允许全屏最小化
        , anim: 0 //0-6的动画形式，-1不开启
        , content:
            '<form class="form-horizontal updateUserInfoForm" enctype="multipart/form-data" role="form">' +
                '<div class="form-group col-lg-12" style="margin-top: 20px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">头像：</label>'+
                    '<div class="col-sm-9">'+
                        '<img class="headImg-btn" style="margin-left: -20px;" width="100" height="100" src="'+data.headImg+'"/>'+
                        '<input name="file"  class="img-file-btn" type="file" style="display: none" accept = "image/*">'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-12" style="margin-top: 0px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">用户名：</label>'+
                    '<div class="col-sm-9">'+
                        '<h3 style="margin-top: 4px;margin-left: -20px;color: #555555;">'+data.userName+'</h3>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-12" style="margin-top: 0px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">账号名称：</label>'+
                    '<div class="col-sm-9">'+
                        '<input name="nickName" style="margin-left: -20px;" type="text" id="firstname" class="form-control" value="'+data.nickName+'">'+
                    '</div>'+
                '</div>'+
                '<a href="javascript:void();" class="btn btn-info updateUserInfo-Btn" style="background: #00B438;border: #00B438;margin-right: 10px;width: 80px;position: absolute;left:110px;bottom: 35px;">'+
                    '保存'+
                '</a>'+
            '</form>'
    });
}

/**
 * 选择头像
 */
function selectHeadImgs() {
    var body=$("body");
    body.on('click','.headImg-btn',function () {
        $(".img-file-btn").trigger('click');
        $(".img-file-btn").on("change",function(){
            var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                $(".headImg-btn").attr("src", objUrl); //将图片路径存入src中，显示出图片
            }
        });
    });
}
//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

/**
 * 修改个人资料
 */
function updateUserInfo() {
    var dataform=new FormData($(".updateUserInfoForm")[0]);
    layer.load(0, {
        shade: [0.1,'#000'] //0.1透明度的白色背景
    }); //0代表加载的风格，支持0-2
    $.ajax({
        url:'updateUserInfo',
        data:dataform,
        type:'post',
        processData: false,
        contentType: false,
        dataType:'json',
        success:function (data) {
            if (data.flag){
                layer.closeAll();
                layer.msg("修改成功!");
                queryPersonalData();
            }else {
                layer.msg("修改失败!");
            }
        }
    });
}

/**
 * 查询个人资料
 */
function queryPersonalData(){
    $.ajax({
        url:'queryPersonalData',
        type:'get',
        dataType:'json',
        success:function (data) {
            $(".userNameNickName-span").empty();
            $(".userNameNickName-span").html(" "+data.userName+'('+data.nickName+')');
            $(".touxImg").prop("src",data.headImg);
            $(".span-NickName").empty();
            $(".span-NickName").html(data.nickName);
        }
    });
}

function updatePassword() {
    layer.open({
        type: 1 //Page层类型
        , area: ['530px', '350px']
        , title: '修改密码'
        , shade: 0.6 //遮罩透明度
        , maxmin: false //允许全屏最小化
        , anim: 0 //0-6的动画形式，-1不开启
        , content:
            '<form class="form-horizontal updatePasswordForm" role="form">' +
                '<div class="form-group col-lg-12" style="margin-top: 20px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">旧密码</label>' +
                    '<div class="col-sm-9">' +
                        '<input type="password" name="usedPassWord" class="form-control" id="firstname" placeholder="请输入旧密码">'+
                    '</div>'+
                '</div>'+
            '<div class="form-group col-lg-12" style="margin-top: 20px;">'+
                '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">新密码</label>' +
                    '<div class="col-sm-9">' +
                    '<input type="password" name="newPassWord" class="form-control" id="firstname" placeholder="请输入新密码">'+
                '</div>'+
            '</div>'+
            '<div class="form-group col-lg-12" style="margin-top: 20px;">'+
                '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">确认新密码</label>' +
                '<div class="col-sm-9">' +
                    '<input type="password" name="comPassWord" class="form-control" id="firstname" placeholder="请确认新密码">'+
                '</div>'+
            '</div>'+
                '<a href="javascript:void();" class="btn btn-info updatePassWord-btn" style="background: #009688;border: #009688;margin-right: 10px;width: 80px;position: absolute;left: 400px;bottom: 35px;">'+
                    '修改密码'+
                '</a>'+
            '</form>'
    });
}

/**
 * 修改密码
 */
function updateUserPassWord(){
    if(checkUpPassWord()){
        layer.load(0, {
            shade: [0.1,'#000'] //0.1透明度的白色背景
        }); //0代表加载的风格，支持0-2
        $.ajax({
            url:'updateUserPassWord',
            data:$(".updatePasswordForm").serialize(),
            type:'post',
            dataType:'json',
            success:function (data) {
                if (data.flag){
                    layer.closeAll();
                    layer.msg("密码修改成功,即将退出!");
                    setTimeout(function () {
                        window.location.href="loginOut";
                    },300);
                }else {
                    layer.msg("密码修改失败!");
                }
            }
        });
    }
}

function checkUpPassWord(){
    var pwds=$(".updatePasswordForm").serializeArray();
    if(pwds[0].value==''||pwds[0].value.length==0){
        layer.msg("旧密码不能为空!",function () {});
        return false;
    }
    if(pwds[1].value==''||pwds[1].value.length==0){
        layer.msg("新密码不能为空!",function () {});
        return false;
    }
    if(pwds[2].value==''||pwds[2].value.length==0){
        layer.msg("请确认新密码不能为空!",function () {});
        return false;
    }
    if(pwds[2].value!=pwds[1].value){
        layer.msg("两次输入密码不一致!",function () {});
        return false;
    }
    return true;
}