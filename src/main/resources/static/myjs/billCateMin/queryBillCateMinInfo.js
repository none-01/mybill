$(function () {

    layui.use('layer', function () {
        var layer = layui.layer;
    });
    var billCateMinBtn = $(".billCateMin-Btn");
    billCateMinBtn.click(function () {
        setTimeout(function () {
            //查询大类信息
            queryBillCateMaxInfo($(".bCMin-BCMax-Select"));
            //查询小类信息
            queryBillCateMinList(1);
        }, 320);
    });
    //按钮查询
    $(".queryBillCateMinBtn").click(function(){
        queryBillCateMinList(1);
    });
    billMinPageClick();
});

/**
 * 查询小类信息
 * @param pageNum
 */
function queryBillCateMinList(pageNum){
    $.ajax({
        url:"queryBillCateMinList",
        data:$(".queryBillCateMinForm").serialize()+'&pageNum='+pageNum,
        type:"get",
        dataType:"json",
        beforeSend:function(){
            layer.load(2,{
                offset:'60%'
            });
            $(".billCateMinInfoTb").empty();
            $(".billcMin-all-select").prop("checked",false);
        },
        success:function (data) {
            loadingBillCateMinInfo(data);
            billCateMinPaging(data);
        }
    });
}

/**
 * 加载数据
 */
function loadingBillCateMinInfo(pageInfo) {
    var billCateMinInfo=pageInfo.list;
    var billCateMinInfoTb=$(".billCateMinInfoTb");
    var num=pageInfo.startRow;
    for (i=0;i<billCateMinInfo.length;i++){
        billCateMinInfoTb.append(
            '<tr>'+
                '<td><input type="checkbox" value="'+billCateMinInfo[i].billCateMinId+'" class="billcMin-one-select" style="margin: 0;"></td>'+
                '<td>'+num+++'</td>'+
                '<td>'+billCateMinInfo[i].billCategoryName+'</td>'+
                '<td>'+billCateMinInfo[i].billCateMinName+'</td>'+
                '<td>'+getDate(billCateMinInfo[i].createDate)+'</td>'+
                '<td>' +
                    '<button type="button" class="btn btn-info billCateMinUpdateBtn" id="'+billCateMinInfo[i].billCateMinId+'" style="background: #1E9FFF;border: #1E9FFF;height: 20px;width: 60px;padding: 0;font-size:12px "> '+
                        '<span class="glyphicon glyphicon glyphicon-leaf"></span>'+
                        ' 编辑' +
                    '</button>&nbsp&nbsp'+
                    '<button type="button" class="btn btn-warning billCateMinDelBtn" id="'+billCateMinInfo[i].billCateMinId+'" style="background: #FF5722;border: #FF5722;height: 20px;width: 60px;padding: 0;font-size:12px">' +
                        '<span class="glyphicon glyphicon-trash"></span>'+
                        ' 删除' +
                    '</button>' +
                '</td>'+
            '</tr>'
        );
    }
}

/**
 * 分页
 */
function billCateMinPaging(pageInfo){
    $(".bill-cateMin-page").empty();
    $(".bill-cateMin-page").append('<li><a data-num="1" class="firstPage" href="javascript:void();">&laquo;&laquo;</a></li>');
    $(".bill-cateMin-page").append('<li><a data-num="'+pageInfo.prePage+'" class="prevPage" href="javascript:void();">&laquo;</a></li>');
    for(i=0;i<pageInfo.navigatepageNums.length;i++){
        if(pageInfo.pageNum==pageInfo.navigatepageNums[i]){
            $(".bill-cateMin-page").append('<li class="active"><a href="javascript:void();" class="navPageNums">'+pageInfo.navigatepageNums[i]+'</a></li>');
        }else{
            $(".bill-cateMin-page").append('<li><a href="javascript:void();" class="navPageNums">'+pageInfo.navigatepageNums[i]+'</a></li>');
        }
    }
    $(".bill-cateMin-page").append('<li><span><input class="currentPage" type="text" value="'+pageInfo.pageNum+'" style="width: 50px;height: 20px;">/<span class="pages">'+pageInfo.pages+'页</span></span></li>');
    $(".bill-cateMin-page").append('<li><a class="total" href="javascript:void();">共'+pageInfo.total+"条账单小类"+'</a></li>');
    $(".bill-cateMin-page").append('<li><a data-num="'+pageInfo.nextPage+'" class="nextPage" href="javascript:void();">&raquo;</a></li>');
    $(".bill-cateMin-page").append('<li><a data-num="'+pageInfo.pages+'" class="lastPage" href="javascript:void();">&raquo;&raquo;</a></li>');
    layer.closeAll();
}

/**
 * 分页查询按钮
 */
function billMinPageClick() {
    var pagesBtn=$(".bill-cateMin-page");
    pagesBtn.on("click",".firstPage",function () {
        var pageNum=$(this).data("num");
        queryBillCateMinList(pageNum);
    });
    pagesBtn.on("click",".prevPage",function () {
        var pageNum=$(this).data("num");
        queryBillCateMinList(pageNum);
    });
    pagesBtn.on("click",".navPageNums",function () {
        var pageNum=$(this).html();
        queryBillCateMinList(pageNum);
    });
    pagesBtn.on("click",".nextPage",function () {
        var pageNum=$(this).data("num");
        queryBillCateMinList(pageNum);
    });
    pagesBtn.on("click",".lastPage",function () {
        var pageNum=$(this).data("num");
        queryBillCateMinList(pageNum);
    });
    pagesBtn.on("blur",".currentPage",function () {
        var pageNum=$(this).val();
        if((/^(\+|-)?\d+$/.test( pageNum ))|| pageNum<0){
            queryBillCateMinList(pageNum);
            return true;
        }else{
            queryBillCateMinList(1);
            return false;
        }

    });
}