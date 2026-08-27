package com.pixelgamez.service;

import com.pixelgamez.dto.PublicUserDto;
import com.pixelgamez.dto.UpdateProfileRequest;
import com.pixelgamez.entity.AppUser;
import com.pixelgamez.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthService authService;

    public PublicUserDto getUserProfile(String id) {
        return userRepository.findById(id)
                .map(authService::mapToPublicDto)
                .orElse(null);
    }

    public PublicUserDto getUserByDisplayName(String displayName) {
        return userRepository.findFirstByDisplayNameIgnoreCase(displayName)
                .map(authService::mapToPublicDto)
                .orElse(null);
    }

    public List<PublicUserDto> searchUsers(String query) {
        return userRepository.findByDisplayNameContainingIgnoreCase(query)
                .stream()
                .map(authService::mapToPublicDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public PublicUserDto updateProfile(String userId, UpdateProfileRequest request) {
        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getDisplayName() != null) {
            user.setDisplayName(request.getDisplayName());
        }
        if (request.getAboutMe() != null) {
            user.setAboutMe(request.getAboutMe());
        }
        if (request.getWorkingOn() != null) {
            user.setWorkingOn(request.getWorkingOn());
        }
        if (request.getCountry() != null) {
            user.setCountry(request.getCountry());
        }

        user = userRepository.save(user);
        return authService.mapToPublicDto(user);
    }

    @Transactional
    public PublicUserDto updateAvatar(String userId, String avatarUrl) {
        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setAvatarUrl(avatarUrl);
        return authService.mapToPublicDto(userRepository.save(user));
    }

    @Transactional
    public PublicUserDto updateBanner(String userId, String bannerUrl) {
        AppUser user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setBannerUrl(bannerUrl);
        return authService.mapToPublicDto(userRepository.save(user));
    }

    @Transactional
    public void addRecentGame(String userId, String gameId) {
        userRepository.findById(userId).ifPresent(user -> {
            String[] current = user.getRecentGames();
            if (current == null) {
                user.setRecentGames(new String[]{gameId});
            } else {
                // simple array operation - normally we'd use a List or Set
                boolean exists = false;
                for (String id : current) {
                    if (id.equals(gameId)) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    String[] next = new String[Math.min(current.length + 1, 10)]; // keep last 10
                    next[0] = gameId;
                    System.arraycopy(current, 0, next, 1, next.length - 1);
                    user.setRecentGames(next);
                }
            }
            userRepository.save(user);
        });
    }
}
