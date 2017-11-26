package com.rupert.jhipcon.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.rupert.jhipcon.service.EventAttendanceService;
import com.rupert.jhipcon.web.rest.errors.BadRequestAlertException;
import com.rupert.jhipcon.web.rest.util.HeaderUtil;
import com.rupert.jhipcon.web.rest.util.PaginationUtil;
import com.rupert.jhipcon.service.dto.EventAttendanceDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing EventAttendance.
 */
@RestController
@RequestMapping("/api")
public class EventAttendanceResource {

    private final Logger log = LoggerFactory.getLogger(EventAttendanceResource.class);

    private static final String ENTITY_NAME = "eventAttendance";

    private final EventAttendanceService eventAttendanceService;

    public EventAttendanceResource(EventAttendanceService eventAttendanceService) {
        this.eventAttendanceService = eventAttendanceService;
    }

    /**
     * POST  /event-attendances : Create a new eventAttendance.
     *
     * @param eventAttendanceDTO the eventAttendanceDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new eventAttendanceDTO, or with status 400 (Bad Request) if the eventAttendance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/event-attendances")
    @Timed
    public ResponseEntity<EventAttendanceDTO> createEventAttendance(@Valid @RequestBody EventAttendanceDTO eventAttendanceDTO) throws URISyntaxException {
        log.debug("REST request to save EventAttendance : {}", eventAttendanceDTO);
        if (eventAttendanceDTO.getId() != null) {
            throw new BadRequestAlertException("A new eventAttendance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EventAttendanceDTO result = eventAttendanceService.save(eventAttendanceDTO);
        return ResponseEntity.created(new URI("/api/event-attendances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /event-attendances : Updates an existing eventAttendance.
     *
     * @param eventAttendanceDTO the eventAttendanceDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated eventAttendanceDTO,
     * or with status 400 (Bad Request) if the eventAttendanceDTO is not valid,
     * or with status 500 (Internal Server Error) if the eventAttendanceDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/event-attendances")
    @Timed
    public ResponseEntity<EventAttendanceDTO> updateEventAttendance(@Valid @RequestBody EventAttendanceDTO eventAttendanceDTO) throws URISyntaxException {
        log.debug("REST request to update EventAttendance : {}", eventAttendanceDTO);
        if (eventAttendanceDTO.getId() == null) {
            return createEventAttendance(eventAttendanceDTO);
        }
        EventAttendanceDTO result = eventAttendanceService.save(eventAttendanceDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, eventAttendanceDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /event-attendances : get all the eventAttendances.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of eventAttendances in body
     */
    @GetMapping("/event-attendances")
    @Timed
    public ResponseEntity<List<EventAttendanceDTO>> getAllEventAttendances(Pageable pageable) {
        log.debug("REST request to get a page of EventAttendances");
        Page<EventAttendanceDTO> page = eventAttendanceService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/event-attendances");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /event-attendances/:id : get the "id" eventAttendance.
     *
     * @param id the id of the eventAttendanceDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the eventAttendanceDTO, or with status 404 (Not Found)
     */
    @GetMapping("/event-attendances/{id}")
    @Timed
    public ResponseEntity<EventAttendanceDTO> getEventAttendance(@PathVariable Long id) {
        log.debug("REST request to get EventAttendance : {}", id);
        EventAttendanceDTO eventAttendanceDTO = eventAttendanceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(eventAttendanceDTO));
    }

    /**
     * DELETE  /event-attendances/:id : delete the "id" eventAttendance.
     *
     * @param id the id of the eventAttendanceDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/event-attendances/{id}")
    @Timed
    public ResponseEntity<Void> deleteEventAttendance(@PathVariable Long id) {
        log.debug("REST request to delete EventAttendance : {}", id);
        eventAttendanceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
