package com.pixelgamez.controller;

import com.pixelgamez.entity.AppUser;
import com.pixelgamez.service.ChatService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @GetMapping("/conversations")
    public ResponseEntity<?> getConversations(@AuthenticationPrincipal AppUser user) {
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        return ResponseEntity.ok(chatService.getUserConversations(user.getId()));
    }

    @GetMapping("/messages/{conversationId}")
    public ResponseEntity<?> getMessages(@PathVariable String conversationId, @AuthenticationPrincipal AppUser user) {
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        try {
            return ResponseEntity.ok(chatService.getConversationMessages(conversationId, user.getId()));
        } catch (Exception e) {
            return ResponseEntity.status(403).body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/messages")
    public ResponseEntity<?> sendMessage(@RequestBody SendMessageRequest request, @AuthenticationPrincipal AppUser user) {
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        try {
            return ResponseEntity.ok(chatService.sendMessage(request.getConversationId(), user.getId(), request.getText()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/conversations")
    public ResponseEntity<?> createConversation(@RequestBody CreateConversationRequest request, @AuthenticationPrincipal AppUser user) {
        if (user == null) return ResponseEntity.status(401).body(Map.of("error", "Not authenticated"));
        try {
            return ResponseEntity.ok(chatService.createConversation(request.getParticipantIds(), request.isGroup(), request.getName(), user.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @Data
    static class SendMessageRequest {
        private String conversationId;
        private String text;
    }

    @Data
    static class CreateConversationRequest {
        private List<String> participantIds;
        private boolean group;
        private String name;
    }
}
