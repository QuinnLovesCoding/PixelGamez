package com.pixelgamez.controller;

import com.pixelgamez.entity.Ad;
import com.pixelgamez.entity.AppUser;
import com.pixelgamez.entity.Notification;
import com.pixelgamez.repository.BrandInquiryRepository;
import com.pixelgamez.repository.UserRepository;
import com.pixelgamez.repository.VoteRepository;
import com.pixelgamez.repository.GameRepository;
import com.pixelgamez.service.AdService;
import com.pixelgamez.service.NotificationService;
import com.pixelgamez.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final SubmissionService submissionService;
    private final AdService adService;
    private final NotificationService notificationService;
    private final BrandInquiryRepository brandInquiryRepository;
    private final VoteRepository voteRepository;
    private final GameRepository gameRepository;

    @GetMapping("/users")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping("/users/{userId}/role")
    public ResponseEntity<?> updateUserRole(@PathVariable String userId, @RequestBody Map<String, String> body, @AuthenticationPrincipal AppUser user) {
        if (user == null || !"owner".equals(user.getRole())) {
            return ResponseEntity.status(403).body(Map.of("error", "Forbidden"));
        }
        
        return userRepository.findById(userId).map(u -> {
            u.setRole(body.get("role"));
            u.setRoles(new String[]{body.get("role")});
            userRepository.save(u);
            return ResponseEntity.ok(Map.of("success", true));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pending-games")
    public ResponseEntity<?> getPendingGames() {
        return ResponseEntity.ok(submissionService.getPendingSubmissions());
    }

    @PostMapping("/pending-games/{id}/approve")
    public ResponseEntity<?> approveGame(@PathVariable String id, @AuthenticationPrincipal AppUser user) {
        try {
            submissionService.approveSubmission(id, user.getId());
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/pending-games/{id}/reject")
    public ResponseEntity<?> rejectGame(@PathVariable String id, @AuthenticationPrincipal AppUser user) {
        try {
            submissionService.rejectSubmission(id, user.getId());
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/ads")
    public ResponseEntity<?> getAds() {
        return ResponseEntity.ok(adService.getAllAds());
    }

    @PostMapping("/ads")
    public ResponseEntity<?> createAd(@RequestBody Ad ad) {
        return ResponseEntity.ok(adService.createAd(ad));
    }

    @PostMapping("/ads/{id}/toggle")
    public ResponseEntity<?> toggleAd(@PathVariable String id) {
        return ResponseEntity.ok(adService.toggleAd(id));
    }

    @DeleteMapping("/ads/{id}")
    public ResponseEntity<?> deleteAd(@PathVariable String id) {
        adService.deleteAd(id);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/notifications")
    public ResponseEntity<?> createNotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(notificationService.createNotification(notification));
    }

    @DeleteMapping("/notifications/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable String id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping("/inquiries")
    public ResponseEntity<?> getInquiries() {
        return ResponseEntity.ok(brandInquiryRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping("/inquiries/{id}/read")
    public ResponseEntity<?> markInquiryRead(@PathVariable String id) {
        brandInquiryRepository.findById(id).ifPresent(i -> {
            i.setStatus("read");
            brandInquiryRepository.save(i);
        });
        return ResponseEntity.ok(Map.of("success", true));
    }

    @GetMapping("/analytics")
    public ResponseEntity<?> getAnalytics() {
        return ResponseEntity.ok(gameRepository.findAll().stream().map(game -> {
            long likes = voteRepository.countByGameIdAndType(game.getId(), "like");
            long dislikes = voteRepository.countByGameIdAndType(game.getId(), "dislike");
            
            // Reconstruct the expected frontend structure
            return Map.of(
                "id", game.getId(),
                "title", game.getTitle(),
                "plays", game.getPlays(),
                "description", game.getDescription(),
                "_count", Map.of("favoritedBy", game.getFavoritedBy() != null ? game.getFavoritedBy().size() : 0),
                "likes", likes,
                "dislikes", dislikes
            );
        }).toList());
    }
}
