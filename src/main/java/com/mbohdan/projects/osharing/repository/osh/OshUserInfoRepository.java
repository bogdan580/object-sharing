package com.mbohdan.projects.osharing.repository.osh;

import com.mbohdan.projects.osharing.domain.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OshUserInfoRepository extends JpaRepository<UserInfo, Long> {

    @Query("select userInfo from UserInfo userInfo where userInfo.user.login = :login")
    UserInfo findByUserLogin(@Param("login") String login);
}
