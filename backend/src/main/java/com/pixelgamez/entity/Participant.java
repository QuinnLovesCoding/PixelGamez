package com.pixelgamez.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "Participant", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"conversationId", "userId"})
}, indexes = {
    @Index(name = "Participant_conversationId_idx", columnList = "conversationId"),
    @Index(name = "Participant_userId_idx", columnList = "userId")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Participant {

    @Id
    @Column(length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversationId", nullable = false)
    private Conversation conversation;

    @Column(name = "conversationId", insertable = false, updatable = false)
    private String conversationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", nullable = false)
    private AppUser user;

    @Column(name = "userId", insertable = false, updatable = false)
    private String userId;

    @Builder.Default
    private Instant joinedAt = Instant.now();
}
