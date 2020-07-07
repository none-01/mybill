package com.bill.contrller;

import com.bill.po.ExpIncMoneyInfo;
import com.bill.po.User;
import com.bill.service.BillIngService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class IndexContrller {

    @Autowired
    private BillIngService billIngService;
    /**
     * 主页
     * @return
     */
    @RequestMapping({"/","index"})
    public String mybill(HttpSession session, Model model){
        User user= (User) session.getAttribute("userInfo");
        Integer userId=user.getUserId();
        ExpIncMoneyInfo expMoneyInfo=billIngService.queryExpMoneyInfo(userId);
        ExpIncMoneyInfo incMoneyInfo=billIngService.queryIncMoneyInfo(userId);
        Map<String,Object> expIncMoneyInfos=new HashMap<>();
        expIncMoneyInfos.put("expMoneyInfo",expMoneyInfo);
        expIncMoneyInfos.put("incMoneyInfo",incMoneyInfo);
        model.addAttribute("expIncMoneyInfos",expIncMoneyInfos);
        return "mybill";
    }

    /**
     * 登录页面
     * @return
     */
    @RequestMapping("/login")
    public String login(HttpSession session){
        User user= (User) session.getAttribute("userInfo");
        if(user!=null){
            return "redirect:index";
        }else{
            return "login";
        }
    }

    @RequestMapping("/register")
    public String register(){
        return "register";
    }
}
