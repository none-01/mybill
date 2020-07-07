$(function () {

    layui.use('layer', function () {
        var layer = layui.layer;
    });
    //初始化数据
    setTimeout(function () {
        //查询大类信息
        queryBillCateMaxInfo($(".billIng-bcMax-Select"));
        //查询账单信息
        queryBillIngList(1);
    }, 100);
    //点击大类查询小类
    $(".billIng-bcMax-Select").change(function () {
        var billCategoryId=$(this).val();
        //查询小类信息
        queryBillCateMinInfo($(".billIng-bcMin-Select"),billCategoryId);
    });
    //点击导航栏查询
    var billIngInfoBtn = $(".billIngInfo-Btn");
    billIngInfoBtn.click(function () {
        setTimeout(function () {
            //查询大类信息
            queryBillCateMaxInfo($(".billIng-bcMax-Select"));
            //查询账单信息
            queryBillIngList(1);
        }, 320);
    });
    //按钮查询
    $(".queryBillIngInfoBtn").click(function(){
        queryBillIngList(1);
    });
    billIngPageClick();
});

/**
 * 查询账单信息
 * @param pageNum
 */
function queryBillIngList(pageNum){
    $.ajax({
        url:"queryBillIngList",
        data:$(".queryBillIngInfoForm").serialize()+'&pageNum='+pageNum,
        type:"get",
        dataType:"json",
        beforeSend:function(){
            layer.load(2,{
                offset:'60%'
            });
            $(".billIngListTb").empty();
            $(".billIng-all-select").prop("checked",false);
        },
        success:function (data) {
            loadingBillIngInfo(data);
            billIngPaging(data);
        }
    });
}

/**
 * 加载数据
 */
function loadingBillIngInfo(data) {
    var billIngInfo=data.pageInfo.list;
    var billIngListTb=$(".billIngListTb");
    var num=data.pageInfo.startRow;
    for (i=0;i<billIngInfo.length;i++){
        billIngListTb.append(
            '<tr>'+
                '<td><input type="checkbox" value="'+billIngInfo[i].billIngId+'" class="billIng-one-select" style="margin: 0;"></td>'+
                '<td>'+num+++'</td>'+
                '<td>'+getDateToString(billIngInfo[i].expDate)+'</td>'+
                '<td>'+billIngInfo[i].billCategoryName+'</td>'+
                '<td>'+billIngInfo[i].billCateMinName+'</td>'+
                '<td>'+billIngInfo[i].billType+'</td>'+
                '<td>'+billIngInfo[i].money+'</td>'+
                '<td>'+billIngInfo[i].billDesCribe+'</td>'+
                '<td>'+getDate(billIngInfo[i].createDate)+'</td>'+
                '<td>' +
                    '<button type="button" class="btn btn-info billIngUpdateBtn" id="'+billIngInfo[i].billIngId+'" style="background: #1E9FFF;border: #1E9FFF;height: 20px;width: 60px;padding: 0;font-size:12px "> '+
                        '<span class="glyphicon glyphicon glyphicon-leaf"></span>'+
                        ' 编辑' +
                    '</button>&nbsp&nbsp'+
                    '<button type="button" class="btn btn-warning billIngDelBtn" id="'+billIngInfo[i].billIngId+'" style="background: #FF5722;border: #FF5722;height: 20px;width: 60px;padding: 0;font-size:12px">' +
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
function billIngPaging(data){
    var pageInfo=data.pageInfo;
    $(".bill-ing-page").empty();
    $(".bill-ing-page").append('<li><a data-num="1" class="firstPage" href="javascript:void();">&laquo;&laquo;</a></li>');
    $(".bill-ing-page").append('<li><a data-num="'+pageInfo.prePage+'" class="prevPage" href="javascript:void();">&laquo;</a></li>');
    for(i=0;i<pageInfo.navigatepageNums.length;i++){
        if(pageInfo.pageNum==pageInfo.navigatepageNums[i]){
            $(".bill-ing-page").append('<li class="active"><a href="javascript:void();" class="navPageNums">'+pageInfo.navigatepageNums[i]+'</a></li>');
        }else{
            $(".bill-ing-page").append('<li><a href="javascript:void();" class="navPageNums">'+pageInfo.navigatepageNums[i]+'</a></li>');
        }
    }
    $(".bill-ing-page").append('<li><span><input class="currentPage" type="text" value="'+pageInfo.pageNum+'" style="width: 50px;height: 20px;">/<span class="pages">'+pageInfo.pages+'页</span></span></li>');
    $(".bill-ing-page").append('<li><a class="total" href="javascript:void();">共'+pageInfo.total+"条账单"+'</a></li>');
    var expMoney=data.expMoney;
    var incMoney=data.incMoney;
    if(expMoney==null){expMoney=0;}
    if(incMoney==null){incMoney=0;}
    $(".bill-ing-page").append('<li><a href="javascript:void();">共支出'+expMoney+'元</a></li>');
    $(".bill-ing-page").append('<li><a href="javascript:void();">共收入'+incMoney+'元</a></li>');
    $(".bill-ing-page").append('<li><a data-num="'+pageInfo.nextPage+'" class="nextPage" href="javascript:void();">&raquo;</a></li>');
    $(".bill-ing-page").append('<li><a data-num="'+pageInfo.pages+'" class="lastPage" href="javascript:void();">&raquo;&raquo;</a></li>');
    layer.closeAll();
}

/**
 * 分页查询按钮
 */
function billIngPageClick() {
    var pagesBtn=$(".bill-ing-page");
    pagesBtn.on("click",".firstPage",function () {
        var pageNum=$(this).data("num");
        queryBillIngList(pageNum);
    });
    pagesBtn.on("click",".prevPage",function () {
        var pageNum=$(this).data("num");
        queryBillIngList(pageNum);
    });
    pagesBtn.on("click",".navPageNums",function () {
        var pageNum=$(this).html();
        queryBillIngList(pageNum);
    });
    pagesBtn.on("click",".nextPage",function () {
        var pageNum=$(this).data("num");
        queryBillIngList(pageNum);
    });
    pagesBtn.on("click",".lastPage",function () {
        var pageNum=$(this).data("num");
        queryBillIngList(pageNum);
    });
    pagesBtn.on("blur",".currentPage",function () {
        var pageNum=$(this).val();
        if((/^(\+|-)?\d+$/.test( pageNum ))|| pageNum<0){
            queryBillIngList(pageNum);
            return true;
        }else{
            queryBillIngList(1);
            return false;
        }
    });
}
