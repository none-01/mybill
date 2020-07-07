function getExpIncMoneyInfo() {
    $.ajax({
        url:'getExpIncMoneyInfo',
        type:'get',
        dataType:'json',
        success:function(data){
            loadingExpIncMoneyInfo(data);
        }
    })
}
function loadingExpIncMoneyInfo(data) {
    var expMoneyInfoDom=$(".expMoneyInfos");
    var incMoneyInfoDom=$(".incMoneyInfos");
    var expMoneyInfo=data.expMoneyInfo;
    var incMoneyInfo=data.incMoneyInfo;
    if(expMoneyInfo!=null){
        if (expMoneyInfo.sameDayMoney!=null){
            expMoneyInfoDom.eq(0).html(expMoneyInfo.sameDayMoney);
        }else {
            expMoneyInfoDom.eq(0).html(0);
        }
        if (expMoneyInfo.thisWeekMoney!=null){
            expMoneyInfoDom.eq(1).html(expMoneyInfo.thisWeekMoney);
        }else {
            expMoneyInfoDom.eq(1).html(0);
        }
        if (expMoneyInfo.thisMonthMoney!=null){
            expMoneyInfoDom.eq(2).html(expMoneyInfo.thisMonthMoney);
        }else {
            expMoneyInfoDom.eq(2).html(0);
        }
        if (expMoneyInfo.thisYearMoney!=null){
            expMoneyInfoDom.eq(3).html(expMoneyInfo.thisYearMoney);
        }else {
            expMoneyInfoDom.eq(3).html(0);
        }
    }else {
        expMoneyInfoDom.eq(0).html(0);
        expMoneyInfoDom.eq(1).html(0);
        expMoneyInfoDom.eq(2).html(0);
        expMoneyInfoDom.eq(3).html(0);
    }

    if(incMoneyInfo!=null){
        if (incMoneyInfo.sameDayMoney!=null){
            incMoneyInfoDom.eq(0).html(incMoneyInfo.sameDayMoney);
        }else {
            incMoneyInfoDom.eq(0).html(0);
        }
        if (incMoneyInfo.thisWeekMoney!=null){
            incMoneyInfoDom.eq(1).html(incMoneyInfo.thisWeekMoney);
        }else {
            incMoneyInfoDom.eq(1).html(0);
        }
        if (incMoneyInfo.thisMonthMoney!=null){
            incMoneyInfoDom.eq(2).html(incMoneyInfo.thisMonthMoney);
        }else {
            incMoneyInfoDom.eq(2).html(0);
        }
        if (incMoneyInfo.thisYearMoney!=null){
            incMoneyInfoDom.eq(3).html(incMoneyInfo.thisYearMoney);
        }else {
            incMoneyInfoDom.eq(3).html(0);
        }
    }else {
        incMoneyInfoDom.eq(0).html(0);
        incMoneyInfoDom.eq(1).html(0);
        incMoneyInfoDom.eq(2).html(0);
        incMoneyInfoDom.eq(3).html(0);
    }
}