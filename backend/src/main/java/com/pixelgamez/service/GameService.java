package com.pixelgamez.service;

import com.pixelgamez.entity.Game;
import com.pixelgamez.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    @Cacheable(value = "games", key = "'all'")
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @Cacheable(value = "games", key = "'category:' + #category")
    public List<Game> getGamesByCategory(String category) {
        // limit to 50 for category pages
        return gameRepository.findByCategory(category, PageRequest.of(0, 50));
    }

    @Cacheable(value = "games", key = "'popular'")
    public List<Game> getPopularGames() {
        return gameRepository.findAllByOrderByPlaysDesc(PageRequest.of(0, 50));
    }

    @Cacheable(value = "games", key = "#id")
    public Game getGameById(String id) {
        return gameRepository.findById(id).orElse(null);
    }

    public List<Game> searchGames(String query) {
        return gameRepository.findByTitleContainingIgnoreCaseOrTagsContainingIgnoreCase(query, query, PageRequest.of(0, 20));
    }

    @Transactional
    @CacheEvict(value = "games", key = "#id")
    public void incrementPlays(String id) {
        gameRepository.findById(id).ifPresent(game -> {
            game.setPlays(game.getPlays() + 1);
            gameRepository.save(game);
        });
        // Also evict the popular cache
        redisTemplate.delete("games::popular");
    }

    @Transactional
    @CacheEvict(value = "games", allEntries = true)
    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }

    @Transactional
    @CacheEvict(value = "games", allEntries = true)
    public void deleteGame(String id) {
        gameRepository.deleteById(id);
    }
}
