package com.pixelgamez.controller;

import com.pixelgamez.service.AdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
public class AdController {

    private final AdService adService;

    @GetMapping("/{placement}")
    public ResponseEntity<?> getAds(@PathVariable String placement) {
        return ResponseEntity.ok(adService.getAdsByPlacement(placement));
    }

    @PostMapping("/{id}/impression")
    public ResponseEntity<?> recordImpression(@PathVariable String id) {
        adService.recordImpression(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/click")
    public ResponseEntity<?> recordClick(@PathVariable String id) {
        adService.recordClick(id);
        return ResponseEntity.ok().build();
    }
}
