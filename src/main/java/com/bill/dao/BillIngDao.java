package com.bill.dao;

import com.bill.po.BillIng;
import com.bill.po.ExpIncMoneyInfo;
import com.bill.po.QueryBillIng;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillIngDao {

    /**
     * 查询用户账单
     * @param queryBillIng
     * @return
     */
    List<BillIng> queryBillIngList(QueryBillIng queryBillIng);

    /**
     * 支出
     * @param queryBillIng
     * @return
     */
    Float getExpMoney(QueryBillIng queryBillIng);

    /**
     * 收入
     * @param queryBillIng
     * @return
     */
    Float getIncMoney(QueryBillIng queryBillIng);

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
     * 查询要修改的账单信息
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
     * 删除单个账单信息
     * @param billIng
     */
    void delOneBillIngInfo(BillIng billIng);

    /**
     * 删除选中的账单
     * @param userId
     * @param billCateMinIds
     */
    void delSelectBillIng(@Param("userId") Integer userId, @Param("billIngIds") Integer[] billIngIds);
}
