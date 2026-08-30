package com.pixelgamez.dto;

import lombok.Builder;
import lombok.Data;
import java.time.Instant;

@Data
@Builder
public class PublicUserDto {
    private String id;
    private Integer playerId;
    private String displayName;
    private String avatarUrl;
    private String bannerUrl;
    private String aboutMe;
    private String workingOn;
    private String country;
    private String[] recentGames;
    private String[] favoriteGames;
    private String role;
    private Instant createdAt;
}
