package com.bill.po;

public class ExpIncMoneyInfo {
    private Float sameDayMoney;
    private Float thisWeekMoney;
    private Float thisMonthMoney;
    private Float thisYearMoney;

    public ExpIncMoneyInfo() {
    }

    public ExpIncMoneyInfo(Float sameDayMoney, Float thisWeekMoney, Float thisMonthMoney, Float thisYearMoney) {
        this.sameDayMoney = sameDayMoney;
        this.thisWeekMoney = thisWeekMoney;
        this.thisMonthMoney = thisMonthMoney;
        this.thisYearMoney = thisYearMoney;
    }

    public Float getSameDayMoney() {
        return sameDayMoney;
    }

    public void setSameDayMoney(Float sameDayMoney) {
        this.sameDayMoney = sameDayMoney;
    }

    public Float getThisWeekMoney() {
        return thisWeekMoney;
    }

    public void setThisWeekMoney(Float thisWeekMoney) {
        this.thisWeekMoney = thisWeekMoney;
    }

    public Float getThisMonthMoney() {
        return thisMonthMoney;
    }

    public void setThisMonthMoney(Float thisMonthMoney) {
        this.thisMonthMoney = thisMonthMoney;
    }

    public Float getThisYearMoney() {
        return thisYearMoney;
    }

    public void setThisYearMoney(Float thisYearMoney) {
        this.thisYearMoney = thisYearMoney;
    }

    @Override
    public String toString() {
        return "ExpIncMoneyInfo{" +
                "sameDayMoney=" + sameDayMoney +
                ", thisWeekMoney=" + thisWeekMoney +
                ", thisMonthMoney=" + thisMonthMoney +
                ", thisYearMoney=" + thisYearMoney +
                '}';
    }
}
