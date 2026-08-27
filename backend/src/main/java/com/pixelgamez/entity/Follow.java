package com.pixelgamez.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "Follow", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"followerId", "followingId"})
}, indexes = {
    @Index(name = "Follow_followerId_idx", columnList = "followerId"),
    @Index(name = "Follow_followingId_idx", columnList = "followingId")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Follow {

    @Id
    @Column(length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followerId", nullable = false)
    private AppUser follower;

    @Column(name = "followerId", insertable = false, updatable = false)
    private String followerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "followingId", nullable = false)
    private AppUser following;

    @Column(name = "followingId", insertable = false, updatable = false)
    private String followingId;

    @Builder.Default
    private Instant createdAt = Instant.now();
}
