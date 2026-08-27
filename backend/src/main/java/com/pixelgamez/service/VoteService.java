package com.pixelgamez.service;

import com.pixelgamez.entity.AppUser;
import com.pixelgamez.entity.Game;
import com.pixelgamez.entity.Vote;
import com.pixelgamez.repository.GameRepository;
import com.pixelgamez.repository.UserRepository;
import com.pixelgamez.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VoteService {

    private final VoteRepository voteRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    @Cacheable(value = "votes", key = "#gameId")
    public Map<String, Object> getGameVotes(String gameId) {
        int upvotes = voteRepository.countByGameIdAndType(gameId, "up");
        int downvotes = voteRepository.countByGameIdAndType(gameId, "down");
        
        Map<String, Object> result = new HashMap<>();
        result.put("upvotes", upvotes);
        result.put("downvotes", downvotes);
        
        int total = upvotes + downvotes;
        result.put("rating", total > 0 ? (double) upvotes / total : 0);
        
        return result;
    }

    public Map<String, String> getUserVote(String gameId, String userId) {
        return voteRepository.findByUserIdAndGameId(userId, gameId)
                .map(vote -> Map.of("type", vote.getType()))
                .orElse(Map.of());
    }

    @Transactional
    @CacheEvict(value = "votes", key = "#gameId")
    public void addVote(String gameId, String userId, String type) {
        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        voteRepository.findByUserIdAndGameId(userId, gameId).ifPresentOrElse(
                vote -> {
                    vote.setType(type);
                    voteRepository.save(vote);
                },
                () -> {
                    Vote newVote = Vote.builder()
                            .id(UUID.randomUUID().toString())
                            .game(game)
                            .user(user)
                            .type(type)
                            .build();
                    voteRepository.save(newVote);
                }
        );
        
        updateGameRating(game);
    }

    @Transactional
    @CacheEvict(value = "votes", key = "#gameId")
    public void removeVote(String gameId, String userId) {
        voteRepository.findByUserIdAndGameId(userId, gameId)
                .ifPresent(voteRepository::delete);
        
        gameRepository.findById(gameId).ifPresent(this::updateGameRating);
    }

    private void updateGameRating(Game game) {
        int upvotes = voteRepository.countByGameIdAndType(game.getId(), "up");
        int downvotes = voteRepository.countByGameIdAndType(game.getId(), "down");
        int total = upvotes + downvotes;
        game.setRating(total > 0 ? (double) upvotes / total : 0);
        gameRepository.save(game);
    }
}
