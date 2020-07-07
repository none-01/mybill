package com.bill.service;

import com.bill.dao.CountMoneyDao;
import com.bill.po.BillIng;
import com.bill.po.CountExpIncMoney;
import com.bill.po.CountMoney;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CountMoneyServiceImpl implements CountMoneyService {

    @Autowired
    private CountMoneyDao countMoneyDao;

    @Override
    public Map<String, Object> queryCountBillMoneyInfo(Integer userId,String yearMonthType, String countDateType, String billType) {
        Map<String,Object> map=new HashMap<>();
        //查询支出收入排行榜
        List<BillIng> billIngs=countMoneyDao.queryCountBillMoneyOderby(userId,yearMonthType,countDateType,billType);
        //查询支出收入明细
        List<CountMoney> moneyDetaileds=countMoneyDao.queryCountBillMoneyDetaileds(userId,yearMonthType,countDateType,billType);
        //查询支出收入大类明细
        List<CountMoney> moneyPercentage=countMoneyDao.queryCountBillMoneyPercentage(userId,yearMonthType,countDateType,billType);
        //查询支出收入的金额
        CountExpIncMoney expIncMoney=countMoneyDao.queryExpIncCountMoney(userId,yearMonthType,countDateType,billType);
        map.put("billIngs",billIngs);
        map.put("moneyDetaileds",moneyDetaileds);
        map.put("moneyPercentage",moneyPercentage);
        map.put("expIncMoney",expIncMoney);
        return map;
    }
}
