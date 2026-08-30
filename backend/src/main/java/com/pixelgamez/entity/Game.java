package com.pixelgamez.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.io.Serializable;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Game", indexes = {
    @Index(name = "Game_plays_idx", columnList = "plays"),
    @Index(name = "Game_createdAt_idx", columnList = "createdAt"),
    @Index(name = "Game_category_idx", columnList = "category")
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Game implements Serializable {

    @Id
    @EqualsAndHashCode.Include
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "text")
    private String description;

    @Column(nullable = false)
    private String category;

    @Column(columnDefinition = "text[]")
    private String[] tags;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    private String embedUrl;

    @Builder.Default
    private double rating = 0.0;

    @Builder.Default
    private int plays = 0;

    private String developerName;
    private String developerLink;
    private String steamUrl;
    private String discordUrl;
    private String itchUrl;
    private String twitterUrl;
    private String videoUrl;
    private String downloadUrl;
    private String bannerUrl;

    @Builder.Default
    private Instant createdAt = Instant.now();

    @ManyToMany(mappedBy = "favoriteGames")
    @Builder.Default
    @JsonIgnore
    private List<AppUser> favoritedBy = new ArrayList<>();

    @OneToMany(mappedBy = "game")
    @Builder.Default
    @JsonIgnore
    private List<Vote> votes = new ArrayList<>();
}
