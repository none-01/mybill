package com.bill.po;

import java.util.Date;

public class BillCate {
    private Integer billCategoryId;
    private String billCategoryName;
    private Integer userId;
    private Date createDate;
    private Date updateDate;

    public BillCate() {
    }

    public BillCate(Integer billCategoryId, String billCategoryName, Integer userId, Date createDate, Date updateDate) {
        this.billCategoryId = billCategoryId;
        this.billCategoryName = billCategoryName;
        this.userId = userId;
        this.createDate = createDate;
        this.updateDate = updateDate;
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

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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
        return "BillCate{" +
                "billCategoryId=" + billCategoryId +
                ", billCategoryName='" + billCategoryName + '\'' +
                ", userId=" + userId +
                ", createDate=" + createDate +
                ", updateDate=" + updateDate +
                '}';
    }
}
