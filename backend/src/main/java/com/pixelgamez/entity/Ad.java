package com.pixelgamez.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "Ad", indexes = {
    @Index(name = "Ad_placement_idx", columnList = "placement"),
    @Index(name = "Ad_active_idx", columnList = "active")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Ad {

    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private String imageUrl;

    @Column(nullable = false)
    private String linkUrl;

    @Column(nullable = false)
    private String placement;

    @Column(nullable = false)
    private String label;

    @Builder.Default
    private boolean active = true;

    @Builder.Default
    private int clicks = 0;

    @Builder.Default
    private int impressions = 0;

    @Builder.Default
    private Instant createdAt = Instant.now();
}
