package com.pixelgamez.controller;

import com.pixelgamez.entity.Game;
import com.pixelgamez.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/games")
@RequiredArgsConstructor
public class GameController {

    private final GameService gameService;

    @GetMapping
    public ResponseEntity<?> getGames() {
        return ResponseEntity.ok(gameService.getAllGames());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGame(@PathVariable String id) {
        Game game = gameService.getGameById(id);
        if (game == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(game);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<?> getGamesByCategory(@PathVariable String category) {
        return ResponseEntity.ok(gameService.getGamesByCategory(category));
    }

    @GetMapping("/popular")
    public ResponseEntity<?> getPopularGames() {
        return ResponseEntity.ok(gameService.getPopularGames());
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchGames(@RequestParam String q) {
        if (q == null || q.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Query required");
        }
        return ResponseEntity.ok(gameService.searchGames(q));
    }

    @PostMapping("/{id}/play")
    public ResponseEntity<?> incrementPlays(@PathVariable String id) {
        gameService.incrementPlays(id);
        return ResponseEntity.ok().build();
    }
}
