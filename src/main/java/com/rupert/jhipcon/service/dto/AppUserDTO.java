package com.rupert.jhipcon.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the AppUser entity.
 */
public class AppUserDTO implements Serializable {

    private Long id;

    @NotNull
    private String username;

    private Long homeLocationId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getHomeLocationId() {
        return homeLocationId;
    }

    public void setHomeLocationId(Long locationId) {
        this.homeLocationId = locationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AppUserDTO appUserDTO = (AppUserDTO) o;
        if(appUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), appUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AppUserDTO{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            "}";
    }
}
