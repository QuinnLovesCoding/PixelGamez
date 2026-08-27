package com.pixelgamez.repository;

import com.pixelgamez.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<AppUser, String> {
    Optional<AppUser> findByEmail(String email);
    Optional<AppUser> findByGoogleId(String googleId);
    Optional<AppUser> findByPlayerId(Integer playerId);
    Optional<AppUser> findFirstByDisplayNameIgnoreCase(String displayName);
    List<AppUser> findByDisplayNameContainingIgnoreCase(String query);
    Optional<AppUser> findFirstByRole(String role);
    boolean existsByEmail(String email);
    long countByCreatedAtAfter(java.time.Instant date);
}
