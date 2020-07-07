package com.bill.service;

import com.bill.po.BillCateMin;

import java.util.List;

public interface BillCateMinService {

    /**
     * 查询用户小类
     * @param billCateMin
     * @return
     */
    List<BillCateMin> queryBillCateMinList(BillCateMin billCateMin);

    /**
     * 检查是否存在小类
     * @param billCateMin
     * @return
     */
    BillCateMin checkBillCateMin(BillCateMin billCateMin);

    /**
     * 添加小类信息
     * @param billCateMin
     */
    void addBillCateMinInfo(BillCateMin billCateMin);

    /**
     * 查询要修改的信息
     * @param billCateMin
     * @return
     */
    BillCateMin queryUpdateBillCateMin(BillCateMin billCateMin);

    /**
     * 修改小类信息
     * @param billCateMin
     */
    void updateBillCateMinInfo(BillCateMin billCateMin);

    /**
     * 删除单个小类信息
     * @param billCateMin
     */
    void delOneBillCateMinInfo(BillCateMin billCateMin);

    /**
     * 删除选中的小类信息
     * @param userId
     * @param billCateMinIds
     */
    void delSelectBillCateMin(Integer userId, Integer[] billCateMinIds);

    /**
     * 根据用户id和大类id查询小类
     * @param userId
     * @return
     */
    List<BillCateMin> queryBillCateMinInfo(Integer userId,Integer billCategoryId);
}
