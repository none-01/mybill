package com.bill.po;

import java.util.Date;

public class CountMoney {
    private Date date;
    private Float countMoney;
    private String billCategoryName;
    private Integer percentage;
    private String countDate;

    public CountMoney() {
    }

    public CountMoney(Date date, Float countMoney, String billCategoryName, Integer percentage, String countDate) {
        this.date = date;
        this.countMoney = countMoney;
        this.billCategoryName = billCategoryName;
        this.percentage = percentage;
        this.countDate = countDate;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Float getCountMoney() {
        return countMoney;
    }

    public void setCountMoney(Float countMoney) {
        this.countMoney = countMoney;
    }

    public String getBillCategoryName() {
        return billCategoryName;
    }

    public void setBillCategoryName(String billCategoryName) {
        this.billCategoryName = billCategoryName;
    }

    public Integer getPercentage() {
        return percentage;
    }

    public void setPercentage(Integer percentage) {
        this.percentage = percentage;
    }

    public String getCountDate() {
        return countDate;
    }

    public void setCountDate(String countDate) {
        this.countDate = countDate;
    }

    @Override
    public String toString() {
        return "CountMoney{" +
                "date=" + date +
                ", countMoney=" + countMoney +
                ", billCategoryName='" + billCategoryName + '\'' +
                ", percentage=" + percentage +
                ", countDate='" + countDate + '\'' +
                '}';
    }
}
