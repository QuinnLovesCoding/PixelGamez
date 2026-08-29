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
    public ResponseEntity<?> submitGame(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("gameType") String gameType,
            @RequestParam(value = "embedUrl", required = false) String embedUrl,
            @RequestParam(value = "discordUrl", required = false) String discordUrl,
            @RequestParam(value = "steamUrl", required = false) String steamUrl,
            @RequestParam(value = "itchUrl", required = false) String itchUrl,
            @RequestParam(value = "twitterUrl", required = false) String twitterUrl,
            @RequestParam(value = "videoUrl", required = false) String videoUrl,
            @RequestParam(value = "gameFile", required = false) org.springframework.web.multipart.MultipartFile gameFile,
            @RequestParam(value = "downloadFile", required = false) org.springframework.web.multipart.MultipartFile downloadFile,
            @RequestParam(value = "bannerFile", required = false) org.springframework.web.multipart.MultipartFile bannerFile,
            @AuthenticationPrincipal AppUser user) {
        
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        try {
            Submission submission = Submission.builder()
                .title(title)
                .description(description)
                .category(category)
                .gameType(gameType)
                .embedUrl(embedUrl != null ? embedUrl : "")
                .discordUrl(discordUrl)
                .steamUrl(steamUrl)
                .itchUrl(itchUrl)
                .twitterUrl(twitterUrl)
                .videoUrl(videoUrl)
                .developerName(user.getDisplayName() != null ? user.getDisplayName() : "Unknown")
                .userId(user.getId())
                .status("pending")
                .build();
                
            com.pixelgamez.service.FileStorageService fileStorageService = new com.pixelgamez.service.FileStorageService();

            if (gameFile != null && !gameFile.isEmpty()) {
                if (gameType.equals("html")) {
                    String extractedUrl = fileStorageService.storeFile(gameFile, "games");
                    submission.setEmbedUrl(extractedUrl);
                } else if (gameType.equals("unity")) {
                    String extractedUrl = fileStorageService.storeFile(gameFile, "games");
                    submission.setEmbedUrl(extractedUrl);
                }
            }
            
            if (downloadFile != null && !downloadFile.isEmpty()) {
                String downloadUrl = fileStorageService.storeFile(downloadFile, "downloads");
                submission.setDownloadUrl(downloadUrl);
            }
            
            if (bannerFile != null && !bannerFile.isEmpty()) {
                String bannerUrl = fileStorageService.storeFile(bannerFile, "banners");
                submission.setBannerUrl(bannerUrl);
            }

            return ResponseEntity.ok(submissionService.submitGame(submission));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
