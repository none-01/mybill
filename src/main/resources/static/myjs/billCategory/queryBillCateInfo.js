$(function () {
    layui.use('layer', function () {
        var layer = layui.layer;
    });
    var billcateBtn = $(".billcate_btn");
    billcateBtn.click(function () {
        setTimeout(function () {
            queryBillCateInfo(1);
        }, 320);
    });
    $(".billCategoryBtn").click(function(){
        queryBillCateInfo(1);
    });
    pageClick();
});
function queryBillCateInfo(pageNum){
    $.ajax({
        url:"queryBillCateInfo",
        data:$(".queryBillCateForm").serialize()+'&pageNum='+pageNum,
        type:"get",
        dataType:"json",
        beforeSend:function(){
            layer.load(2,{
                offset:'60%'
            });
            $(".billCateInfoTb").empty();
            $(".billc-all-select").prop("checked",false);
        },
        success:function (data) {
            loadingBillCateInfo(data);
            paging(data);
        }
    });
}

/**
 * 加载数据
 */
function loadingBillCateInfo(pageInfo) {
    var billCateInfo=pageInfo.list;
    var billCateInfoTb=$(".billCateInfoTb");
    var num=pageInfo.startRow;
    for (i=0;i<billCateInfo.length;i++){
        billCateInfoTb.append(
            '<tr>'+
                '<td><input type="checkbox" value="'+billCateInfo[i].billCategoryId+'" class="billc-one-select" style="margin: 0;"></td>'+
                '<td>'+num+++'</td>'+
                '<td>'+billCateInfo[i].billCategoryName+'</td>'+
                '<td>'+getDate(billCateInfo[i].createDate)+'</td>'+
                '<td>' +
                    '<button type="button" class="btn btn-info billCateUpdateBtn" id="'+billCateInfo[i].billCategoryId+'" style="background: #1E9FFF;border: #1E9FFF;height: 20px;width: 60px;padding: 0;font-size:12px "> '+
                        '<span class="glyphicon glyphicon glyphicon-leaf"></span>'+
                        ' 编辑' +
                    '</button>&nbsp&nbsp'+
                    '<button type="button" class="btn btn-warning billCateDelBtn" id="'+billCateInfo[i].billCategoryId+'" style="background: #FF5722;border: #FF5722;height: 20px;width: 60px;padding: 0;font-size:12px">' +
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
function paging(pageInfo){
    $(".bill-cate-page").empty();
    $(".bill-cate-page").append('<li><a data-num="1" class="firstPage" href="javascript:void();">&laquo;&laquo;</a></li>');
    $(".bill-cate-page").append('<li><a data-num="'+pageInfo.prePage+'" class="prevPage" href="javascript:void();">&laquo;</a></li>');
    for(i=0;i<pageInfo.navigatepageNums.length;i++){
        if(pageInfo.pageNum==pageInfo.navigatepageNums[i]){
            $(".bill-cate-page").append('<li class="active"><a href="javascript:void();" class="navPageNums">'+pageInfo.navigatepageNums[i]+'</a></li>');
        }else{
            $(".bill-cate-page").append('<li><a href="javascript:void();" class="navPageNums">'+pageInfo.navigatepageNums[i]+'</a></li>');
        }
    }
    $(".bill-cate-page").append('<li><span><input class="currentPage" type="text" value="'+pageInfo.pageNum+'" style="width: 50px;height: 20px;">/<span class="pages">'+pageInfo.pages+'页</span></span></li>');
    $(".bill-cate-page").append('<li><a class="total" href="javascript:void();">共'+pageInfo.total+"条账单大类"+'</a></li>');
    $(".bill-cate-page").append('<li><a data-num="'+pageInfo.nextPage+'" class="nextPage" href="javascript:void();">&raquo;</a></li>');
    $(".bill-cate-page").append('<li><a data-num="'+pageInfo.pages+'" class="lastPage" href="javascript:void();">&raquo;&raquo;</a></li>');
    layer.closeAll();
}

/**
 * 分页查询按钮
 */
function pageClick() {
    var pagesBtn=$(".bill-cate-page");
    pagesBtn.on("click",".firstPage",function () {
        var pageNum=$(this).data("num");
        queryBillCateInfo(pageNum);
    });
    pagesBtn.on("click",".prevPage",function () {
        var pageNum=$(this).data("num");
        queryBillCateInfo(pageNum);
    });
    pagesBtn.on("click",".navPageNums",function () {
        var pageNum=$(this).html();
        queryBillCateInfo(pageNum);
    });
    pagesBtn.on("click",".nextPage",function () {
        var pageNum=$(this).data("num");
        queryBillCateInfo(pageNum);
    });
    pagesBtn.on("click",".lastPage",function () {
        var pageNum=$(this).data("num");
        queryBillCateInfo(pageNum);
    });
    pagesBtn.on("blur",".currentPage",function () {
        var pageNum=$(this).val();
        if((/^(\+|-)?\d+$/.test( pageNum ))|| pageNum<0){
            queryBillCateInfo(pageNum);
            return true;
        }else{
            queryBillCateInfo(1);
            return false;
        }

    });
}