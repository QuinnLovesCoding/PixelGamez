package com.pixelgamez.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "VerificationCode")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class VerificationCode {

    @Id
    private String email;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private Instant expiresAt;
}
