package com.pixelgamez.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String displayName;
    private String aboutMe;
    private String workingOn;
    private String country;
}
