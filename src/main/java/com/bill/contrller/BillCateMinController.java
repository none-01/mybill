package com.bill.contrller;

import com.bill.po.AjaxResult;
import com.bill.po.BillCateMin;
import com.bill.po.User;
import com.bill.service.BillCateMinService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RestController
public class BillCateMinController {

    @Autowired
    private BillCateMinService billCateMinService;

    @GetMapping("/queryBillCateMinList")
    public Object queryBillCateMinList(HttpSession session, @RequestParam(defaultValue = "1")
            int pageNum,BillCateMin billCateMin,@RequestParam(defaultValue = "9") int pageSize){
        User user= (User) session.getAttribute("userInfo");
        billCateMin.setUserId(user.getUserId());
        PageHelper.startPage(pageNum,pageSize);
        List<BillCateMin> billCateMins=billCateMinService.queryBillCateMinList(billCateMin);
        PageInfo<BillCateMin> pageInfo=new PageInfo<>(billCateMins,5);
        return pageInfo;
    }

    @PostMapping("/checkBillCateMin")
    public Object checkBillCateMin(HttpSession session,BillCateMin billCateMin){
        AjaxResult ajaxResult=new AjaxResult();
        User user= (User) session.getAttribute("userInfo");
        billCateMin.setUserId(user.getUserId());
        BillCateMin billCateMinCheck=billCateMinService.checkBillCateMin(billCateMin);
        if (billCateMinCheck==null){
            ajaxResult.setFlag(true);
            return ajaxResult;
        }else{
            ajaxResult.setFlag(false);
            ajaxResult.setMsg("此账单小类已存在！");
            return ajaxResult;
        }
    }

    @PostMapping("/addBillCateMinInfo")
    public Object addBillCateMinInfo(HttpSession session,BillCateMin billCateMin){
        AjaxResult ajaxResult=new AjaxResult();
        try{
            User user=(User) session.getAttribute("userInfo");
            billCateMin.setUserId(user.getUserId());
            billCateMin.setCreateDate(new Date());
            billCateMinService.addBillCateMinInfo(billCateMin);
            ajaxResult.setFlag(true);
            return  ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            e.printStackTrace();
            return  ajaxResult;
        }
    }

    @GetMapping("/queryUpdateBillCateMin")
    public Object queryUpdateBillCateMin(HttpSession session,BillCateMin billCateMin){
        User user = (User) session.getAttribute("userInfo");
        billCateMin.setUserId(user.getUserId());
        BillCateMin billCateUp=billCateMinService.queryUpdateBillCateMin(billCateMin);
        return billCateUp;
    }

    @PostMapping("/updateBillCateMinInfo")
    public  Object updateBillCateMinInfo(HttpSession session,BillCateMin billCateMin){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User user = (User) session.getAttribute("userInfo");
            billCateMin.setUserId(user.getUserId());
            billCateMin.setUpdateDate(new Date());
            billCateMinService.updateBillCateMinInfo(billCateMin);
            ajaxResult.setFlag(true);
            return  ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            e.printStackTrace();
            ajaxResult.setMsg("修改失败！");
            return ajaxResult;
        }
    }

    @PostMapping("/delOneBillCateMinInfo")
    public Object delOneBillCateMinInfo(HttpSession session,BillCateMin billCateMin){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User user = (User) session.getAttribute("userInfo");
            billCateMin.setUserId(user.getUserId());
            billCateMinService.delOneBillCateMinInfo(billCateMin);
            ajaxResult.setFlag(true);
            return ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            ajaxResult.setMsg("小类下还有账单删除失败！");
            e.printStackTrace();
            return ajaxResult;
        }
    }

    @PostMapping("/delSelectBillCateMin")
    public  Object delSelectBillCateMin(HttpSession session,@RequestParam(value="billCateMinIds[]")
                                        Integer[] billCateMinIds){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User user= (User) session.getAttribute("userInfo");
            Integer userId=user.getUserId();
            billCateMinService.delSelectBillCateMin(userId,billCateMinIds);
            ajaxResult.setFlag(true);
            return ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            ajaxResult.setMsg("大类下还有小类删除失败！");
            e.printStackTrace();
            return ajaxResult;
        }
    }

    @GetMapping("/queryBillCateMinInfo")
    public Object queryBillCateMinInfo(HttpSession session,Integer billCategoryId){
        User user= (User) session.getAttribute("userInfo");
        Integer userId=user.getUserId();
        List<BillCateMin> billCateMins=billCateMinService.queryBillCateMinInfo(userId,billCategoryId);
        return billCateMins;
    }

}
