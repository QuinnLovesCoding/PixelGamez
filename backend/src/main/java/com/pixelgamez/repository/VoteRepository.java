package com.pixelgamez.repository;

import com.pixelgamez.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.query.Param;

public interface VoteRepository extends JpaRepository<Vote, String> {
    List<Vote> findByGameId(String gameId);
    Optional<Vote> findByUserIdAndGameId(String userId, String gameId);
    
    @Query("SELECT COUNT(v) FROM Vote v WHERE v.game.id = :gameId AND v.type = :type")
    int countByGameIdAndType(@Param("gameId") String gameId, @Param("type") String type);
}
