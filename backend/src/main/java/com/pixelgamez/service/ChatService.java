package com.pixelgamez.service;

import com.pixelgamez.entity.AppUser;
import com.pixelgamez.entity.Conversation;
import com.pixelgamez.entity.Message;
import com.pixelgamez.entity.Participant;
import com.pixelgamez.repository.ConversationRepository;
import com.pixelgamez.repository.MessageRepository;
import com.pixelgamez.repository.ParticipantRepository;
import com.pixelgamez.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    private final ParticipantRepository participantRepository;
    private final UserRepository userRepository;

    public List<Conversation> getUserConversations(String userId) {
        List<Participant> participants = participantRepository.findByUserId(userId);
        return participants.stream()
                .map(Participant::getConversation)
                .collect(Collectors.toList());
    }

    public List<Message> getConversationMessages(String conversationId, String userId) {
        if (!participantRepository.existsByConversationIdAndUserId(conversationId, userId)) {
            throw new RuntimeException("Not a participant");
        }
        return messageRepository.findByConversationIdOrderByCreatedAtAsc(conversationId);
    }

    @Transactional
    public Message sendMessage(String conversationId, String userId, String text) {
        if (!participantRepository.existsByConversationIdAndUserId(conversationId, userId)) {
            throw new RuntimeException("Not a participant");
        }

        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        AppUser sender = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Message message = Message.builder()
                .id(UUID.randomUUID().toString())
                .conversation(conversation)
                .sender(sender)
                .text(text)
                .build();
        return messageRepository.save(message);
    }

    @Transactional
    public Conversation createConversation(List<String> participantIds, boolean isGroup, String name, String creatorId) {
        List<String> allIds = new ArrayList<>(participantIds);
        if (!allIds.contains(creatorId)) {
            allIds.add(creatorId);
        }

        // Check if a direct message conversation already exists between these 2 users
        if (!isGroup && allIds.size() == 2) {
            List<Participant> p1s = participantRepository.findByUserId(allIds.get(0));
            List<Participant> p2s = participantRepository.findByUserId(allIds.get(1));
            
            for (Participant p1 : p1s) {
                if (!p1.getConversation().isGroup()) {
                    for (Participant p2 : p2s) {
                        if (p1.getConversationId().equals(p2.getConversationId())) {
                            return p1.getConversation(); // Found existing
                        }
                    }
                }
            }
        }

        Conversation conversation = Conversation.builder()
                .id(UUID.randomUUID().toString())
                .isGroup(isGroup)
                .name(name)
                .build();
        conversation = conversationRepository.save(conversation);

        for (String pId : allIds) {
            AppUser user = userRepository.findById(pId).orElse(null);
            if (user != null) {
                Participant participant = Participant.builder()
                        .id(UUID.randomUUID().toString())
                        .conversation(conversation)
                        .user(user)
                        .build();
                participantRepository.save(participant);
            }
        }

        return conversationRepository.findById(conversation.getId()).orElse(conversation);
    }
}
