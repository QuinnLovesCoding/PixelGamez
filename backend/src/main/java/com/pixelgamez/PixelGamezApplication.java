package com.pixelgamez;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PixelGamezApplication {
    public static void main(String[] args) {
        SpringApplication.run(PixelGamezApplication.class, args);
    }
}
