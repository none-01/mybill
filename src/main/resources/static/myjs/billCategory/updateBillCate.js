$(function () {
    var body=$("body");
    body.on('click','.billCateUpdateBtn',function () {
        var billCategoryId=$(this).prop("id");
        queryUpdateBillCate(billCategoryId);
    });
    body.on('click','.updateBillCateBtn',function () {
        upCheckBillCate();
    })
});

/**
 * 修改对话框
 */
function updateBillCateUi(data) {
    layer.open({
        type: 1 //Page层类型
        , area: ['500px', '280px']
        , title: '修改账单大类'
        , shade: 0.6 //遮罩透明度
        , maxmin: false //允许全屏最小化
        , anim: 0 //0-6的动画形式，-1不开启
        , content:
            '<form class="form-horizontal updateBillCateForm" role="form">' +
            '<input type="hidden" name="billCategoryId" value="'+data.billCategoryId+'">'+
            '  <div class="form-group col-sm-12" style="margin-top: 60px;">' +
            '    <label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">大类名称</label>' +
            '    <div class="col-sm-9">' +
            '      <input type="text" name="billCategoryName" value="'+data.billCategoryName+'" class="form-control update-billCategoryName" id="firstname" placeholder="请输入大类名称">' +
            '    </div>' +
            '  </div>' +
            '  <a href="javascript:void();" class="btn btn-info updateBillCateBtn" style="background: #009688;border: #009688;margin-right: 10px;width: 80px;position: absolute;left: 370px;bottom: 50px;">'+
            '  修改'+
            '  </a>'+
            '</form>'
    });
}

/**
 * 查询要修改的信息
 * @param billCategoryId
 */
function queryUpdateBillCate(billCategoryId){
    $.ajax({
        url:'queryUpdateBillCate',
        data:{billCategoryId:billCategoryId},
        type:'get',
        dataType:'json',
        beforeSend:function () {
            layer.load(0, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            }); //0代表加载的风格，支持0-2
        },
        success:function (data) {
            layer.closeAll();
            updateBillCateUi(data);
        }
    });
}

/**
 * 修改大类信息
 */
function  updateBillCateInfo(){
    layer.load(0, {
        shade: [0.1,'#000'] //0.1透明度的白色背景
    }); //0代表加载的风格，支持0-2
    $.ajax({
        url:'updateBillCateInfo',
        data:$(".updateBillCateForm").serialize(),
        type:'post',
        dataType:'json',
        success:function(data) {
            if(data.flag){
                layer.closeAll();
                setTimeout(function () {
                    queryBillCateInfo(1)
                },300);
                layer.msg('修改成功！', {icon: 1});
            }else{
                layer.closeAll();
                layer.msg(data.msg,function () {});
            }
        }
    });
}

/**
 * 检查大类是否存在
 */
function upCheckBillCate() {
    var billCategoryName=$(".update-billCategoryName").val();
    if(billCategoryName==''||billCategoryName.length==0){
        layer.msg('账单大类不能为空！',function () {});
        return;
    }
    $.ajax({
        url:'checkBillCate',
        data:{billCategoryName:billCategoryName},
        type:'post',
        dataType:'json',
        success:function(data){
            if(data.flag){
                updateBillCateInfo();
            }else{
                layer.msg(data.msg,function () {});
            }
        }
    });
}