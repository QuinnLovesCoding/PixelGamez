package com.pixelgamez.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.io.Serializable;

@Entity
@Table(name = "Vote", indexes = {
    @Index(name = "Vote_gameId_idx", columnList = "gameId"),
    @Index(name = "Vote_userId_idx", columnList = "userId")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Vote implements Serializable {

    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private String type; // "up" or "down"

    @Builder.Default
    private Instant createdAt = Instant.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private AppUser user;

    @Column(name = "userId", insertable = false, updatable = false)
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gameId", nullable = false)
    private Game game;

    @Column(name = "gameId", insertable = false, updatable = false)
    private String gameId;
}
