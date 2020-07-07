package com.bill.contrller;

import com.bill.po.AjaxResult;
import com.bill.po.BillCate;
import com.bill.po.User;
import com.bill.service.BillCateService;
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
public class BillCateController {

    @Autowired
    private BillCateService billCateService;

    @GetMapping("/queryBillCateInfo")
    public Object queryBillCateInfo(HttpSession session,BillCate billCate, @RequestParam(defaultValue = "1")
                                    int pageNum, @RequestParam(defaultValue = "9") int pageSize){
        User user= (User) session.getAttribute("userInfo");
        billCate.setUserId(user.getUserId());
        PageHelper.startPage(pageNum,pageSize);
        List<BillCate> billCates=billCateService.queryBillCateInfo(billCate);
        PageInfo<BillCate> pageInfo=new PageInfo<BillCate>(billCates,5);
        return pageInfo;
    }

    @PostMapping("/checkBillCate")
    public Object checkBillCate(HttpSession session,BillCate billCate){
        AjaxResult ajaxResult=new AjaxResult();
        User user= (User) session.getAttribute("userInfo");
        billCate.setUserId(user.getUserId());
        BillCate billCateCheck=billCateService.checkBillCate(billCate);
        if (billCateCheck==null){
            ajaxResult.setFlag(true);
            return ajaxResult;
        }else{
            ajaxResult.setFlag(false);
            ajaxResult.setMsg("此账单大类已存在！");
            return ajaxResult;
        }
    }

    @PostMapping("/addBillCateInfo")
    public Object addBillCateInfo(HttpSession session,BillCate billCate){
        AjaxResult ajaxResult=new AjaxResult();
        try{
            User user=(User) session.getAttribute("userInfo");
            billCate.setUserId(user.getUserId());
            billCate.setCreateDate(new Date());
            billCateService.addBillCateInfo(billCate);
            ajaxResult.setFlag(true);
            return  ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            e.printStackTrace();
            return  ajaxResult;
        }
    }

    @GetMapping("/queryUpdateBillCate")
    public Object queryUpdateBillCate(HttpSession session,BillCate billCate){
        User user = (User) session.getAttribute("userInfo");
        billCate.setUserId(user.getUserId());
        BillCate billCateUp=billCateService.queryUpdateBillCate(billCate);
        return billCateUp;
    }

    @PostMapping("/updateBillCateInfo")
    public  Object updateBillCateInfo(HttpSession session,BillCate billCate){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User user = (User) session.getAttribute("userInfo");
            billCate.setUserId(user.getUserId());
            billCate.setUpdateDate(new Date());
            billCateService.updateBillCateInfo(billCate);
            ajaxResult.setFlag(true);
            return  ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            e.printStackTrace();
            ajaxResult.setMsg("修改失败！");
            return ajaxResult;
        }
    }

    @PostMapping("/delOneBillCateInfo")
    public Object delOneBillCateInfo(HttpSession session,BillCate billCate){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User user = (User) session.getAttribute("userInfo");
            billCate.setUserId(user.getUserId());
            billCateService.delOneBillCateInfo(billCate);
            ajaxResult.setFlag(true);
            return ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            ajaxResult.setMsg("大类下还有小类删除失败！");
            e.printStackTrace();
            return ajaxResult;
        }
    }

    @PostMapping("/delSelectBillCate")
    public Object delSelectBillCate(@RequestParam(value = "billCategoryIds[]")
                                    Integer[] billCategoryIds,HttpSession session){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User user= (User) session.getAttribute("userInfo");
            Integer userId=user.getUserId();
            billCateService.delSelectBillCate(userId,billCategoryIds);
            ajaxResult.setFlag(true);
            return ajaxResult;
        }catch (Exception e){
            ajaxResult.setFlag(false);
            ajaxResult.setMsg("大类下还有小类删除失败！");
            e.printStackTrace();
            return ajaxResult;
        }
    }

    @GetMapping("/queryBillCateMaxInfo")
    public Object queryBillCateMaxInfo(HttpSession session){
        User user= (User) session.getAttribute("userInfo");
        Integer userId=user.getUserId();
        List<BillCate> billCates=billCateService.queryBillCateMaxInfo(userId);
        return billCates;
    }


}


