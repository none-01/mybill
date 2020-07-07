$(function () {
    var body=$("body");
    body.on('click','.addBillIngInfoBtn',function () {
        addBillCateIngInfo();
    });
    /**
     * 切换大类查询小类
     */
    body.on("change",".add-billIngMax-Info-Select",function () {
        var id=$(this).val();
        queryBillCateMinInfo($(".add-billIngMin-Info-Select"),id);
    });
    /**
     * 切换小类修改账单描述
     */
    body.on("change",".add-billIngMin-Info-Select",function () {
        var content=$(".add-billIngMin-Info-Select option:selected").text();
        $(".add-BillIng-billDesCribe").val(content);
    });

});

/**
 * 添加对话框
 */
function addBillIngUi() {
    layer.open({
        type: 1 //Page层类型
        , area: ['530px', '540px']
        , title: '添加账单信息'
        , shade: 0.6 //遮罩透明度
        , maxmin: false //允许全屏最小化
        , anim: 0 //0-6的动画形式，-1不开启
        , content:
            '<form class="form-horizontal addBillIngForm" role="form">' +
                '<div class="form-group col-lg-12" style="margin-top: 40px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">支出/收入日期</label>' +
                    '<div class="col-sm-9">' +
                        '<input name="expDate"  class="form-control" id ="expDate"type="text" readonly="readonly"/>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-12" style="margin-top: 10px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">大类名称</label>' +
                    '<div class="col-sm-9">' +
                        '<select name="billCategoryId" class="form-control add-billIngMax-Info-Select">'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-12" style="margin-top: 10px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">小类名称</label>' +
                    '<div class="col-sm-9">' +
                        '<select name="billCateMinId" class="form-control add-billIngMin-Info-Select">'+
                            '<option value="">记账小类</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group col-lg-12" style="margin-top: 10px;">'+
                    '<label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">支出类型</label>' +
                    '<div class="col-sm-9">' +
                        '<select name="billType" class="form-control">'+
                            '<option value="支出">支出</option>'+
                            '<option value="收入">收入</option>'+
                        '</select>'+
                    '</div>'+
                '</div>'+
            '  <div class="form-group col-sm-12" style="margin-top: 10px;">' +
            '    <label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">账单金额</label>' +
            '    <div class="col-sm-9">' +
            '      <input type="text" name="money" class="form-control" id="firstname" placeholder="请输入账单金额">' +
            '    </div>' +
            '  </div>' +
            '  <div class="form-group col-sm-12" style="margin-top: 10px;">' +
            '    <label style="margin-left: -5px;" for="firstname" class="col-sm-3 control-label">记账描述</label>' +
            '    <div class="col-sm-9">' +
            '      <input type="text" name="billDesCribe" class="form-control add-BillIng-billDesCribe" id="firstname" placeholder="请输入账单描述">' +
            '    </div>' +
            '  </div>' +
            '  <a href="javascript:void();" class="btn btn-info addBillIngInfoBtn" style="background: #009688;border: #009688;margin-right: 10px;width: 80px;position: absolute;left: 400px;bottom: 35px;">'+
            '  添加'+
            '  </a>'+
            '</form>',
            success:function () {
                //执行一个laydate实例
                laydate.render({
                    elem: '#expDate' //指定元素
                    ,value: new Date()
                    ,calendar: true
                });
            }
    });
    queryBillCateMaxInfo($(".add-billIngMax-Info-Select"));
}

/**
 * 添加账单信息
 *
 */
function addBillCateIngInfo() {
    var billIngArr= $(".addBillIngForm").serializeArray();
    if(checkAddBillIngInfo(billIngArr)){
        layer.load(0, {
            shade: [0.1,'#000'] //0.1透明度的白色背景
        }); //0代表加载的风格，支持0-2
        $.ajax({
            url:'addBillCateIngInfo',
            data:$(".addBillIngForm").serialize(),
            type:'post',
            dataType:'json',
            success:function(data){
                if(data.flag){
                    layer.closeAll();
                    setTimeout(function () {
                        //查询账单信息
                        queryBillIngList(1);
                        //更新支出收入信息
                        getExpIncMoneyInfo();
                    },300);
                    layer.msg('添加成功！', {icon: 1});
                }else{
                    layer.closeAll();
                    layer.msg(data.msg,function () {});
                }
            }
        });
    }
}

/**
 * 检查添加账单表单是否为空
 * @param billIngArr
 */
function checkAddBillIngInfo(billIngArr) {
    if(billIngArr[0].value==''||billIngArr[0].value.length==0){
        layer.msg('日期不能为空！', function () {});
        return false;
    }
    if(billIngArr[1].value==''||billIngArr[1].value.length==0){
        layer.msg('账单大类不能为空！', function () {});
        return false;
    }
    if(billIngArr[2].value==''||billIngArr[2].value.length==0){
        layer.msg('账单小类不能为空！', function () {});
        return false;
    }
    if(billIngArr[3].value==''||billIngArr[3].value.length==0){
        layer.msg('支出类型不能为空！', function () {});
        return false;
    }
    if(billIngArr[4].value==''||billIngArr[4].value.length==0){
        layer.msg('账单金额不能为空！', function () {});
        return false;
    }else{
        var re =  /^(0|\+?[1-9.][0-9.]*)$/;
        if (!re.test(billIngArr[4].value)) {
            layer.msg('请输入正确的金额！', function () {});
            return false;
        }
    }
    return  true;
}