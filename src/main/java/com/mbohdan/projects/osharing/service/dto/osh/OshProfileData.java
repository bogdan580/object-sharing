package com.mbohdan.projects.osharing.service.dto.osh;

import com.mbohdan.projects.osharing.domain.Location;
import com.mbohdan.projects.osharing.domain.UserInfo;

import java.io.Serializable;

public class OshProfileData implements Serializable {
    private UserInfo userInfo;
    private Location location;

    public OshProfileData() {}

    public OshProfileData(UserInfo info, Location location) {
        this.userInfo = info;
        this.location = location;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "OshProfileData{" +
            "userInfo=" + userInfo +
            ", location=" + location +
            '}';
    }
}
