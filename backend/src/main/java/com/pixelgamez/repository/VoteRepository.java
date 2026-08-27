package com.pixelgamez.repository;

import com.pixelgamez.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote, String> {
    List<Vote> findByGameId(String gameId);
    Optional<Vote> findByUserIdAndGameId(String userId, String gameId);
    int countByGameIdAndType(String gameId, String type);
}
