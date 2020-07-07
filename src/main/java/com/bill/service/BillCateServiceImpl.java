package com.bill.service;

import com.bill.dao.BillCateDao;
import com.bill.po.BillCate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillCateServiceImpl implements BillCateService {

    @Autowired
    private BillCateDao billCateDao;

    @Override
    public List<BillCate> queryBillCateInfo(BillCate billCate) {
        return billCateDao.queryBillCateInfo(billCate);
    }

    @Override
    public BillCate checkBillCate(BillCate billCate) {
        return billCateDao.checkBillCate(billCate);
    }

    @Override
    public void addBillCateInfo(BillCate billCate) {
        billCateDao.addBillCateInfo(billCate);
    }

    @Override
    public BillCate queryUpdateBillCate(BillCate billCate) {
        return billCateDao.queryUpdateBillCate(billCate);
    }

    @Override
    public void updateBillCateInfo(BillCate billCate) {
        billCateDao.updateBillCateInfo(billCate);
    }

    @Override
    public void delOneBillCateInfo(BillCate billCate) {
        billCateDao.delOneBillCateInfo(billCate);
    }

    @Override
    public void delSelectBillCate(Integer userId, Integer[] billCategoryIds) {
        billCateDao.delSelectBillCate(userId,billCategoryIds);
    }

    @Override
    public List<BillCate> queryBillCateMaxInfo(Integer userId) {
        return billCateDao.queryBillCateMaxInfo(userId);
    }
}
