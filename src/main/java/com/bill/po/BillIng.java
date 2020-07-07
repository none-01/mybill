package com.bill.po;

import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

public class BillIng {

    private Integer billIngId;
    private Integer userId;
    private Integer billCategoryId;
    private String billCategoryName;
    private Integer billCateMinId;
    private String billCateMinName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date expDate;
    private String billType;
    private Float money;
    private String billDesCribe;
    private Date createDate;
    private Date updateDate;

    public BillIng() {
    }

    public BillIng(Integer billIngId, Integer userId, Integer billCategoryId, String billCategoryName, Integer billCateMinId, String billCateMinName, Date expDate, String billType, Float money, String billDesCribe, Date createDate, Date updateDate) {
        this.billIngId = billIngId;
        this.userId = userId;
        this.billCategoryId = billCategoryId;
        this.billCategoryName = billCategoryName;
        this.billCateMinId = billCateMinId;
        this.billCateMinName = billCateMinName;
        this.expDate = expDate;
        this.billType = billType;
        this.money = money;
        this.billDesCribe = billDesCribe;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    public Integer getBillIngId() {
        return billIngId;
    }

    public void setBillIngId(Integer billIngId) {
        this.billIngId = billIngId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getBillCategoryId() {
        return billCategoryId;
    }

    public void setBillCategoryId(Integer billCategoryId) {
        this.billCategoryId = billCategoryId;
    }

    public String getBillCategoryName() {
        return billCategoryName;
    }

    public void setBillCategoryName(String billCategoryName) {
        this.billCategoryName = billCategoryName;
    }

    public Integer getBillCateMinId() {
        return billCateMinId;
    }

    public void setBillCateMinId(Integer billCateMinId) {
        this.billCateMinId = billCateMinId;
    }

    public String getBillCateMinName() {
        return billCateMinName;
    }

    public void setBillCateMinName(String billCateMinName) {
        this.billCateMinName = billCateMinName;
    }

    public Date getExpDate() {
        return expDate;
    }

    public void setExpDate(Date expDate) {
        this.expDate = expDate;
    }

    public String getBillType() {
        return billType;
    }

    public void setBillType(String billType) {
        this.billType = billType;
    }

    public Float getMoney() {
        return money;
    }

    public void setMoney(Float money) {
        this.money = money;
    }

    public String getBillDesCribe() {
        return billDesCribe;
    }

    public void setBillDesCribe(String billDesCribe) {
        this.billDesCribe = billDesCribe;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Date updateDate) {
        this.updateDate = updateDate;
    }

    @Override
    public String toString() {
        return "BillIng{" +
                "billIngId=" + billIngId +
                ", userId=" + userId +
                ", billCategoryId=" + billCategoryId +
                ", billCategoryName='" + billCategoryName + '\'' +
                ", billCateMinId=" + billCateMinId +
                ", billCateMinName='" + billCateMinName + '\'' +
                ", expDate=" + expDate +
                ", billType='" + billType + '\'' +
                ", money=" + money +
                ", billDesCribe='" + billDesCribe + '\'' +
                ", createDate=" + createDate +
                ", updateDate=" + updateDate +
                '}';
    }
}
