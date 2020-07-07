package com.bill.contrller;

import com.bill.po.AjaxResult;
import com.bill.po.User;
import com.bill.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.UUID;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 用户登录
     * @param user
     * @param session
     * @return
     */
    @PostMapping("/userLogin")
    @ResponseBody
    public  Object userLogin(User user, HttpSession session){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User userInfo=userService.userLogin(user);
            if (userInfo!=null){
                ajaxResult.setFlag(true);
                session.setAttribute("userInfo",userInfo);
            }else{
                ajaxResult.setFlag(false);
                ajaxResult.setMsg("账号或密码错误!");
            }
        }catch (Exception e){
            ajaxResult.setFlag(false);
            ajaxResult.setMsg("登录错误-1!");
            e.printStackTrace();
        }
        return ajaxResult;
    }

    @PostMapping("/checkUserInfoIsNull")
    @ResponseBody
    public Object checkUserInfoIsNull(@RequestParam("userName") String userName){
        AjaxResult ajaxResult=new AjaxResult();
        int count=userService.checkUserInfoIsNull(userName);
        if(count>0){
            ajaxResult.setFlag(false);
            ajaxResult.setMsg(userName+"：此用户名已存在！");
        }else{
            ajaxResult.setFlag(true);
        }
        return ajaxResult;
    }

    @PostMapping("/registerUser")
    @ResponseBody
    public Object registerUser(User user){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            user.setHeadImg("img/m.jpg");
            user.setCreateDate(new Date());
            userService.registerUser(user);
            ajaxResult.setFlag(true);
        }catch (Exception e){
            ajaxResult.setFlag(false);
            e.printStackTrace();
        }
        return ajaxResult;
    }

    @GetMapping("/queryPersonalData")
    @ResponseBody
    public Object queryPersonalData(HttpSession session){
        User user= (User) session.getAttribute("userInfo");
        Integer userId=user.getUserId();
        User personalData=userService.queryPersonalData(userId);
        return personalData;
    }

    @PostMapping("/updateUserInfo")
    @ResponseBody
    public  Object updateUserInfo(HttpSession session, User user, @RequestParam("file") MultipartFile file){
        AjaxResult ajaxResult=new AjaxResult();
        try {
            User userInfo= (User) session.getAttribute("userInfo");
            user.setUserId(userInfo.getUserId());
            System.out.println(file.isEmpty());
            if (!file.isEmpty()){
                //创建fileDir对象,"C:/img/"这个内容可以是文件也可以是文件夹
                File fileDir = new File("C:/img/");
                //1.判断文件夹是否存在
                if(!fileDir.exists()){
                    //不存在的话,创建文件夹
                    fileDir.mkdirs();
                }
                String imgName= UUID.randomUUID() + ".jpg";
                try {
                    file.transferTo(new File("C:/img/" + imgName));
                    userInfo.setHeadImg("img/" + imgName);
                    user.setHeadImg("img/" + imgName);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            user.setUpdateDate(new Date());
            userService.updateUserInfo(user);
            user.setUserName(userInfo.getUserName());
            user.setHeadImg(userInfo.getHeadImg());
            session.setAttribute("userInfo",user);
            ajaxResult.setFlag(true);
        }catch (Exception e){
            ajaxResult.setFlag(false);
            ajaxResult.setMsg("修改失败！-1");
        }
        return ajaxResult;
    }

    @PostMapping("/updateUserPassWord")
    @ResponseBody
    public Object updateUserPassWord(HttpSession session,String usedPassWord,String newPassWord){
        AjaxResult ajaxResult=new AjaxResult();
        User user= (User) session.getAttribute("userInfo");
        Integer userId=user.getUserId();
        Integer res=userService.updateUserPassWord(userId,usedPassWord,newPassWord);
        if(res>0){
            session.invalidate();
            ajaxResult.setFlag(true);
        }else {
            ajaxResult.setFlag(false);
        }
        return ajaxResult;
    }

    @RequestMapping("/loginOut")
    public String loginOut(HttpSession session){
        session.invalidate();
        return "redirect:login";
    }
}
