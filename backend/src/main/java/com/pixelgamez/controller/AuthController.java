package com.pixelgamez.controller;

import com.pixelgamez.dto.AuthRequest;
import com.pixelgamez.dto.AuthResponse;
import com.pixelgamez.dto.GoogleAuthRequest;
import com.pixelgamez.dto.RegisterRequest;
import com.pixelgamez.entity.AppUser;
import com.pixelgamez.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest requestBody, HttpServletRequest request, HttpServletResponse response) {
        try {
            AuthResponse authRes = authService.register(requestBody);
            setCookie(request, response, authRes.getToken());
            return ResponseEntity.ok(authRes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest requestBody, HttpServletRequest request, HttpServletResponse response) {
        try {
            AuthResponse authRes = authService.login(requestBody);
            setCookie(request, response, authRes.getToken());
            return ResponseEntity.ok(authRes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleAuthRequest requestBody, HttpServletRequest request, HttpServletResponse response) {
        try {
            AuthResponse authRes = authService.googleLogin(requestBody);
            setCookie(request, response, authRes.getToken());
            return ResponseEntity.ok(authRes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@CookieValue(value = "pgz_session", required = false) String token, HttpServletResponse response) {
        if (token != null) {
            authService.logout(token);
        }
        
        String proto = request != null ? request.getHeader("X-Forwarded-Proto") : null;
        boolean isSecure = (proto != null && proto.toLowerCase().contains("https"));
        
        ResponseCookie cookie = ResponseCookie.from("pgz_session", "")
                .httpOnly(true)
                .secure(isSecure)
                .path("/")
                .maxAge(0)
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMe(@AuthenticationPrincipal AppUser user) {
        if (user == null) {
            return ResponseEntity.status(401).body(new ErrorResponse("Not authenticated"));
        }
        return ResponseEntity.ok(authService.mapToPublicDto(user));
    }

    private void setCookie(HttpServletRequest request, HttpServletResponse response, String token) {
        String proto = request.getHeader("X-Forwarded-Proto");
        boolean isSecure = (proto != null && proto.toLowerCase().contains("https")) || request.isSecure();
        
        ResponseCookie cookie = ResponseCookie.from("pgz_session", token)
                .httpOnly(true)
                .secure(isSecure)
                .path("/")
                .maxAge(30 * 24 * 60 * 60) // 30 days
                .sameSite("Lax")
                .build();
                
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    static class ErrorResponse {
        public String error;
        public ErrorResponse(String error) { this.error = error; }
    }
}
