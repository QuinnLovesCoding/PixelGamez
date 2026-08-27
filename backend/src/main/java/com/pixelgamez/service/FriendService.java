package com.pixelgamez.service;

import com.pixelgamez.dto.PublicUserDto;
import com.pixelgamez.entity.AppUser;
import com.pixelgamez.entity.Follow;
import com.pixelgamez.repository.FollowRepository;
import com.pixelgamez.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FollowRepository followRepository;
    private final UserRepository userRepository;
    private final AuthService authService;

    public Map<String, Object> getFriendsAndFollows(String userId) {
        List<Follow> following = followRepository.findByFollowerId(userId);
        List<Follow> followers = followRepository.findByFollowingId(userId);

        List<PublicUserDto> followingUsers = following.stream()
                .map(f -> f.getFollowing())
                .filter(u -> u != null)
                .map(authService::mapToPublicDto)
                .collect(Collectors.toList());

        List<PublicUserDto> followerUsers = followers.stream()
                .map(f -> f.getFollower())
                .filter(u -> u != null)
                .map(authService::mapToPublicDto)
                .collect(Collectors.toList());

        List<PublicUserDto> friends = followingUsers.stream()
                .filter(followingUser -> followerUsers.stream().anyMatch(followerUser -> followerUser.getId().equals(followingUser.getId())))
                .collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("following", followingUsers);
        result.put("followers", followerUsers);
        result.put("friends", friends);
        return result;
    }

    public String getFriendshipStatus(String myId, String targetId) {
        if (myId.equals(targetId)) return "self";

        boolean iFollowThem = followRepository.existsByFollowerIdAndFollowingId(myId, targetId);
        boolean theyFollowMe = followRepository.existsByFollowerIdAndFollowingId(targetId, myId);

        if (iFollowThem && theyFollowMe) return "friends";
        if (iFollowThem) return "following";
        if (theyFollowMe) return "follower";
        return "none";
    }

    @Transactional
    public Follow followUser(String myId, String targetId) {
        if (myId.equals(targetId)) {
            throw new RuntimeException("Cannot follow yourself");
        }
        
        AppUser me = userRepository.findById(myId).orElseThrow(() -> new RuntimeException("User not found"));
        AppUser target = userRepository.findById(targetId).orElseThrow(() -> new RuntimeException("Target user not found"));

        return followRepository.findByFollowerIdAndFollowingId(myId, targetId)
                .orElseGet(() -> {
                    Follow newFollow = Follow.builder()
                            .id(UUID.randomUUID().toString())
                            .follower(me)
                            .following(target)
                            .build();
                    return followRepository.save(newFollow);
                });
    }

    @Transactional
    public boolean unfollowUser(String myId, String targetId) {
        return followRepository.findByFollowerIdAndFollowingId(myId, targetId)
                .map(follow -> {
                    followRepository.delete(follow);
                    return true;
                }).orElse(false);
    }
}
