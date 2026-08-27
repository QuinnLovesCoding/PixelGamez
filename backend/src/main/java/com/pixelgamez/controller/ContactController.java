package com.pixelgamez.controller;

import com.pixelgamez.entity.BrandInquiry;
import com.pixelgamez.repository.BrandInquiryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final BrandInquiryRepository brandInquiryRepository;

    @PostMapping
    public ResponseEntity<?> submitContact(@RequestBody BrandInquiry inquiry) {
        try {
            inquiry.setId(UUID.randomUUID().toString());
            brandInquiryRepository.save(inquiry);
            return ResponseEntity.ok(Map.of("success", true));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Failed to save inquiry"));
        }
    }
}
