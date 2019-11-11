package com.mbohdan.projects.osharing.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A UserInfo.
 */
@Entity
@Table(name = "user_info")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class UserInfo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "tel")
    private Integer tel;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "provided_objects")
    private Integer providedObjects;

    @Column(name = "rented_objects")
    private Integer rentedObjects;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getTel() {
        return tel;
    }

    public UserInfo tel(Integer tel) {
        this.tel = tel;
        return this;
    }

    public void setTel(Integer tel) {
        this.tel = tel;
    }

    public String getFullName() {
        return fullName;
    }

    public UserInfo fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAvatar() {
        return avatar;
    }

    public UserInfo avatar(String avatar) {
        this.avatar = avatar;
        return this;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getProvidedObjects() {
        return providedObjects;
    }

    public UserInfo providedObjects(Integer providedObjects) {
        this.providedObjects = providedObjects;
        return this;
    }

    public void setProvidedObjects(Integer providedObjects) {
        this.providedObjects = providedObjects;
    }

    public Integer getRentedObjects() {
        return rentedObjects;
    }

    public UserInfo rentedObjects(Integer rentedObjects) {
        this.rentedObjects = rentedObjects;
        return this;
    }

    public void setRentedObjects(Integer rentedObjects) {
        this.rentedObjects = rentedObjects;
    }

    public User getUser() {
        return user;
    }

    public UserInfo user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserInfo)) {
            return false;
        }
        return id != null && id.equals(((UserInfo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
            "id=" + getId() +
            ", tel=" + getTel() +
            ", fullName='" + getFullName() + "'" +
            ", avatar='" + getAvatar() + "'" +
            ", providedObjects=" + getProvidedObjects() +
            ", rentedObjects=" + getRentedObjects() +
            "}";
    }
}
