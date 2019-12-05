package com.mbohdan.projects.osharing.service.dto.osh;

import com.mbohdan.projects.osharing.domain.Article;
import com.mbohdan.projects.osharing.domain.Category;
import com.mbohdan.projects.osharing.domain.Location;
import com.mbohdan.projects.osharing.domain.enumeration.Currency;
import com.mbohdan.projects.osharing.domain.enumeration.ObjectStatus;
import com.mbohdan.projects.osharing.domain.enumeration.RentPeriod;

import java.io.Serializable;

public class OshArticleDTO implements Serializable {
    private Long id;
    private String name;
    private String desc;
    private ObjectStatus status;
    private Long addTime;
    private Double price;
    private String mainImage;
    private RentPeriod rentPeriod;
    private Currency currency;
    private Long userId;
    private String categoryName;
    private String streetAddress;
    private String postalCode;
    private String city;
    private String stateProvince;
    private Double lat;
    private Double lon;

    public OshArticleDTO(Long id, String name, String desc, ObjectStatus status, Long addTime, Double price,
                         String mainImage, RentPeriod rentPeriod, Currency currency, Long userId,
                         String categoryName, String streetAddress, String postalCode, String city, String stateProvince,
                         Double lat, Double lon) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.status = status;
        this.addTime = addTime;
        this.price = price;
        this.mainImage = mainImage;
        this.rentPeriod = rentPeriod;
        this.currency = currency;
        this.userId = userId;
        this.categoryName = categoryName;
        this.streetAddress = streetAddress;
        this.postalCode = postalCode;
        this.city = city;
        this.stateProvince = stateProvince;
        this.lat = lat;
        this.lon = lon;
    }

    public OshArticleDTO(Article article){
        this.id = article.getId();
        this.name = article.getName();
        this.desc = article.getDesc();
        this.status = article.getStatus();
        this.addTime = article.getAddTime();
        this.price = article.getPrice();
        this.mainImage = article.getMainImage(); //null ale git
        this.rentPeriod = article.getRentPeriod();
        this.currency = article.getCurrency();
        this.userId = article.getUser().getId();
        this.categoryName = article.getCategory().getCategoryName(); //null
        this.streetAddress = article.getLocation().getStreetAddress();//
        this.postalCode = article.getLocation().getPostalCode();
        this.city = article.getLocation().getCity();
        this.stateProvince = article.getLocation().getStateProvince();
        this.lat = article.getLocation().getLat();
        this.lon = article.getLocation().getLon();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public ObjectStatus getStatus() {
        return status;
    }

    public void setStatus(ObjectStatus status) {
        this.status = status;
    }

    public Long getAddTime() {
        return addTime;
    }

    public void setAddTime(Long addTime) {
        this.addTime = addTime;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getMainImage() {
        return mainImage;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public void setStateProvince(String stateProvince) {
        this.stateProvince = stateProvince;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }

    @Override
    public String toString() {
        return "OshArticleDTO{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", desc='" + desc + '\'' +
            ", status=" + status +
            ", addTime=" + addTime +
            ", price=" + price +
            ", mainImage='" + mainImage + '\'' +
            ", rentPeriod=" + rentPeriod +
            ", currency=" + currency +
            ", userId=" + userId +
            ", categoryName='" + categoryName + '\'' +
            ", streetAddress='" + streetAddress + '\'' +
            ", postalCode='" + postalCode + '\'' +
            ", city='" + city + '\'' +
            ", stateProvince='" + stateProvince + '\'' +
            ", lat=" + lat +
            ", lon=" + lon +
            '}';
    }
}
