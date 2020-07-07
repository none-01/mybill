$(function () {
    /**
     * 切换到统计页面加载日历
     */
    $(".billMoney-count-Btn").click(function () {
        billCountDate('month');
        $(".year-month-select").val('month');
        $(".billType").val("支出");
        setTimeout(function () {
            queryCountBillMoneyInfo();
            if($(".year-month-select").val()=='month'){
                $(".count-h4-expinc").eq(0).html("月"+$(".billType").val()+"排行榜");
                $(".count-h4-expinc").eq(1).html("每天"+$(".billType").val());
                $(".count-h4-expinc").eq(2).html("月"+$(".billType").val()+"分类");
            }else{
                $(".count-h4-expinc").eq(0).html("年"+$(".billType").val()+"排行榜");
                $(".count-h4-expinc").eq(1).html("每月"+$(".billType").val());
                $(".count-h4-expinc").eq(2).html("年"+$(".billType").val()+"分类");
            }
        },350)
    });
    /**
     * 切换统计模式
     */
    $(".year-month-select").change(function () {
        if($(this).val()=='month'){
            billCountDate('month');
        }else{
            billCountDate('year');
        }

    });
    /**
     * 查询统计信息
     */
    $(".countBillMoneyBtn").click(function () {
        queryCountBillMoneyInfo();
        if($(".year-month-select").val()=='month'){
            $(".count-h4-expinc").eq(0).html("月"+$(".billType").val()+"排行榜");
            $(".count-h4-expinc").eq(1).html("每天"+$(".billType").val());
            $(".count-h4-expinc").eq(2).html("月"+$(".billType").val()+"分类");
        }else{
            $(".count-h4-expinc").eq(0).html("年"+$(".billType").val()+"排行榜");
            $(".count-h4-expinc").eq(1).html("每月"+$(".billType").val());
            $(".count-h4-expinc").eq(2).html("年"+$(".billType").val()+"分类");
        }
    });
});

/**
 * 查询统计信息
 */
function queryCountBillMoneyInfo() {
    layer.load(2,{
        offset:'60%'
    });
    $.ajax({
        url:'queryCountBillMoneyInfo',
        data:$(".countBillMoneyForm").serialize(),
        type:'get',
        dataType:'json',
        success:function (data) {
            //显示支出收入金额
            loadingExpIncMoney(data.expIncMoney);
            //显示支出收入排行榜
            loadOderByExpIncMoney(data.billIngs);
            //显示曲线图
            if($(".year-month-select").val()=='month'){
                loadDayQxt(data.moneyDetaileds);
            }else{
                loadYearQxt(data.moneyDetaileds);
            }
            loadTuBing(data.moneyPercentage);
            layer.closeAll();
        }
    });
}

/**
 * 显示支出收入金额
 * @param expIncMoney
 */
function loadingExpIncMoney(expIncMoney){
    if(expIncMoney!=null){
        if(expIncMoney.expMoney==null){
            $(".count-expmoney").html("￥ 0 ");
        }else {
            $(".count-expmoney").html("￥ "+expIncMoney.expMoney+" ");
        }
        if(expIncMoney.incMoney==null){
            $(".count-incmoney").html("￥ 0 ");
        }else {
            $(".count-incmoney").html("￥ "+expIncMoney.incMoney);
        }
    }else {
        $(".count-expmoney").html("￥ 0 ");
        $(".count-incmoney").html("￥ 0 ");
    }
}

/**
 * 显示支出收入排行榜
 * @param billIngs
 */
function loadOderByExpIncMoney(billIngs) {
    $(".count-orderby-eimoney").empty();
    for (i=0;i<billIngs.length;i++){
        $(".count-orderby-eimoney").append(
            '<tr>'+
                '<td>'+(i+1)+'</td>'+
                '<td>'+getDateToString(billIngs[i].expDate)+'</td>'+
                '<td>'+billIngs[i].billDesCribe+'</td>'+
                '<td>'+billIngs[i].money+'</td>'+
            '</tr>'
        );
    }
}

/**
 * 显示每天支出收入曲线图
 */
function loadDayQxt(moneyDetaileds) {
    //获取文本当前日期
    var date=new Date($('#billCountDate').val());
    //计算当月有多少天
    var dayCount = (32 - new Date(date.getYear(), date.getMonth(), 32).getDate()) ;
    //打印x轴线
    var dateX=[];
    for(i=0;i<dayCount;i++){
        var dateXstr=(date.getMonth()+1)+"-"+(i+1);
        dateX.push(dateXstr);
    }
    var checkDate=new Date().getDate();
    //创建一个和月份一样大的数组
    var moneys;
    if(date.getMonth()==new Date().getMonth()){
        moneys=new Array(checkDate);
    }else{
        moneys=new Array(dayCount);
    }
    for (i=0;i<moneys.length;i++){
            moneys[i]=0;
    }
    //取值
    for(i=0;i<moneyDetaileds.length;i++){
        var date=new Date(getDateToString(moneyDetaileds[i].date)).getDate();
        moneys[(date-1)]=moneyDetaileds[i].countMoney;
    }
    var title = {
        text: ''
    };
    var subtitle = {
        text: ''
    };
    var xAxis = {
        categories:dateX,
        max:dayCount-1
    };
    var yAxis = {

        title: {
            text: ''
        },
        labels: {
            enabled: false
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };

    var tooltip = {
        valueSuffix: ''
    }

    var legend = {
        enabled: false
    };
    var credits={
        enabled : false
    };
    var series = [{
        name: $(".billType").val(),
        data: moneys
    },
    ];

    var json = {};

    json.title = title;
    json.subtitle = subtitle;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.legend = legend;
    json.series = series;
    json.credits=credits;

    $('#quxian').highcharts(json);
}
/**
 * 显示每月支出收入曲线图
 */
function loadYearQxt(moneyDetaileds) {
    //打印x轴线
    var dateX=[];
    for(i=0;i<12;i++){
        var dateXstr=$('#billCountDate').val()+"年"+(i+1)+"月";
        dateX.push(dateXstr);
    }
    //创建一个和年一样大的数组
    var moneys;
    if($('#billCountDate').val()==new Date().getFullYear()){
        moneys=new Array((new Date().getMonth()+1));
    }else{
        moneys=new Array(12);
    }
    for (i=0;i<moneys.length;i++){
        moneys[i]=0;
    }
    //取值
    for(i=0;i<moneyDetaileds.length;i++){
        var date=new Date(getDateToString(moneyDetaileds[i].date)).getMonth()+1;
        moneys[(date-1)]=moneyDetaileds[i].countMoney;
    }
    var title = {
        text: ''
    };
    var subtitle = {
        text: ''
    };
    var xAxis = {
        categories:dateX,
        max:11
    };
    var yAxis = {

        title: {
            text: ''
        },
        labels: {
            enabled: false
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    };

    var tooltip = {
        valueSuffix: ''
    }

    var legend = {
        enabled: false
    };
    var credits={
        enabled : false
    };
    var series = [{
        name: $(".billType").val(),
        data: moneys
    },
    ];

    var json = {};

    json.title = title;
    json.subtitle = subtitle;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.legend = legend;
    json.series = series;
    json.credits=credits;

    $('#quxian').highcharts(json);
}
/**
 * 显示日历
 */
function billCountDate(type) {
    $(".billCountDateDiv").empty();
    $(".billCountDateDiv").append('<input type="text" name="countDateType" class="form-control" id="billCountDate">');
    //执行一个laydate实例
    laydate.render({
        elem: '#billCountDate' //指定元素
        ,value: new Date()
        ,type:type
    });
}
