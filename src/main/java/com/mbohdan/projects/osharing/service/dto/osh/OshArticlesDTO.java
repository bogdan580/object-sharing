package com.mbohdan.projects.osharing.service.dto.osh;

import com.mbohdan.projects.osharing.domain.enumeration.Currency;
import com.mbohdan.projects.osharing.domain.enumeration.ObjectStatus;
import com.mbohdan.projects.osharing.domain.enumeration.RentPeriod;

import java.io.Serializable;

public class OshArticlesDTO implements Serializable {
    private Long id;
    private String desc;
    private ObjectStatus status;
    private Long addTime;
    private Double price;
    private String mainImage;
    private RentPeriod rentPeriod;
    private Currency currency;
    private String categoryName;
    private String streetAddress;
    private String postalCode;
    private String city;
    private String stateProvince;
    private Double lat;
    private Double lon;
    private Integer tel;
    private String fullName;
    private String avatar;
    private Integer providedObjects;
    private Integer rentedObjects;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getTel() {
        return tel;
    }

    public void setTel(Integer tel) {
        this.tel = tel;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getProvidedObjects() {
        return providedObjects;
    }

    public void setProvidedObjects(Integer providedObjects) {
        this.providedObjects = providedObjects;
    }

    public Integer getRentedObjects() {
        return rentedObjects;
    }

    public void setRentedObjects(Integer rentedObjects) {
        this.rentedObjects = rentedObjects;
    }

    @Override
    public String toString() {
        return "OshArticlesDTO{" +
            "id=" + id +
            ", jhiDesc='" + desc + '\'' +
            ", status=" + status +
            ", addTime=" + addTime +
            ", price=" + price +
            ", mainImage='" + mainImage + '\'' +
            ", rentPeriod=" + rentPeriod +
            ", currency=" + currency +
            ", category_name='" + categoryName + '\'' +
            ", streetAddress='" + streetAddress + '\'' +
            ", postalCode='" + postalCode + '\'' +
            ", city='" + city + '\'' +
            ", stateProvince='" + stateProvince + '\'' +
            ", lat=" + lat +
            ", lon=" + lon +
            ", tel=" + tel +
            ", fullName='" + fullName + '\'' +
            ", avatar='" + avatar + '\'' +
            ", providedObjects=" + providedObjects +
            ", rentedObjects=" + rentedObjects +
            '}';
    }
}
