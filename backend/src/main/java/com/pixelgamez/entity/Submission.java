package com.pixelgamez.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "Submission", indexes = {
    @Index(name = "Submission_status_idx", columnList = "status"),
    @Index(name = "Submission_userId_idx", columnList = "userId")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Submission {

    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String gameType;

    @Column(nullable = false)
    private String embedUrl;

    private String gameFileUrl;
    private String thumbnail;
    private String thumbnailFileUrl;
    private String bannerUrl;
    private String steamUrl;
    private String discordUrl;
    private String itchUrl;
    private String twitterUrl;
    private String videoUrl;
    private String downloadUrl;

    @Column(nullable = false)
    private String developerName;

    private String submitterEmail;
    private String userId;

    @Builder.Default
    private Instant submittedAt = Instant.now();

    @Column(nullable = false)
    @Builder.Default
    private String status = "pending";

    private String reviewedBy;
    private Instant reviewedAt;

    @Builder.Default
    private int plays = 0;

    @Builder.Default
    private double rating = 0;
}
