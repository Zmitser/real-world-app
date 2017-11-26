package com.rupert.jhipcon.service.mapper;

import com.rupert.jhipcon.domain.*;
import com.rupert.jhipcon.service.dto.AppUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AppUser and its DTO AppUserDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface AppUserMapper extends EntityMapper<AppUserDTO, AppUser> {

    @Mapping(source = "homeLocation.id", target = "homeLocationId")
    AppUserDTO toDto(AppUser appUser); 

    @Mapping(source = "homeLocationId", target = "homeLocation")
    AppUser toEntity(AppUserDTO appUserDTO);

    default AppUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        AppUser appUser = new AppUser();
        appUser.setId(id);
        return appUser;
    }
}
