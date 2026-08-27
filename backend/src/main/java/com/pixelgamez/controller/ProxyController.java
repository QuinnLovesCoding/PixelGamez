package com.pixelgamez.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import java.net.URI;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
public class ProxyController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping(value = "/proxy-game", produces = "text/html")
    public ResponseEntity<String> proxyGame(@RequestParam("url") String targetUrl) {
        if (targetUrl == null || targetUrl.isEmpty()) {
            return ResponseEntity.badRequest().body("URL required");
        }

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Referer", "https://itch.io/");
            headers.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

            HttpEntity<String> entity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(new URI(targetUrl), HttpMethod.GET, entity, String.class);

            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                return ResponseEntity.status(response.getStatusCode()).body("Proxy error");
            }

            String html = response.getBody();
            
            // Generate base URL
            URI uri = new URI(targetUrl);
            String baseUrl = uri.getScheme() + "://" + uri.getHost() + uri.getPath();
            if (!baseUrl.endsWith("/")) {
                int lastSlash = baseUrl.lastIndexOf('/');
                if (lastSlash != -1 && lastSlash > baseUrl.indexOf("://") + 2) {
                    baseUrl = baseUrl.substring(0, lastSlash + 1);
                } else {
                    baseUrl += "/";
                }
            }

            String injectCss = "<style>" +
                "html, body { width: 100% !important; height: 100% !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background-color: #000 !important; }" +
                "canvas, #canvas-container, #unity-container, #game-container, iframe { width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; margin: 0 !important; object-fit: contain !important; }" +
                "</style>";

            if (html.contains("<head>")) {
                html = html.replaceFirst("<head>", "<head><base href=\"" + baseUrl + "\">" + injectCss);
            } else {
                html = "<head><base href=\"" + baseUrl + "\">" + injectCss + "</head>" + html;
            }

            html = html.replaceAll("(?i)<script[^>]*src=[\"']https://static\\.itch\\.io/htmlgame\\.js[\"'][^>]*></script>", "");

            return ResponseEntity.ok(html);

        } catch (URISyntaxException e) {
            return ResponseEntity.badRequest().body("Invalid URL format");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error proxying game: " + e.getMessage());
        }
    }
}
