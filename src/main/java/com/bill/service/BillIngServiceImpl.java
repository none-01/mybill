package com.bill.service;

import com.bill.dao.BillIngDao;
import com.bill.po.BillIng;
import com.bill.po.ExpIncMoneyInfo;
import com.bill.po.QueryBillIng;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BillIngServiceImpl implements BillIngService {

    @Autowired
    BillIngDao billIngDao;

    @Override
    public List<BillIng> queryBillIngList(QueryBillIng queryBillIng) {
        return billIngDao.queryBillIngList(queryBillIng);
    }

    @Override
    public Map<String, Object> getSumMoney(QueryBillIng queryBillIng) {
        String billType=queryBillIng.getBillType();
        Map<String,Object> map=new HashMap<>();
        if(billType.isEmpty()){
            //支出
            queryBillIng.setBillType("支出");
            Float expMoney=billIngDao.getExpMoney(queryBillIng);
            //收入
            queryBillIng.setBillType("收入");
            Float incMoney=billIngDao.getIncMoney(queryBillIng);
            map.put("expMoney",expMoney);
            map.put("incMoney",incMoney);
        }else if ("支出".equals(billType)){
            //支出
            Float expMoney=billIngDao.getExpMoney(queryBillIng);
            map.put("expMoney",expMoney);
            map.put("incMoney",0);
        }else if ("收入".equals(billType)){
            //收入
            Float incMoney=billIngDao.getIncMoney(queryBillIng);
            map.put("expMoney",0);
            map.put("incMoney",incMoney);
        }
        return map;
    }

    @Override
    public ExpIncMoneyInfo queryExpMoneyInfo(Integer userId) {
        return billIngDao.queryExpMoneyInfo(userId);
    }

    @Override
    public ExpIncMoneyInfo queryIncMoneyInfo(Integer userId) {
        return billIngDao.queryIncMoneyInfo(userId);
    }

    @Override
    public void addBillCateIngInfo(BillIng billIng) {
        //给日期加上8小时
        Calendar cal = Calendar.getInstance();
        cal.setTime(billIng.getExpDate());
        cal.add(Calendar.HOUR_OF_DAY, 8);
        Date date = cal.getTime();
        billIng.setExpDate(date);
        billIngDao.addBillCateIngInfo(billIng);
    }

    @Override
    public BillIng queryUpdateBillIngInfo(BillIng billIng) {
        return billIngDao.queryUpdateBillIngInfo(billIng);
    }

    @Override
    public void updateBillIngInfo(BillIng billIng) {
        //给日期加上8小时
        Calendar cal = Calendar.getInstance();
        cal.setTime(billIng.getExpDate());
        cal.add(Calendar.HOUR_OF_DAY, 8);
        Date date = cal.getTime();
        billIng.setExpDate(date);
        billIngDao.updateBillIngInfo(billIng);
    }

    @Override
    public void delOneBillIngInfo(BillIng billIng) {
        billIngDao.delOneBillIngInfo(billIng);
    }

    @Override
    public void delSelectBillIng(Integer userId, Integer[] billIngIds) {
        billIngDao.delSelectBillIng(userId,billIngIds);
    }
}
