package com.pixelgamez.service;

import com.pixelgamez.entity.Notification;
import com.pixelgamez.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    @Cacheable(value = "notifications", key = "'all'")
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @Transactional
    @CacheEvict(value = "notifications", allEntries = true)
    public Notification createNotification(Notification notification) {
        notification.setId(UUID.randomUUID().toString());
        return notificationRepository.save(notification);
    }

    @Transactional
    @CacheEvict(value = "notifications", allEntries = true)
    public void deleteNotification(String id) {
        notificationRepository.deleteById(id);
    }
}
