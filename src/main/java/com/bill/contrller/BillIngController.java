package com.bill.contrller;

import com.bill.po.*;
import com.bill.service.BillIngService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class BillIngController {

    @Autowired
    BillIngService billIngService;

    @GetMapping("/queryBillIngList")
    public Object queryBillIngList (HttpSession session, @RequestParam(defaultValue = "1")
            int pageNum, QueryBillIng queryBillIng, @RequestParam(defaultValue = "9") int pageSize){
        User user= (User) session.getAttribute("userInfo");
        queryBillIng.setUserId(user.getUserId());
        PageHelper.startPage(pageNum,pageSize);
        List<BillIng> billIngs=billIngService.queryBillIngList(queryBillIng);
        PageInfo<BillIng> pageInfo=new PageInfo<>(billIngs,5);
        //查询收入和支出的总和
        Map<String,Object> map=billIngService.getSumMoney(queryBillIng);
        map.put("pageInfo",pageInfo);
        return map;
    }

    @PostMapping("/addBillCateIngInfo")
    public Object addBillCateIngInfo(HttpSession session,BillIng billIng){
        AjaxResult ajaxResult=new AjaxResult();
        try{
            User user=(User) session.getAttribute("userInfo");
            billIng.setUserId(user.getUserId());
            billIng.setCreateDate(new Date());
            billIngService.addBillCateIngInfo(billIng);
            ajaxResult.setFlag(true);
            return  ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            e.printStackTrace();
            return  ajaxResult;
        }
    }

    @GetMapping("/queryUpdateBillIngInfo")
    public  Object queryUpdateBillIngInfo(HttpSession session,BillIng billIng){
            User user = (User) session.getAttribute("userInfo");
            billIng.setUserId(user.getUserId());
            BillIng billIngUp=billIngService.queryUpdateBillIngInfo(billIng);
            return billIngUp;
    }

    @PostMapping("/updateBillIngInfo")
    public  Object updateBillIngInfo(HttpSession session,BillIng billIng){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User user = (User) session.getAttribute("userInfo");
            billIng.setUserId(user.getUserId());
            billIng.setUpdateDate(new Date());
            billIngService.updateBillIngInfo(billIng);
            ajaxResult.setFlag(true);
            return  ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            e.printStackTrace();
            ajaxResult.setMsg("修改失败！");
            return ajaxResult;
        }
    }

    @PostMapping("/delOneBillIngInfo")
    public Object delOneBillIngInfo(HttpSession session,BillIng billIng){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User user= (User) session.getAttribute("userInfo");
            billIng.setUserId(user.getUserId());
            billIngService.delOneBillIngInfo(billIng);
            ajaxResult.setFlag(true);
            return ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            ajaxResult.setMsg("删除失败-1！");
            e.printStackTrace();
            return ajaxResult;
        }
    }

    @PostMapping("/delSelectBillIng")
    public Object delSelectBillIng(@RequestParam(value="billIngIds[]") Integer[] billIngIds,
                                    HttpSession session){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User user= (User) session.getAttribute("userInfo");
            Integer userId=user.getUserId();
            billIngService.delSelectBillIng(userId,billIngIds);
            ajaxResult.setFlag(true);
            return ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(true);
            ajaxResult.setMsg("删除错误-1!");
            e.printStackTrace();
            return ajaxResult;
        }
    }

    @GetMapping("/getExpIncMoneyInfo")
    public Object getExpIncMoneyInfo(HttpSession session){
        User user= (User) session.getAttribute("userInfo");
        Integer userId=user.getUserId();
        //查询支出
        ExpIncMoneyInfo expMoneyInfo=billIngService.queryExpMoneyInfo(userId);
        //查询收入
        ExpIncMoneyInfo incMoneyInfo=billIngService.queryIncMoneyInfo(userId);
        Map<String,Object> map=new HashMap<>();
        map.put("expMoneyInfo",expMoneyInfo);
        map.put("incMoneyInfo",incMoneyInfo);
        return map;
    }
}
