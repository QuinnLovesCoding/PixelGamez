package com.pixelgamez.repository;

import com.pixelgamez.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, String> {
    List<Participant> findByUserId(String userId);
    List<Participant> findByConversationId(String conversationId);
    Optional<Participant> findByConversationIdAndUserId(String conversationId, String userId);
    boolean existsByConversationIdAndUserId(String conversationId, String userId);
}
