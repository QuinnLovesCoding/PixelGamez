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
        Cookie cookie = new Cookie("pgz_session", "");
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
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
        Cookie cookie = new Cookie("pgz_session", token);
        cookie.setHttpOnly(true);
        String proto = request.getHeader("X-Forwarded-Proto");
        boolean isSecure = (proto != null && proto.equalsIgnoreCase("https")) || request.isSecure();
        cookie.setSecure(isSecure);
        cookie.setPath("/");
        cookie.setMaxAge(30 * 24 * 60 * 60); // 30 days
        cookie.setAttribute("SameSite", "Lax");
        response.addCookie(cookie);
    }

    static class ErrorResponse {
        public String error;
        public ErrorResponse(String error) { this.error = error; }
    }
}
