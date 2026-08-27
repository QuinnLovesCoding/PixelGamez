package com.pixelgamez.controller;

import com.pixelgamez.dto.PublicUserDto;
import com.pixelgamez.dto.UpdateProfileRequest;
import com.pixelgamez.entity.AppUser;
import com.pixelgamez.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable String id) {
        PublicUserDto user = userService.getUserProfile(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/lookup/{displayName}")
    public ResponseEntity<?> getUserByDisplayName(@PathVariable String displayName) {
        PublicUserDto user = userService.getUserByDisplayName(displayName);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestParam String q) {
        if (q == null || q.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Query required");
        }
        return ResponseEntity.ok(userService.searchUsers(q));
    }

    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(
            @RequestBody UpdateProfileRequest request,
            @AuthenticationPrincipal AppUser user
    ) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        try {
            return ResponseEntity.ok(userService.updateProfile(user.getId(), request));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/me/avatar")
    public ResponseEntity<?> updateAvatar(
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal AppUser user
    ) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        return ResponseEntity.ok(userService.updateAvatar(user.getId(), body.get("avatarUrl")));
    }

    @PostMapping("/me/banner")
    public ResponseEntity<?> updateBanner(
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal AppUser user
    ) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        return ResponseEntity.ok(userService.updateBanner(user.getId(), body.get("bannerUrl")));
    }

    @PostMapping("/me/recent/{gameId}")
    public ResponseEntity<?> addRecentGame(
            @PathVariable String gameId,
            @AuthenticationPrincipal AppUser user
    ) {
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        }
        userService.addRecentGame(user.getId(), gameId);
        return ResponseEntity.ok().build();
    }
}
