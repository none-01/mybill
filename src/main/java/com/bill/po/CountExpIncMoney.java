package com.bill.po;

public class CountExpIncMoney {
    private Float expMoney;
    private Float incMoney;

    public CountExpIncMoney() {
    }

    public CountExpIncMoney(Float expMoney, Float incMoney) {
        this.expMoney = expMoney;
        this.incMoney = incMoney;
    }

    public Float getExpMoney() {
        return expMoney;
    }

    public void setExpMoney(Float expMoney) {
        this.expMoney = expMoney;
    }

    public Float getIncMoney() {
        return incMoney;
    }

    public void setIncMoney(Float incMoney) {
        this.incMoney = incMoney;
    }

    @Override
    public String toString() {
        return "CountExpIncMoney{" +
                "expMoney=" + expMoney +
                ", incMoney=" + incMoney +
                '}';
    }
}
