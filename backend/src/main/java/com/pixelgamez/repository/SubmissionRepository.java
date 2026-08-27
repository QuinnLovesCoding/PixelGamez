package com.pixelgamez.repository;

import com.pixelgamez.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, String> {
    List<Submission> findByUserId(String userId);
    List<Submission> findByStatus(String status);
}
