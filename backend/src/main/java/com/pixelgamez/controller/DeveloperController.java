package com.pixelgamez.controller;

import com.pixelgamez.entity.AppUser;
import com.pixelgamez.entity.Submission;
import com.pixelgamez.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/developer")
@RequiredArgsConstructor
public class DeveloperController {

    private final SubmissionService submissionService;

    @GetMapping("/my-games")
    public ResponseEntity<?> getMyGames(@AuthenticationPrincipal AppUser user) {
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        return ResponseEntity.ok(submissionService.getUserSubmissions(user.getId()));
    }

    @PostMapping("/submit")
    public ResponseEntity<?> submitGame(@RequestBody Submission submission, @AuthenticationPrincipal AppUser user) {
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        try {
            submission.setUserId(user.getId());
            return ResponseEntity.ok(submissionService.submitGame(submission));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
