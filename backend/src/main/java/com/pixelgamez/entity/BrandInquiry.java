package com.pixelgamez.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "BrandInquiry")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class BrandInquiry {

    @Id
    @Column(length = 36)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    private String company;
    private String website;
    private String budget;

    @Column(nullable = false, columnDefinition = "text")
    private String message;

    @Column(nullable = false)
    @Builder.Default
    private String status = "unread";

    @Builder.Default
    private Instant createdAt = Instant.now();
}
