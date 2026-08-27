package com.pixelgamez.service;

import com.pixelgamez.entity.Ad;
import com.pixelgamez.repository.AdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AdService {

    private final AdRepository adRepository;

    @Cacheable(value = "ads", key = "'placement:' + #placement")
    public List<Ad> getAdsByPlacement(String placement) {
        return adRepository.findByPlacementAndActiveTrue(placement);
    }

    public List<Ad> getAllAds() {
        return adRepository.findAll();
    }

    @Transactional
    public void recordImpression(String id) {
        adRepository.findById(id).ifPresent(ad -> {
            ad.setImpressions(ad.getImpressions() + 1);
            adRepository.save(ad);
        });
    }

    @Transactional
    public void recordClick(String id) {
        adRepository.findById(id).ifPresent(ad -> {
            ad.setClicks(ad.getClicks() + 1);
            adRepository.save(ad);
        });
    }

    @Transactional
    @CacheEvict(value = "ads", allEntries = true)
    public Ad createAd(Ad ad) {
        ad.setId(UUID.randomUUID().toString());
        return adRepository.save(ad);
    }

    @Transactional
    @CacheEvict(value = "ads", allEntries = true)
    public void deleteAd(String id) {
        adRepository.deleteById(id);
    }

    @Transactional
    @CacheEvict(value = "ads", allEntries = true)
    public Ad toggleAd(String id) {
        return adRepository.findById(id).map(ad -> {
            ad.setActive(!ad.isActive());
            return adRepository.save(ad);
        }).orElseThrow(() -> new RuntimeException("Ad not found"));
    }
}
