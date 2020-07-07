package com.bill.service;

import com.bill.po.BillCate;

import java.util.List;

public interface BillCateService {

    /**
     * 查询大类
     * @return
     * @param billCate
     */
    List<BillCate> queryBillCateInfo(BillCate billCate);

    /**
     * 检查大类是否存在
     * @param billCate
     * @return
     */
    BillCate checkBillCate(BillCate billCate);

    /**
     * 添加账单大类信息
     * @param billCate
     */
    void addBillCateInfo(BillCate billCate);

    /**
     * 查询要修改的信息
     * @param billCate
     * @return
     */
    BillCate queryUpdateBillCate(BillCate billCate);

    /**
     * 修改大类信息
     * @param billCate
     */
    void updateBillCateInfo(BillCate billCate);

    /**
     * 删除大类信息
     * @param billCate
     */
    void delOneBillCateInfo(BillCate billCate);

    /**
     * 删除选中的大类信息
     * @param userId
     * @param billCategoryIds
     */
    void delSelectBillCate(Integer userId, Integer[] billCategoryIds);

    /**
     * 根据用户id查询用户的大类
     * @param userId
     * @return
     */
    List<BillCate> queryBillCateMaxInfo(Integer userId);
}
