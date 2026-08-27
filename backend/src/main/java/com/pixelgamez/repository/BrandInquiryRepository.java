package com.pixelgamez.repository;

import com.pixelgamez.entity.BrandInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BrandInquiryRepository extends JpaRepository<BrandInquiry, String> {
    List<BrandInquiry> findAllByOrderByCreatedAtDesc();
}
