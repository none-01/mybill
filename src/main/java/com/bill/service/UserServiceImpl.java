package com.bill.service;

import com.bill.dao.UserDao;
import com.bill.po.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public User userLogin(User user) {
        return userDao.userLogin(user);
    }

    @Override
    public int checkUserInfoIsNull(String userName) {
        return userDao.checkUserInfoIsNull(userName);
    }

    @Override
    public void registerUser(User user) {
        userDao.registerUser(user);
    }

    @Override
    public void updateUserInfo(User user) {
        userDao.updateUserInfo(user);
    }

    @Override
    public User queryPersonalData(Integer userId) {
        return userDao.queryPersonalData(userId);
    }

    @Override
    public Integer updateUserPassWord(Integer userId, String usedPassWord, String newPassWord) {
        return userDao.updateUserPassWord(userId,usedPassWord,newPassWord);
    }
}
