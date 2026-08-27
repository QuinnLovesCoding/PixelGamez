package com.pixelgamez.repository;

import com.pixelgamez.entity.Ad;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdRepository extends JpaRepository<Ad, String> {
    List<Ad> findByActiveTrue();
    List<Ad> findByPlacementAndActiveTrue(String placement);
}
