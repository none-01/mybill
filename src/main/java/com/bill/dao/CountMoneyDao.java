package com.bill.dao;

import com.bill.po.BillIng;
import com.bill.po.CountExpIncMoney;
import com.bill.po.CountMoney;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CountMoneyDao {
    /**
     * 查询排行榜
     * @param userId
     * @param countDateType
     * @param billType
     * @return
     */
    List<BillIng> queryCountBillMoneyOderby(@Param("userId") Integer userId,@Param("yearMonthType") String yearMonthType, @Param("countDateType") String countDateType, @Param("billType") String billType);

    /**
     * 查询支出收入明细
     * @param userId
     * @param yearMonthType
     * @param countDateType
     * @param billType
     * @return
     */
    List<CountMoney> queryCountBillMoneyDetaileds(@Param("userId") Integer userId,@Param("yearMonthType") String yearMonthType, @Param("countDateType") String countDateType, @Param("billType") String billType);

    /**
     * 查询大类金额明细
     * @param userId
     * @param yearMonthType
     * @param countDateType
     * @param billType
     * @return
     */
    List<CountMoney> queryCountBillMoneyPercentage(@Param("userId") Integer userId,@Param("yearMonthType") String yearMonthType, @Param("countDateType") String countDateType, @Param("billType") String billType);

    /**
     * 查询收入支出
     * @return
     */
    CountExpIncMoney queryExpIncCountMoney(@Param("userId") Integer userId, @Param("yearMonthType") String yearMonthType, @Param("countDateType") String countDateType, @Param("billType") String billType);
}
