$(function(){
    var body=$("body");
    /**
     * 单选删除
     */
    body.on('click','.billIngDelBtn',function () {
        var billIngId=$(this).prop("id");
        delOneBillIngInfo(billIngId);
    });

    /**
     * 选择要删除的checkbox
     */
    selectBillIng();
});

/**
 * 单个删除账单信息
 * @param billIngId
 */
function delOneBillIngInfo(billIngId) {
    layer.msg('确认删除', {
        time:10000,
        btn: ['删除', '取消']
        ,btn1: function(){
            layer.load(0, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            }); //0代表加载的风格，支持0-2
            $.ajax({
                url:'delOneBillIngInfo',
                data:{billIngId:billIngId},
                type:'post',
                dataType:'json',
                success:function (data) {
                    if(data.flag){
                        layer.closeAll();
                        setTimeout(function () {
                            queryBillIngList(1);
                            //更新支出收入信息
                            getExpIncMoneyInfo();
                        },300);
                        layer.msg('删除成功！', {icon: 1});
                    }else{
                        layer.closeAll();
                        layer.msg(data.msg,function () {});
                    }
                }
            });
        }
    });
}

/**
 * 选择操作
 */
function selectBillIng() {
    //全选操作
    $('.billIng-all-select').click(function () {
        if($(this).prop("checked")){
            $(".billIng-one-select").prop("checked","checked");
        }else{
            $(".billIng-one-select").prop("checked","");
        }
    });
    //单选操作
    $("body").on("click",".billIng-one-select",function () {
        var i=0;
        $('.billIng-one-select:checked').each(function () {
            i++;
        });
        if($('.billIng-one-select').length==i){
            $(".billIng-all-select").prop("checked","checked");
        }else{
            $(".billIng-all-select").prop("checked","");
        }
    });
}

/**
 * 选择删除
 */
function delSelectBillIng() {
    var ids=getBillIngIds();
    if(ids.length==0){
        layer.msg('还没有选中的账单信息',function () {});
        return;
    }
    layer.msg('删除选择账单信息', {
        time:10000,
        btn: ['删除', '取消']
        ,btn1: function(){
            layer.load(0, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            }); //0代表加载的风格，支持0-2
            $.ajax({
                url:'delSelectBillIng',
                data:{billIngIds:ids},
                type:'post',
                dataType:'json',
                success:function (data) {
                    if(data.flag){
                        layer.closeAll();
                        setTimeout(function () {
                            queryBillIngList(1);
                            //更新支出收入信息
                            getExpIncMoneyInfo();
                        },300);
                        layer.msg('删除成功！', {icon: 1});
                    }else{
                        layer.closeAll();
                        layer.msg(data.msg,function () {});
                    }
                }
            });
        }
    });
}

function getBillIngIds() {
    var ids=[];
    $(".billIng-one-select:checked").each(function () {
        ids.push($(this).val());
    });
    return ids;
}