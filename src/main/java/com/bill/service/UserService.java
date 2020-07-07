package com.bill.service;

import com.bill.po.User;

public interface UserService {
    /**
     * 用户登录
     * @param user
     * @return
     */
   public User userLogin(User user);

    /**
     * 检查用户是否存在
     * @param userName
     * @return
     */
    int checkUserInfoIsNull(String userName);

    /**
     * 注册用户
     * @param user
     */
    void registerUser(User user);

    /**
     * 修改个人信息
     * @param user
     */
    void updateUserInfo(User user);

    /**
     * 查询个人资料
     * @param userId
     * @return
     */
    User queryPersonalData(Integer userId);

    /**
     * 修改密码
     * @param userId
     * @param usedPassWord
     * @param newPassWord
     * @return
     */
    Integer updateUserPassWord(Integer userId, String usedPassWord, String newPassWord);
}
