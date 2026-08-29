package com.pixelgamez.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.nio.file.*;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    public FileStorageService() {
        this.fileStorageLocation = Paths.get("uploads").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file, String subDirectory) {
        if (file == null || file.isEmpty()) return null;
        String originalName = file.getOriginalFilename();
        if (originalName == null) originalName = "unknown";
        
        String fileName = UUID.randomUUID().toString() + "_" + originalName.replaceAll("[^a-zA-Z0-9\\.\\-]", "_");

        try {
            Path targetLocation = this.fileStorageLocation.resolve(subDirectory).resolve(fileName);
            Files.createDirectories(targetLocation.getParent());
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            return "/api/uploads/" + subDirectory + "/" + fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }
    
    public String storeAndExtractZip(MultipartFile file, String subDirectory) {
        if (file == null || file.isEmpty()) return null;
        
        String folderName = UUID.randomUUID().toString();
        Path targetDir = this.fileStorageLocation.resolve(subDirectory).resolve(folderName);
        
        try {
            Files.createDirectories(targetDir);
            
            // Extract Zip
            try (ZipInputStream zis = new ZipInputStream(file.getInputStream())) {
                ZipEntry zipEntry = zis.getNextEntry();
                String mainHtmlFile = null;
                
                while (zipEntry != null) {
                    Path newFilePath = targetDir.resolve(zipEntry.getName());
                    
                    // Prevent zip slip vulnerability
                    if (!newFilePath.normalize().startsWith(targetDir.normalize())) {
                        throw new IOException("Bad zip entry: " + zipEntry.getName());
                    }
                    
                    if (zipEntry.isDirectory()) {
                        Files.createDirectories(newFilePath);
                    } else {
                        Files.createDirectories(newFilePath.getParent());
                        Files.copy(zis, newFilePath, StandardCopyOption.REPLACE_EXISTING);
                        
                        // Heuristic to find the main HTML file if it's an HTML5 game
                        if (mainHtmlFile == null && (zipEntry.getName().endsWith("index.html") || zipEntry.getName().endsWith("index.htm"))) {
                            mainHtmlFile = zipEntry.getName();
                        }
                    }
                    zipEntry = zis.getNextEntry();
                }
                zis.closeEntry();
                
                // If we found an index.html, return its path
                if (mainHtmlFile != null) {
                    return "/api/uploads/" + subDirectory + "/" + folderName + "/" + mainHtmlFile;
                }
                
                // Fallback if no index.html found
                return "/api/uploads/" + subDirectory + "/" + folderName + "/";
            }
        } catch (IOException ex) {
            throw new RuntimeException("Could not extract zip file. Please try again!", ex);
        }
    }
}
