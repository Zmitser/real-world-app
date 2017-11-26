package com.rupert.jhipcon.service.mapper;

import com.rupert.jhipcon.domain.*;
import com.rupert.jhipcon.service.dto.EventDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Event and its DTO EventDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class})
public interface EventMapper extends EntityMapper<EventDTO, Event> {

    @Mapping(source = "location.id", target = "locationId")
    EventDTO toDto(Event event); 

    @Mapping(source = "locationId", target = "location")
    @Mapping(target = "eventAttendances", ignore = true)
    Event toEntity(EventDTO eventDTO);

    default Event fromId(Long id) {
        if (id == null) {
            return null;
        }
        Event event = new Event();
        event.setId(id);
        return event;
    }
}
