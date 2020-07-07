package com.bill.po;

import java.util.Date;

public class BillCateMin {

    private Integer billCateMinId;
    private Integer userId;
    private Integer billCategoryId;
    private String billCategoryName;
    private String billCateMinName;
    private Date createDate;
    private Date updateDate;

    public BillCateMin() {
    }

    public BillCateMin(Integer billCateMinId, Integer userId, Integer billCategoryId, String billCategoryName, String billCateMinName, Date createDate, Date updateDate) {
        this.billCateMinId = billCateMinId;
        this.userId = userId;
        this.billCategoryId = billCategoryId;
        this.billCategoryName = billCategoryName;
        this.billCateMinName = billCateMinName;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }

    public Integer getBillCateMinId() {
        return billCateMinId;
    }

    public void setBillCateMinId(Integer billCateMinId) {
        this.billCateMinId = billCateMinId;
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

    public String getBillCateMinName() {
        return billCateMinName;
    }

    public void setBillCateMinName(String billCateMinName) {
        this.billCateMinName = billCateMinName;
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
        return "BillCateMin{" +
                "billCateMinId=" + billCateMinId +
                ", userId=" + userId +
                ", billCategoryId=" + billCategoryId +
                ", billCategoryName='" + billCategoryName + '\'' +
                ", billCateMinName='" + billCateMinName + '\'' +
                ", createDate=" + createDate +
                ", updateDate=" + updateDate +
                '}';
    }
}
