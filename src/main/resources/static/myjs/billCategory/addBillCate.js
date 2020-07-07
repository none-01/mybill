$(function () {
    var body=$("body");
    body.on('click','.addBillCateBtn',function () {
        checkBillCate();
    });
});

function addBillCateUi() {
    layer.open({
        type: 1 //Page层类型
        , area: ['500px', '280px']
        , title: '添加账单大类'
        , shade: 0.6 //遮罩透明度
        , maxmin: false //允许全屏最小化
        , anim: 0 //0-6的动画形式，-1不开启
        , content:
            '<form class="form-horizontal" role="form">' +
            '  <div class="form-group col-sm-12" style="margin-top: 60px;">' +
            '    <label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">大类名称</label>' +
            '    <div class="col-sm-9">' +
            '      <input type="text" class="form-control add-billCategoryName" id="firstname" placeholder="请输入大类名称">' +
            '    </div>' +
            '  </div>' +
            '  <a href="javascript:void();" class="btn btn-info addBillCateBtn" style="background: #009688;border: #009688;margin-right: 10px;width: 80px;position: absolute;left: 370px;bottom: 50px;">'+
            '  添加'+
            '  </a>'+
            '</form>'
    });
}

/**
 * 检查大类是否存在
 */
function checkBillCate() {
    var billCategoryName=$(".add-billCategoryName").val();
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
                addBillCateInfo(billCategoryName);
            }else{
                layer.msg(data.msg,function () {});
            }
        }
    });
}

/**
 * 添加账单大类信息
 * @param billCategoryName
 */
function addBillCateInfo(billCategoryName) {
    layer.load(0, {
        shade: [0.1,'#000'] //0.1透明度的白色背景
    }); //0代表加载的风格，支持0-2
    $.ajax({
        url:'addBillCateInfo',
        data:{billCategoryName:billCategoryName},
        type:'post',
        dataType:'json',
        success:function(data){
            if(data.flag){
                layer.closeAll();
                setTimeout(function () {
                    queryBillCateInfo(1)
                },300);
                layer.msg('添加成功！', {icon: 1});
            }else{
                layer.closeAll();
                layer.msg(data.msg,function () {});
            }
        }
    });
}