$(function(){
    var body=$("body");
    /**
     * 单选删除
     */
    body.on('click','.billCateDelBtn',function () {
        var billCategoryId=$(this).prop("id");
        delOneBillCateInfo(billCategoryId);
    });

    /**
     * 选择要删除的checkbox
     */
    selectBillCate();
});

/**
 * 单个删除大类信息
 * @param billCategoryId
 */
function delOneBillCateInfo(billCategoryId) {
    layer.msg('确认删除', {
        time:10000,
        btn: ['删除', '取消']
        ,btn1: function(){
            layer.load(0, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            }); //0代表加载的风格，支持0-2
            $.ajax({
                url:'delOneBillCateInfo',
                data:{billCategoryId:billCategoryId},
                type:'post',
                dataType:'json',
                success:function (data) {
                    if(data.flag){
                        layer.closeAll();
                        setTimeout(function () {
                            queryBillCateInfo(1)
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
function selectBillCate() {
    //全选操作
    $('.billc-all-select').click(function () {
        if($(this).prop("checked")){
            $(".billc-one-select").prop("checked","checked");
        }else{
            $(".billc-one-select").prop("checked","");
        }
    });
    //单选操作
    $("body").on("click",".billc-one-select",function () {
        var i=0;
        $('.billc-one-select:checked').each(function () {
            i++;
        });
        if($('.billc-one-select').length==i){
            $(".billc-all-select").prop("checked","checked");
        }else{
            $(".billc-all-select").prop("checked","");
        }
    });
}

/**
 * 选择删除
 */
function delSelectBillCate() {
    var ids=getBillCategoryIds();
    if(ids.length==0){
        layer.msg('还没有选中的账单大类',function () {});
        return;
    }
    layer.msg('删除选择账单大类', {
        time:10000,
        btn: ['删除', '取消']
        ,btn1: function(){
            layer.load(0, {
                shade: [0.1,'#000'] //0.1透明度的白色背景
            }); //0代表加载的风格，支持0-2
            $.ajax({
                url:'delSelectBillCate',
                data:{billCategoryIds:ids},
                type:'post',
                dataType:'json',
                success:function (data) {
                    if(data.flag){
                        layer.closeAll();
                        setTimeout(function () {
                            queryBillCateInfo(1)
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

function getBillCategoryIds() {
    var ids=[];
    $(".billc-one-select:checked").each(function () {
        ids.push($(this).val());
    });
    return ids;
}