package com.bill.po;

public class QueryBillIng {

    private Integer userId;
    private String startDate;
    private String endDate;
    private Integer billCategoryId;
    private Integer billCateMinId;
    private String billType;
    private String billDesCribe;

    public QueryBillIng() {
    }

    public QueryBillIng(Integer userId, String startDate, String endDate, Integer billCategoryId, Integer billCateMinId, String billType, String billDesCribe) {
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.billCategoryId = billCategoryId;
        this.billCateMinId = billCateMinId;
        this.billType = billType;
        this.billDesCribe = billDesCribe;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Integer getBillCategoryId() {
        return billCategoryId;
    }

    public void setBillCategoryId(Integer billCategoryId) {
        this.billCategoryId = billCategoryId;
    }

    public Integer getBillCateMinId() {
        return billCateMinId;
    }

    public void setBillCateMinId(Integer billCateMinId) {
        this.billCateMinId = billCateMinId;
    }

    public String getBillType() {
        return billType;
    }

    public void setBillType(String billType) {
        this.billType = billType;
    }

    public String getBillDesCribe() {
        return billDesCribe;
    }

    public void setBillDesCribe(String billDesCribe) {
        this.billDesCribe = billDesCribe;
    }

    @Override
    public String toString() {
        return "QueryBillIng{" +
                "userId=" + userId +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", billCategoryId=" + billCategoryId +
                ", billCateMinId=" + billCateMinId +
                ", billType='" + billType + '\'' +
                ", billDesCribe='" + billDesCribe + '\'' +
                '}';
    }
}
