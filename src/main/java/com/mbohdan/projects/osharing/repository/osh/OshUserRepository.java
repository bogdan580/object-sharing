package com.mbohdan.projects.osharing.repository.osh;

import com.mbohdan.projects.osharing.domain.Article;
import com.mbohdan.projects.osharing.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OshUserRepository extends JpaRepository<User, Long> {

    @Query("select user from User user where user.login = ?#{principal.username}")
    User findByUserIsCurrentUser();
}
