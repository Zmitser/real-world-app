package com.rupert.jhipcon.service.impl;

import com.rupert.jhipcon.service.EventAttendanceService;
import com.rupert.jhipcon.domain.EventAttendance;
import com.rupert.jhipcon.repository.EventAttendanceRepository;
import com.rupert.jhipcon.service.dto.EventAttendanceDTO;
import com.rupert.jhipcon.service.mapper.EventAttendanceMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing EventAttendance.
 */
@Service
@Transactional
public class EventAttendanceServiceImpl implements EventAttendanceService{

    private final Logger log = LoggerFactory.getLogger(EventAttendanceServiceImpl.class);

    private final EventAttendanceRepository eventAttendanceRepository;

    private final EventAttendanceMapper eventAttendanceMapper;

    public EventAttendanceServiceImpl(EventAttendanceRepository eventAttendanceRepository, EventAttendanceMapper eventAttendanceMapper) {
        this.eventAttendanceRepository = eventAttendanceRepository;
        this.eventAttendanceMapper = eventAttendanceMapper;
    }

    /**
     * Save a eventAttendance.
     *
     * @param eventAttendanceDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public EventAttendanceDTO save(EventAttendanceDTO eventAttendanceDTO) {
        log.debug("Request to save EventAttendance : {}", eventAttendanceDTO);
        EventAttendance eventAttendance = eventAttendanceMapper.toEntity(eventAttendanceDTO);
        eventAttendance = eventAttendanceRepository.save(eventAttendance);
        return eventAttendanceMapper.toDto(eventAttendance);
    }

    /**
     * Get all the eventAttendances.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<EventAttendanceDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EventAttendances");
        return eventAttendanceRepository.findAll(pageable)
            .map(eventAttendanceMapper::toDto);
    }

    /**
     * Get one eventAttendance by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public EventAttendanceDTO findOne(Long id) {
        log.debug("Request to get EventAttendance : {}", id);
        EventAttendance eventAttendance = eventAttendanceRepository.findOne(id);
        return eventAttendanceMapper.toDto(eventAttendance);
    }

    /**
     * Delete the eventAttendance by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete EventAttendance : {}", id);
        eventAttendanceRepository.delete(id);
    }
}
