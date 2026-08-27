package com.pixelgamez.repository;

import com.pixelgamez.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.Instant;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, String> {
    List<Session> findByUserId(String userId);
    void deleteByExpiresAtBefore(Instant now);
}
