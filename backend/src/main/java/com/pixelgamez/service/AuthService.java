package com.pixelgamez.service;

import com.pixelgamez.dto.AuthRequest;
import com.pixelgamez.dto.AuthResponse;
import com.pixelgamez.dto.GoogleAuthRequest;
import com.pixelgamez.dto.PublicUserDto;
import com.pixelgamez.dto.RegisterRequest;
import com.pixelgamez.entity.AppUser;
import com.pixelgamez.entity.Session;
import com.pixelgamez.repository.SessionRepository;
import com.pixelgamez.repository.UserRepository;
import com.pixelgamez.security.JwtTokenProvider;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Value("${app.google.client-id}")
    private String googleClientId;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        AppUser user = AppUser.builder()
                .id(UUID.randomUUID().toString())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .displayName(request.getDisplayName())
                .role("user")
                .roles(new String[]{"user"})
                .build();

        user = userRepository.save(user);
        return createSessionAndResponse(user);
    }

    @Transactional
    public AuthResponse login(AuthRequest request) {
        AppUser user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (user.getPasswordHash() == null || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        return createSessionAndResponse(user);
    }

    @Transactional
    public AuthResponse googleLogin(GoogleAuthRequest request) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getIdToken());
            if (idToken == null) {
                throw new RuntimeException("Invalid Google token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String googleId = payload.getSubject();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");

            AppUser user = userRepository.findByEmail(email).orElse(null);
            if (user == null) {
                user = AppUser.builder()
                        .id(UUID.randomUUID().toString())
                        .email(email)
                        .googleId(googleId)
                        .displayName(name)
                        .avatarUrl(pictureUrl != null ? pictureUrl : "")
                        .role("user")
                        .roles(new String[]{"user"})
                        .build();
                user = userRepository.save(user);
            } else if (user.getGoogleId() == null) {
                user.setGoogleId(googleId);
                if (user.getAvatarUrl() == null || user.getAvatarUrl().isEmpty()) {
                    user.setAvatarUrl(pictureUrl);
                }
                user = userRepository.save(user);
            }

            return createSessionAndResponse(user);
        } catch (Exception e) {
            throw new RuntimeException("Google authentication failed", e);
        }
    }

    @Transactional
    public void logout(String token) {
        sessionRepository.findById(token).ifPresent(sessionRepository::delete);
    }

    private AuthResponse createSessionAndResponse(AppUser user) {
        String token = jwtTokenProvider.generateToken(user.getId());
        
        Session session = Session.builder()
                .token(token)
                .userId(user.getId())
                .expiresAt(Instant.now().plus(30, ChronoUnit.DAYS))
                .build();
        sessionRepository.save(session);

        return AuthResponse.builder()
                .token(token)
                .user(mapToPublicDto(user))
                .build();
    }

    public PublicUserDto mapToPublicDto(AppUser user) {
        return PublicUserDto.builder()
                .id(user.getId())
                .playerId(user.getPlayerId())
                .displayName(user.getDisplayName())
                .avatarUrl(user.getAvatarUrl())
                .bannerUrl(user.getBannerUrl())
                .aboutMe(user.getAboutMe())
                .workingOn(user.getWorkingOn())
                .country(user.getCountry())
                .recentGames(user.getRecentGames())
                .role(user.getRole())
                .createdAt(user.getCreatedAt())
                .build();
    }
}
