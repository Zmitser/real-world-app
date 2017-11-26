package com.rupert.jhipcon.service.mapper;

import com.rupert.jhipcon.domain.*;
import com.rupert.jhipcon.service.dto.EventAttendanceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity EventAttendance and its DTO EventAttendanceDTO.
 */
@Mapper(componentModel = "spring", uses = {EventMapper.class, AppUserMapper.class})
public interface EventAttendanceMapper extends EntityMapper<EventAttendanceDTO, EventAttendance> {

    @Mapping(source = "event.id", target = "eventId")
    @Mapping(source = "user.id", target = "userId")
    EventAttendanceDTO toDto(EventAttendance eventAttendance); 

    @Mapping(source = "eventId", target = "event")
    @Mapping(source = "userId", target = "user")
    EventAttendance toEntity(EventAttendanceDTO eventAttendanceDTO);

    default EventAttendance fromId(Long id) {
        if (id == null) {
            return null;
        }
        EventAttendance eventAttendance = new EventAttendance();
        eventAttendance.setId(id);
        return eventAttendance;
    }
}
