package com.mbohdan.projects.osharing.service.dto.osh;

import com.mbohdan.projects.osharing.domain.Article;
import com.mbohdan.projects.osharing.domain.Renting;
import com.mbohdan.projects.osharing.domain.enumeration.Currency;
import com.mbohdan.projects.osharing.domain.enumeration.RentPeriod;

import java.io.Serializable;

public class OshHistoryData implements Serializable, Comparable {
    private String type;
    private Long startTime;
    private Long endTime;
    private Article article;
    private Double price;
    private RentPeriod rentPeriod;
    private Currency currency;

    public OshHistoryData() {}

    public OshHistoryData(String type, Long startTime, Long endTime, Article article) {
        this.type = type;
        this.startTime = startTime;
        this.endTime = endTime;
        this.article = article;
    }

    public OshHistoryData(String type, Long startTime, Long endTime, Article article, Double price, RentPeriod rentPeriod, Currency currency) {
        this.type = type;
        this.startTime = startTime;
        this.endTime = endTime;
        this.article = article;
        this.price = price;
        this.rentPeriod = rentPeriod;
        this.currency = currency;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }

    public Article getArticle() {
        return article;
    }

    public void setArticle(Article article) {
        this.article = article;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public RentPeriod getRentPeriod() {
        return rentPeriod;
    }

    public void setRentPeriod(RentPeriod rentPeriod) {
        this.rentPeriod = rentPeriod;
    }

    public Currency getCurrency() {
        return currency;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    @Override
    public int compareTo(Object comparestu) {
        Long compareage =((OshHistoryData)comparestu).getStartTime();
        /* For Ascending order*/
        Long result = compareage-this.startTime;
        return result.intValue();

        /* For Descending order do like this */
        //return compareage-this.studentage;
    }

    @Override
    public String toString() {
        return "OshHistoryData{" +
            "type='" + type + '\'' +
            ", startTime=" + startTime +
            ", endTime=" + endTime +
            ", article=" + article +
            ", price=" + price +
            ", rentPeriod=" + rentPeriod +
            ", currency=" + currency +
            '}';
    }
}
