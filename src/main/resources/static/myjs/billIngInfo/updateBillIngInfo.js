$(function () {
    var body=$("body");
    body.on('click','.billIngUpdateBtn',function () {
        var billIngId=$(this).prop("id");
        queryUpdateBillIngInfo(billIngId);
    });
    body.on('click','.updateBillIngInfoBtn',function () {
        updateBillIngInfo();
    });
    /**
     * 切换大类查询小类
     */
    body.on("change",".update-billIngMax-Info-Select",function () {
        var id=$(this).val();
        queryBillCateMinInfo($(".update-billIngMin-Info-Select"),id);
    });
    /**
     * 切换小类修改账单描述
     */
    body.on("change",".update-billIngMin-Info-Select",function () {
        var content=$(".update-billIngMin-Info-Select option:selected").text();
        $(".update-BillIng-billDesCribe").val(content);
    });
});

/**
 * 修改对话框
 */
function updateBillIngInfoUi(data) {
    layer.open({
        type: 1 //Page层类型
        , area: ['530px', '540px']
        , title: '修改账单信息'
        , shade: 0.6 //遮罩透明度
        , maxmin: false //允许全屏最小化
        , anim: 0 //0-6的动画形式，-1不开启
        , content:
            '<form class="form-horizontal updateBillIngForm" role="form">' +
                '<input type="hidden" name="billIngId" value="'+data.billIngId+'">'+
                '<div class="form-group col-lg-12" style="margin-top: 40px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">支出/收入日期</label>' +
                    '<div class="col-sm-9">' +
                        '<input name="expDate"  class="form-control" id ="expDate"type="text" readonly="readonly"/>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-12" style="margin-top: 10px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">大类名称</label>' +
                    '<div class="col-sm-9">' +
                        '<select name="billCategoryId" class="form-control update-billIngMax-Info-Select">'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-12" style="margin-top: 10px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">小类名称</label>' +
                    '<div class="col-sm-9">' +
                        '<select name="billCateMinId" class="form-control update-billIngMin-Info-Select">'+
                            '<option value="">记账小类</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-12" style="margin-top: 10px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">支出类型</label>' +
                    '<div class="col-sm-9">' +
                        '<select name="billType" id="update-billType" class="form-control">'+
                            '<option value="支出">支出</option>'+
                            '<option value="收入">收入</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
            '  <div class="form-group col-sm-12" style="margin-top: 10px;">' +
            '    <label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">账单金额</label>' +
            '    <div class="col-sm-9">' +
            '      <input type="text" name="money" value="'+data.money+'" class="form-control" id="firstname" placeholder="请输入账单金额">' +
            '    </div>' +
            '  </div>' +
            '  <div class="form-group col-sm-12" style="margin-top: 10px;">' +
            '    <label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">记账描述</label>' +
            '    <div class="col-sm-9">' +
            '      <input type="text" name="billDesCribe" value="'+data.billDesCribe+'" class="form-control update-BillIng-billDesCribe" id="firstname" placeholder="请输入账单描述">' +
            '    </div>' +
            '  </div>' +
            '  <a href="javascript:void();" class="btn btn-info updateBillIngInfoBtn" style="background: #009688;border: #009688;margin-right: 10px;width: 80px;position: absolute;left: 400px;bottom: 35px;">'+
            '  修改'+
            '  </a>'+
            '</form>',
        success:function () {
            //执行一个laydate实例
            laydate.render({
                elem: '#expDate' //指定元素
                ,value: getDateToString(data.expDate)
                ,calendar: true
            });
            $("#update-billType").val(data.billType);
        }
    });
    queryBillCateMaxInfoSelect($(".update-billIngMax-Info-Select"),data.billCategoryId);
    queryBillCateMinInfoSelect($(".update-billIngMin-Info-Select"),data.billCateMinId,data.billCategoryId);
}

/**
 * 查询要修改的信息
 * @param billIngId
 */
function queryUpdateBillIngInfo(billIngId){
    $.ajax({
        url:'queryUpdateBillIngInfo',
        data:{billIngId:billIngId},
        type:'get',
        dataType:'json',
        beforeSend:function () {
            layer.load(0, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            }); //0代表加载的风格，支持0-2
        },
        success:function (data) {
            layer.closeAll();
            updateBillIngInfoUi(data);
        }
    });
}

/**
 * 修改账单信息
 */
function  updateBillIngInfo(){
    var billIngArr= $(".updateBillIngForm").serializeArray();
    if(checkUpBillIngInfo(billIngArr)) {
        layer.load(0, {
            shade: [0.1, '#000'] //0.1透明度的白色背景
        }); //0代表加载的风格，支持0-2
        $.ajax({
            url: 'updateBillIngInfo',
            data: $(".updateBillIngForm").serialize(),
            type: 'post',
            dataType: 'json',
            success: function (data) {
                if (data.flag) {
                    layer.closeAll();
                    setTimeout(function () {
                        queryBillIngList(1);
                        //更新支出收入信息
                        getExpIncMoneyInfo();
                    }, 300);
                    layer.msg('修改成功！', {icon: 1});
                } else {
                    layer.closeAll();
                    layer.msg(data.msg, function () {
                    });
                }
            }
        });
    }
}

/**
 * 检查修改的账单表单是否为空
 * @param billIngArr
 */
function checkUpBillIngInfo(billIngArr) {
    if(billIngArr[1].value==''||billIngArr[1].value.length==0){
        layer.msg('日期不能为空！', function () {});
        return false;
    }
    if(billIngArr[2].value==''||billIngArr[2].value.length==0){
        layer.msg('账单大类不能为空！', function () {});
        return false;
    }
    if(billIngArr[3].value==''||billIngArr[3].value.length==0){
        layer.msg('账单小类不能为空！', function () {});
        return false;
    }
    if(billIngArr[4].value==''||billIngArr[4].value.length==0){
        layer.msg('支出类型不能为空！', function () {});
        return false;
    }
    if(billIngArr[5].value==''||billIngArr[5].value.length==0){
        layer.msg('账单金额不能为空！', function () {});
        return false;
    }else{
        var re =  /^(0|\+?[1-9.][0-9.]*)$/;
        if (!re.test(billIngArr[5].value)) {
            layer.msg('请输入正确的金额！', function () {});
            return false;
        }
    }
    return  true;
}