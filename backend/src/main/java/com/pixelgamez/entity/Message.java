package com.pixelgamez.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "Message", indexes = {
    @Index(name = "Message_conversationId_idx", columnList = "conversationId"),
    @Index(name = "Message_createdAt_idx", columnList = "createdAt")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Message {

    @Id
    @Column(length = 36)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversationId", nullable = false)
    private Conversation conversation;

    @Column(name = "conversationId", insertable = false, updatable = false)
    private String conversationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "senderId", nullable = false)
    private AppUser sender;

    @Column(name = "senderId", insertable = false, updatable = false)
    private String senderId;

    @Column(nullable = false, columnDefinition = "text")
    private String text;

    @Builder.Default
    private Instant createdAt = Instant.now();
}
