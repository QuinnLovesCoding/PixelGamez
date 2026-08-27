package com.pixelgamez.controller;

import com.pixelgamez.entity.AppUser;
import com.pixelgamez.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @GetMapping
    public ResponseEntity<?> getFriendsAndFollows(@AuthenticationPrincipal AppUser user) {
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        return ResponseEntity.ok(friendService.getFriendsAndFollows(user.getId()));
    }

    @GetMapping("/status/{targetId}")
    public ResponseEntity<?> getStatus(@PathVariable String targetId, @AuthenticationPrincipal AppUser user) {
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        return ResponseEntity.ok(Map.of("status", friendService.getFriendshipStatus(user.getId(), targetId)));
    }

    @PostMapping("/follow/{targetId}")
    public ResponseEntity<?> follow(@PathVariable String targetId, @AuthenticationPrincipal AppUser user) {
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        try {
            return ResponseEntity.ok(Map.of("success", true, "follow", friendService.followUser(user.getId(), targetId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/unfollow/{targetId}")
    public ResponseEntity<?> unfollow(@PathVariable String targetId, @AuthenticationPrincipal AppUser user) {
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        return ResponseEntity.ok(Map.of("success", friendService.unfollowUser(user.getId(), targetId)));
    }
}
