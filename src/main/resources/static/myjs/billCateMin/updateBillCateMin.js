$(function () {
    var body=$("body");
    body.on('click','.billCateMinUpdateBtn',function () {
        var billCateMinId=$(this).prop("id");
        queryUpdateBillCateMin(billCateMinId);
    });
    body.on('click','.updateBillCateMinBtn',function () {
        upCheckBillCateMin();
    })
});

/**
 * 修改对话框
 */
function updateBillCateMinUi(data) {
    layer.open({
        type: 1 //Page层类型
        , area: ['500px', '300px']
        , title: '修改账单小类'
        , shade: 0.6 //遮罩透明度
        , maxmin: false //允许全屏最小化
        , anim: 0 //0-6的动画形式，-1不开启
        , content:
            '<form class="form-horizontal updateBillCateMinFom" role="form">' +
            '<input type="hidden" value="'+data.billCateMinId+'" name="billCateMinId">'+
            '<div class="form-group col-lg-12" style="margin-top: 40px;">'+
            '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">大类名称</label>' +
            '<div class="col-sm-9">' +
            '<select name="billCategoryId" class="form-control up-bCMin-BCMax-Select">'+
            '</select>'+
            '</div>'+
            '</div>'+
            '  <div class="form-group col-sm-12" style="margin-top: 20px;">' +
            '    <label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">小类名称</label>' +
            '    <div class="col-sm-9">' +
            '      <input type="text" value="'+data.billCateMinName+'" name="billCateMinName" class="form-control up-billCateMinName" id="firstname" placeholder="请输入小类名称">' +
            '    </div>' +
            '  </div>' +
            '  <a href="javascript:void();" class="btn btn-info updateBillCateMinBtn" style="background: #009688;border: #009688;margin-right: 10px;width: 80px;position: absolute;left: 370px;bottom: 25px;">'+
            '  修改'+
            '  </a>'+
            '</form>'
        ,success:function () {
            queryBillCateMaxInfoSelect('.up-bCMin-BCMax-Select',data.billCategoryId);
        }
    });

}

/**
 * 查询要修改的信息
 * @param billCateMinId
 */
function queryUpdateBillCateMin(billCateMinId){
    $.ajax({
        url:'queryUpdateBillCateMin',
        data:{billCateMinId:billCateMinId},
        type:'get',
        dataType:'json',
        beforeSend:function () {
            layer.load(0, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            }); //0代表加载的风格，支持0-2
        },
        success:function (data) {
            layer.closeAll();
            updateBillCateMinUi(data);
        }
    });
}

/**
 * 修改大类信息
 */
function  updateBillCateMinInfo(){
    layer.load(0, {
        shade: [0.1,'#000'] //0.1透明度的白色背景
    }); //0代表加载的风格，支持0-2
    $.ajax({
        url:'updateBillCateMinInfo',
        data:$(".updateBillCateMinFom").serialize(),
        type:'post',
        dataType:'json',
        success:function(data) {
            if(data.flag){
                layer.closeAll();
                setTimeout(function () {
                    queryBillCateMinList(1)
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
 * 检查小类是否存在
 */
function upCheckBillCateMin() {
    var billCateMinName=$(".up-billCateMinName").val();
    var billCategoryId=$(".up-bCMin-BCMax-Select").val();
    if(billCategoryId==''||billCategoryId.length==0){
        layer.msg('账单大类不能为空！',function () {});
        return;
    }
    if(billCateMinName==''||billCateMinName.length==0){
        layer.msg('账单小类不能为空！',function () {});
        return;
    }
    $.ajax({
        url:'checkBillCateMin',
        data:{billCateMinName:billCateMinName},
        type:'post',
        dataType:'json',
        success:function(data){
            if(data.flag){
                updateBillCateMinInfo();
            }else{
                layer.msg(data.msg,function () {});
            }
        }
    });
}