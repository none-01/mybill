package com.bill.service;

import com.bill.po.BillIng;
import com.bill.po.ExpIncMoneyInfo;
import com.bill.po.QueryBillIng;

import java.util.List;
import java.util.Map;

public interface BillIngService {

    /**
     * 查询账单信息
     * @param queryBillIng
     * @return
     */
    List<BillIng> queryBillIngList(QueryBillIng queryBillIng);

    /**
     * 查询收入支出的总和
     * @param queryBillIng
     * @return
     */
    Map<String, Object> getSumMoney(QueryBillIng queryBillIng);

    /**
     * 支出信息
     * @return
     * @param userId
     */
    ExpIncMoneyInfo queryExpMoneyInfo(Integer userId);

    /**
     * 收入信息
     * @return
     * @param userId
     */
    ExpIncMoneyInfo queryIncMoneyInfo(Integer userId);

    /**
     * 添加账单信息
     * @param billIng
     */
    void addBillCateIngInfo(BillIng billIng);

    /**
     * 查询要修改账单信息
     * @param billIng
     * @return
     */
    BillIng queryUpdateBillIngInfo(BillIng billIng);

    /**
     * 修改账单信息
     * @param billIng
     */
    void updateBillIngInfo(BillIng billIng);

    /**
     * 删除账单信息
     * @param billIng
     */
    void delOneBillIngInfo(BillIng billIng);

    /**
     * 删除选中的账单信息
     * @param userId
     * @param billCateMinIds
     */
    void delSelectBillIng(Integer userId, Integer[] billIngIds);
}
