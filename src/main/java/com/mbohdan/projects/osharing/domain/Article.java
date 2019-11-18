package com.mbohdan.projects.osharing.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.mbohdan.projects.osharing.domain.enumeration.ObjectStatus;

import com.mbohdan.projects.osharing.domain.enumeration.RentPeriod;

import com.mbohdan.projects.osharing.domain.enumeration.Currency;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "jhi_desc")
    private String desc;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private ObjectStatus status;

    @Column(name = "add_time")
    private Long addTime;

    @Column(name = "price")
    private Double price;

    @Column(name = "main_image")
    private String mainImage;

    @Enumerated(EnumType.STRING)
    @Column(name = "rent_period")
    private RentPeriod rentPeriod;

    @Enumerated(EnumType.STRING)
    @Column(name = "currency")
    private Currency currency;

    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();

    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Renting> rentings = new HashSet<>();

    @OneToMany(mappedBy = "article")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Reservation> reservations = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("articles")
    private User user;

    @ManyToOne
    @JsonIgnoreProperties("articles")
    private Location location;

    @ManyToOne
    @JsonIgnoreProperties("articles")
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Article name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public Article desc(String desc) {
        this.desc = desc;
        return this;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public ObjectStatus getStatus() {
        return status;
    }

    public Article status(ObjectStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(ObjectStatus status) {
        this.status = status;
    }

    public Long getAddTime() {
        return addTime;
    }

    public Article addTime(Long addTime) {
        this.addTime = addTime;
        return this;
    }

    public void setAddTime(Long addTime) {
        this.addTime = addTime;
    }

    public Double getPrice() {
        return price;
    }

    public Article price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getMainImage() {
        return mainImage;
    }

    public Article mainImage(String mainImage) {
        this.mainImage = mainImage;
        return this;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }

    public RentPeriod getRentPeriod() {
        return rentPeriod;
    }

    public Article rentPeriod(RentPeriod rentPeriod) {
        this.rentPeriod = rentPeriod;
        return this;
    }

    public void setRentPeriod(RentPeriod rentPeriod) {
        this.rentPeriod = rentPeriod;
    }

    public Currency getCurrency() {
        return currency;
    }

    public Article currency(Currency currency) {
        this.currency = currency;
        return this;
    }

    public void setCurrency(Currency currency) {
        this.currency = currency;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Article images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Article addImage(Image image) {
        this.images.add(image);
        image.setArticle(this);
        return this;
    }

    public Article removeImage(Image image) {
        this.images.remove(image);
        image.setArticle(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<Renting> getRentings() {
        return rentings;
    }

    public Article rentings(Set<Renting> rentings) {
        this.rentings = rentings;
        return this;
    }

    public Article addRenting(Renting renting) {
        this.rentings.add(renting);
        renting.setArticle(this);
        return this;
    }

    public Article removeRenting(Renting renting) {
        this.rentings.remove(renting);
        renting.setArticle(null);
        return this;
    }

    public void setRentings(Set<Renting> rentings) {
        this.rentings = rentings;
    }

    public Set<Reservation> getReservations() {
        return reservations;
    }

    public Article reservations(Set<Reservation> reservations) {
        this.reservations = reservations;
        return this;
    }

    public Article addReservation(Reservation reservation) {
        this.reservations.add(reservation);
        reservation.setArticle(this);
        return this;
    }

    public Article removeReservation(Reservation reservation) {
        this.reservations.remove(reservation);
        reservation.setArticle(null);
        return this;
    }

    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }

    public User getUser() {
        return user;
    }

    public Article user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Location getLocation() {
        return location;
    }

    public Article location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }


    public Category getCategory() {
        return category;
    }

    public Article category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", desc='" + getDesc() + "'" +
            ", status='" + getStatus() + "'" +
            ", addTime=" + getAddTime() +
            ", price=" + getPrice() +
            ", mainImage='" + getMainImage() + "'" +
            ", rentPeriod='" + getRentPeriod() + "'" +
            ", currency='" + getCurrency() + "'" +
            "}";
    }
}
