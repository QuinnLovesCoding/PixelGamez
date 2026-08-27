package com.pixelgamez.repository;

import com.pixelgamez.entity.Game;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GameRepository extends JpaRepository<Game, String> {
    List<Game> findByCategory(String category, Pageable pageable);
    List<Game> findAllByOrderByPlaysDesc(Pageable pageable);
    List<Game> findByTitleContainingIgnoreCaseOrTagsContainingIgnoreCase(String title, String tag, Pageable pageable);
    
    @org.springframework.data.jpa.repository.Query("SELECT COALESCE(SUM(g.plays), 0) FROM Game g")
    long sumPlays();
}
