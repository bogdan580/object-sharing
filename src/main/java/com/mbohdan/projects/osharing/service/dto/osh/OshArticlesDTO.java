package com.mbohdan.projects.osharing.service.dto.osh;

import com.mbohdan.projects.osharing.domain.enumeration.Currency;
import com.mbohdan.projects.osharing.domain.enumeration.ObjectStatus;
import com.mbohdan.projects.osharing.domain.enumeration.RentPeriod;

public class OshArticlesDTO {
    private Long id;
    private String jhiDesc;
    private ObjectStatus status;
    private Long addTime;
    private Double price;
    private String mainImage;
    private RentPeriod rentPeriod;
    private Currency currency;
    private String category_name;
    private String streetAddress;
    private String postalCode;
    private String city;
    private String stateProvince;
    private Double lat; // todo change to double in db
    private Double lon;
    private Integer tel;
    private String fullName;
    private String avatar;
    private Integer providedObjects;
    private Integer rentedObjects;
}
