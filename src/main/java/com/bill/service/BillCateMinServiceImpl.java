package com.bill.service;

import com.bill.dao.BillCateMinDao;
import com.bill.po.BillCateMin;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillCateMinServiceImpl implements BillCateMinService {

    @Autowired
    private BillCateMinDao billCateMinDao;

    @Override
    public List<BillCateMin> queryBillCateMinList(BillCateMin billCateMin) {
        return billCateMinDao.queryBillCateMinList(billCateMin);
    }

    @Override
    public BillCateMin checkBillCateMin(BillCateMin billCateMin) {
        return billCateMinDao.checkBillCateMin(billCateMin);
    }

    @Override
    public void addBillCateMinInfo(BillCateMin billCateMin) {
        billCateMinDao.addBillCateMinInfo(billCateMin);
    }

    @Override
    public BillCateMin queryUpdateBillCateMin(BillCateMin billCateMin) {
        return billCateMinDao.queryUpdateBillCateMin(billCateMin);
    }

    @Override
    public void updateBillCateMinInfo(BillCateMin billCateMin) {
        billCateMinDao.updateBillCateMinInfo(billCateMin);
    }

    @Override
    public void delOneBillCateMinInfo(BillCateMin billCateMin) {
        billCateMinDao.delOnBillCateMinInfo(billCateMin);
    }

    @Override
    public void delSelectBillCateMin(Integer userId, Integer[] billCateMinIds) {
        billCateMinDao.delSelectBillCateMin(userId,billCateMinIds);
    }

    @Override
    public List<BillCateMin> queryBillCateMinInfo(Integer userId,Integer billCategoryId) {
        return billCateMinDao.queryBillCateMinInfo(userId,billCategoryId);
    }
}
