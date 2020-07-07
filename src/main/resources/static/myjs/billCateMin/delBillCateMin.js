$(function(){
    var body=$("body");
    /**
     * 单选删除
     */
    body.on('click','.billCateMinDelBtn',function () {
        var billCateMinId=$(this).prop("id");
        delOneBillCateMinInfo(billCateMinId);
    });

    /**
     * 选择要删除的checkbox
     */
    selectBillCateMin();
});

/**
 * 单个删除大类信息
 * @param billCateMinId
 */
function delOneBillCateMinInfo(billCateMinId) {
    layer.msg('确认删除', {
        time:10000,
        btn: ['删除', '取消']
        ,btn1: function(){
            layer.load(0, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            }); //0代表加载的风格，支持0-2
            $.ajax({
                url:'delOneBillCateMinInfo',
                data:{billCateMinId:billCateMinId},
                type:'post',
                dataType:'json',
                success:function (data) {
                    if(data.flag){
                        layer.closeAll();
                        setTimeout(function () {
                            queryBillCateMinList(1);
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
function selectBillCateMin() {
    //全选操作
    $('.billcMin-all-select').click(function () {
        if($(this).prop("checked")){
            $(".billcMin-one-select").prop("checked","checked");
        }else{
            $(".billcMin-one-select").prop("checked","");
        }
    });
    //单选操作
    $("body").on("click",".billc-one-select",function () {
        var i=0;
        $('.billcMin-one-select:checked').each(function () {
            i++;
        });
        if($('.billcMin-one-select').length==i){
            $(".billcMin-one-select").prop("checked","checked");
        }else{
            $(".billcMin-one-select").prop("checked","");
        }
    });
}

/**
 * 选择删除
 */
function delSelectBillCateMin() {
    var ids=getBillCateMinIds();
    if(ids.length==0){
        layer.msg('还没有选中的账单小类',function () {});
        return;
    }
    layer.msg('删除选择账单小类', {
        time:10000,
        btn: ['删除', '取消']
        ,btn1: function(){
            layer.load(0, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            }); //0代表加载的风格，支持0-2
            $.ajax({
                url:'delSelectBillCateMin',
                data:{billCateMinIds:ids},
                type:'post',
                dataType:'json',
                success:function (data) {
                    if(data.flag){
                        layer.closeAll();
                        setTimeout(function () {
                            queryBillCateMinList(1)
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

function getBillCateMinIds() {
    var ids=[];
    $(".billcMin-one-select:checked").each(function () {
        ids.push($(this).val());
    });
    return ids;
}