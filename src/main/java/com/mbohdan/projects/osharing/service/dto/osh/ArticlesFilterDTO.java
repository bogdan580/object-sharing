package com.mbohdan.projects.osharing.service.dto.osh;

public class ArticlesFilterDTO {
    public String text;
    public String category;
    public String postalCode;
    public String city;
    public Integer page;    //required
    public Integer items;   //required
    public Sorting sort;    //required

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
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

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getItems() {
        return items;
    }

    public void setItems(Integer items) {
        this.items = items;
    }

    public Sorting getSort() {
        return sort;
    }

    public void setSort(Sorting sort) {
        this.sort = sort;
    }

    @Override
    public String toString() {
        return "ArticlesFilterDTO{" +
            "text='" + text + '\'' +
            ", category='" + category + '\'' +
            ", postalCode='" + postalCode + '\'' +
            ", city='" + city + '\'' +
            ", page=" + page +
            ", items=" + items +
            ", sort=" + sort +
            '}';
    }
}
