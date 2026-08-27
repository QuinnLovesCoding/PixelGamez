package com.pixelgamez.service;

import com.pixelgamez.entity.AppUser;
import com.pixelgamez.entity.Game;
import com.pixelgamez.entity.Submission;
import com.pixelgamez.repository.GameRepository;
import com.pixelgamez.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final GameRepository gameRepository;
    private final GameService gameService;

    public List<Submission> getUserSubmissions(String userId) {
        return submissionRepository.findByUserId(userId);
    }

    public List<Submission> getPendingSubmissions() {
        return submissionRepository.findByStatus("pending");
    }

    @Transactional
    public Submission submitGame(Submission submission) {
        submission.setId(UUID.randomUUID().toString());
        submission.setStatus("pending");
        submission.setSubmittedAt(Instant.now());
        return submissionRepository.save(submission);
    }

    @Transactional
    public void approveSubmission(String id, String reviewerId) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        submission.setStatus("approved");
        submission.setReviewedBy(reviewerId);
        submission.setReviewedAt(Instant.now());
        submissionRepository.save(submission);

        // Convert to game
        Game game = Game.builder()
                .id(UUID.randomUUID().toString())
                .title(submission.getTitle())
                .description(submission.getDescription())
                .category(submission.getCategory())
                .embedUrl(submission.getEmbedUrl())
                .thumbnail(submission.getThumbnail() != null ? submission.getThumbnail() : "")
                .bannerUrl(submission.getBannerUrl())
                .developerName(submission.getDeveloperName())
                .itchUrl(submission.getItchUrl())
                .steamUrl(submission.getSteamUrl())
                .discordUrl(submission.getDiscordUrl())
                .twitterUrl(submission.getTwitterUrl())
                .videoUrl(submission.getVideoUrl())
                .downloadUrl(submission.getDownloadUrl())
                .build();
        
        gameService.saveGame(game);
    }

    @Transactional
    public void rejectSubmission(String id, String reviewerId) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        submission.setStatus("rejected");
        submission.setReviewedBy(reviewerId);
        submission.setReviewedAt(Instant.now());
        submissionRepository.save(submission);
    }
}
