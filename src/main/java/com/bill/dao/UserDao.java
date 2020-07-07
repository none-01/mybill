package com.bill.dao;

import com.bill.po.User;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao {

    /**
     * 用户登录
     * @param user
     * @return
     */
    public User userLogin(User user);

    /**
     * 检查用户名是否存在
     * @param userName
     * @return
     */
    int checkUserInfoIsNull(@Param("userName") String userName);

    /**
     * 注册用户
     * @param user
     */
    void registerUser(User user);

    /**
     * 修改用户信息
     * @param user
     */
    void updateUserInfo(User user);

    /**
     * 查询个人资料
     * @param userId
     * @return
     */
    User queryPersonalData(@Param("userId") Integer userId);

    /**
     * 修改密码
     * @param userId
     * @param usedPassWord
     * @param newPassWord
     * @return
     */
    Integer updateUserPassWord(@Param("userId") Integer userId, @Param("usedPassWord") String usedPassWord,@Param("newPassWord") String newPassWord);
}
