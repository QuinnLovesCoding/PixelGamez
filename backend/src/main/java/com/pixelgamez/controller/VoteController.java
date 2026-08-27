package com.pixelgamez.controller;

import com.pixelgamez.entity.AppUser;
import com.pixelgamez.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/votes")
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;

    @GetMapping("/{gameId}")
    public ResponseEntity<?> getVotes(@PathVariable String gameId) {
        return ResponseEntity.ok(voteService.getGameVotes(gameId));
    }

    @GetMapping("/{gameId}/user")
    public ResponseEntity<?> getUserVote(@PathVariable String gameId, @AuthenticationPrincipal AppUser user) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        return ResponseEntity.ok(voteService.getUserVote(gameId, user.getId()));
    }

    @PostMapping("/{gameId}")
    public ResponseEntity<?> addVote(
            @PathVariable String gameId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal AppUser user
    ) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        String type = body.get("type");
        if (!"up".equals(type) && !"down".equals(type)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid vote type"));
        }
        
        try {
            voteService.addVote(gameId, user.getId(), type);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{gameId}")
    public ResponseEntity<?> removeVote(@PathVariable String gameId, @AuthenticationPrincipal AppUser user) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        
        voteService.removeVote(gameId, user.getId());
        return ResponseEntity.ok(Map.of("success", true));
    }
}
