package com.bill.contrller;

import com.bill.po.User;
import com.bill.service.CountMoneyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Map;

@RestController
public class CountMoneyController {

    @Autowired
    private CountMoneyService countMoneyService;

    @GetMapping("/queryCountBillMoneyInfo")
    public Object queryCountBillMoneyInfo(HttpSession session,String countDateType,String billType,String yearMonthType){
        User user= (User) session.getAttribute("userInfo");
        Integer userId=user.getUserId();
        Map<String,Object> map=countMoneyService.queryCountBillMoneyInfo(userId,yearMonthType,countDateType,billType);
        return map;
    }
}
