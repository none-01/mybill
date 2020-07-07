package com.bill.service;

import java.util.Map;

public interface CountMoneyService {
    /**
     * 查询统计信息
     * @param userId
     * @param yearMonthType
     * @param countDateType
     * @param billType
     * @return
     */
    Map<String, Object> queryCountBillMoneyInfo(Integer userId, String yearMonthType, String countDateType, String billType);
}
