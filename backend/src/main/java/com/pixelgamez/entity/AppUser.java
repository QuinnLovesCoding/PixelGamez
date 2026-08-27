package com.pixelgamez.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "\"user\"", indexes = {
    @Index(name = "user_display_name_idx", columnList = "display_name")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class AppUser implements Serializable {

    @Id
    @Column(length = 36)
    private String id;

    @Column(unique = true, insertable = false, updatable = false)
    private Integer playerId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String displayName;

    private String passwordHash;

    @Column(unique = true)
    private String googleId;

    @Column(nullable = false)
    @Builder.Default
    private String role = "user";

    @Column(columnDefinition = "text[] default '{user}'")
    private String[] roles;

    @Column(nullable = false)
    @Builder.Default
    private String avatarUrl = "";

    @Column(nullable = false)
    @Builder.Default
    private String bannerUrl = "";

    @Column(nullable = false)
    @Builder.Default
    private Instant createdAt = Instant.now();

    @Column(nullable = false)
    @Builder.Default
    private String aboutMe = "";

    @Column(nullable = false)
    @Builder.Default
    private String workingOn = "";

    @Column(nullable = false)
    @Builder.Default
    private String country = "";

    @Column(columnDefinition = "text[] default '{}'")
    private String[] recentGames;

    @ManyToMany
    @JoinTable(
        name = "_user_favorites",
        joinColumns = @JoinColumn(name = "b"),
        inverseJoinColumns = @JoinColumn(name = "a")
    )
    @Builder.Default
    @JsonIgnore
    private List<Game> favoriteGames = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @Builder.Default
    @JsonIgnore
    private List<Vote> votes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    @Builder.Default
    @JsonIgnore
    private List<Session> sessions = new ArrayList<>();

    @OneToMany(mappedBy = "follower")
    @Builder.Default
    @JsonIgnore
    private List<Follow> following = new ArrayList<>();

    @OneToMany(mappedBy = "following")
    @Builder.Default
    @JsonIgnore
    private List<Follow> followers = new ArrayList<>();
}
