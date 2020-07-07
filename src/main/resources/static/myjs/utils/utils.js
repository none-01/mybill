$(function () {
    loadingDate();
});
/**
 * 时间各式各化
 * @param time
 * @returns {string}
 */
function getDate(time){
    var datetime = new Date(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}

/**
 * 日期
 * @param time
 * @returns {string}
 */
function getDateToString(datef){
    var dateStr = new Date(datef);
    var year = dateStr.getFullYear();
    var month = dateStr.getMonth() + 1 < 10 ? "0" + (dateStr.getMonth() + 1) : dateStr.getMonth() + 1;
    var date = dateStr.getDate() < 10 ? "0" + dateStr.getDate() : dateStr.getDate()
    return year + "-" + month + "-" + date;
}

/**
 * 查询账单大类信息
 * @param domObj
 */
function queryBillCateMaxInfo(domObj){
    $.ajax({
        url:'queryBillCateMaxInfo',
        type:'get',
        dataType:'json',
        success:function (data) {
            domObj.empty();
            domObj.append("<option value=''>记账大类</option>");
            for (i=0;i<data.length;i++){
                domObj.append("<option value='"+data[i].billCategoryId+"'>"+data[i].billCategoryName+"</option>");
            }
        }
    });
}

/**
 * 查询账单大类信息并选中
 * @param domObj
 */
function queryBillCateMaxInfoSelect(domObj,id){
    $.ajax({
        url:'queryBillCateMaxInfo',
        type:'get',
        dataType:'json',
        success:function (data) {
            $(domObj).empty();
            $(domObj).append("<option value=''>记账大类</option>");
            for (i=0;i<data.length;i++){
                $(domObj).append("<option value='"+data[i].billCategoryId+"'>"+data[i].billCategoryName+"</option>");
            }
            $(domObj).val(id);//通过value值，设置对应的选中项
        }
    });
}

/**
 * 查询账单小类类信息
 * @param domObj
 */
function queryBillCateMinInfo(domObj,billCategoryId){
    $.ajax({
        url:'queryBillCateMinInfo',
        data:{billCategoryId:billCategoryId},
        type:'get',
        dataType:'json',
        success:function (data) {
            domObj.empty();
            domObj.append("<option value=''>记账小类</option>");
            for (i=0;i<data.length;i++){
                domObj.append("<option value='"+data[i].billCateMinId+"'>"+data[i].billCateMinName+"</option>");
            }
        }
    });
}
/**
 * 查询账单小类信息并选中
 * @param domObj
 */
function queryBillCateMinInfoSelect(domObj,id,billCategoryId){
    $.ajax({
        url:'queryBillCateMinInfo',
        data:{billCategoryId:billCategoryId},
        type:'get',
        dataType:'json',
        success:function (data) {
            $(domObj).empty();
            $(domObj).append("<option value=''>记账小类</option>");
            for (i=0;i<data.length;i++){
                $(domObj).append("<option value='"+data[i].billCateMinId+"'>"+data[i].billCateMinName+"</option>");
            }
            $(domObj).val(id);//通过value值，设置对应的选中项
        }
    });
}

/**
 * 加载日期插件
 */
function loadingDate() {
    //执行一个laydate实例
    laydate.render({
        elem: '#startDate' //指定元素
        ,value: new Date()
        ,calendar: true
        ,done:function (value) {
            $('#endDate').val(value);
        }
    });

    //执行一个laydate实例
    laydate.render({
        elem: '#endDate' //指定元素
        ,value: new Date()
        ,calendar: true
    });
}