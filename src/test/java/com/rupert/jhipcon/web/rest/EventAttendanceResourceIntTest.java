package com.rupert.jhipcon.web.rest;

import com.rupert.jhipcon.JhipsterrwaApp;

import com.rupert.jhipcon.domain.EventAttendance;
import com.rupert.jhipcon.repository.EventAttendanceRepository;
import com.rupert.jhipcon.service.EventAttendanceService;
import com.rupert.jhipcon.service.dto.EventAttendanceDTO;
import com.rupert.jhipcon.service.mapper.EventAttendanceMapper;
import com.rupert.jhipcon.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.rupert.jhipcon.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EventAttendanceResource REST controller.
 *
 * @see EventAttendanceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterrwaApp.class)
public class EventAttendanceResourceIntTest {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EventAttendanceRepository eventAttendanceRepository;

    @Autowired
    private EventAttendanceMapper eventAttendanceMapper;

    @Autowired
    private EventAttendanceService eventAttendanceService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEventAttendanceMockMvc;

    private EventAttendance eventAttendance;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EventAttendanceResource eventAttendanceResource = new EventAttendanceResource(eventAttendanceService);
        this.restEventAttendanceMockMvc = MockMvcBuilders.standaloneSetup(eventAttendanceResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EventAttendance createEntity(EntityManager em) {
        EventAttendance eventAttendance = new EventAttendance()
            .date(DEFAULT_DATE);
        return eventAttendance;
    }

    @Before
    public void initTest() {
        eventAttendance = createEntity(em);
    }

    @Test
    @Transactional
    public void createEventAttendance() throws Exception {
        int databaseSizeBeforeCreate = eventAttendanceRepository.findAll().size();

        // Create the EventAttendance
        EventAttendanceDTO eventAttendanceDTO = eventAttendanceMapper.toDto(eventAttendance);
        restEventAttendanceMockMvc.perform(post("/api/event-attendances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventAttendanceDTO)))
            .andExpect(status().isCreated());

        // Validate the EventAttendance in the database
        List<EventAttendance> eventAttendanceList = eventAttendanceRepository.findAll();
        assertThat(eventAttendanceList).hasSize(databaseSizeBeforeCreate + 1);
        EventAttendance testEventAttendance = eventAttendanceList.get(eventAttendanceList.size() - 1);
        assertThat(testEventAttendance.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createEventAttendanceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = eventAttendanceRepository.findAll().size();

        // Create the EventAttendance with an existing ID
        eventAttendance.setId(1L);
        EventAttendanceDTO eventAttendanceDTO = eventAttendanceMapper.toDto(eventAttendance);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEventAttendanceMockMvc.perform(post("/api/event-attendances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventAttendanceDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EventAttendance in the database
        List<EventAttendance> eventAttendanceList = eventAttendanceRepository.findAll();
        assertThat(eventAttendanceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = eventAttendanceRepository.findAll().size();
        // set the field null
        eventAttendance.setDate(null);

        // Create the EventAttendance, which fails.
        EventAttendanceDTO eventAttendanceDTO = eventAttendanceMapper.toDto(eventAttendance);

        restEventAttendanceMockMvc.perform(post("/api/event-attendances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventAttendanceDTO)))
            .andExpect(status().isBadRequest());

        List<EventAttendance> eventAttendanceList = eventAttendanceRepository.findAll();
        assertThat(eventAttendanceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEventAttendances() throws Exception {
        // Initialize the database
        eventAttendanceRepository.saveAndFlush(eventAttendance);

        // Get all the eventAttendanceList
        restEventAttendanceMockMvc.perform(get("/api/event-attendances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(eventAttendance.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void getEventAttendance() throws Exception {
        // Initialize the database
        eventAttendanceRepository.saveAndFlush(eventAttendance);

        // Get the eventAttendance
        restEventAttendanceMockMvc.perform(get("/api/event-attendances/{id}", eventAttendance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(eventAttendance.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEventAttendance() throws Exception {
        // Get the eventAttendance
        restEventAttendanceMockMvc.perform(get("/api/event-attendances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEventAttendance() throws Exception {
        // Initialize the database
        eventAttendanceRepository.saveAndFlush(eventAttendance);
        int databaseSizeBeforeUpdate = eventAttendanceRepository.findAll().size();

        // Update the eventAttendance
        EventAttendance updatedEventAttendance = eventAttendanceRepository.findOne(eventAttendance.getId());
        updatedEventAttendance
            .date(UPDATED_DATE);
        EventAttendanceDTO eventAttendanceDTO = eventAttendanceMapper.toDto(updatedEventAttendance);

        restEventAttendanceMockMvc.perform(put("/api/event-attendances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventAttendanceDTO)))
            .andExpect(status().isOk());

        // Validate the EventAttendance in the database
        List<EventAttendance> eventAttendanceList = eventAttendanceRepository.findAll();
        assertThat(eventAttendanceList).hasSize(databaseSizeBeforeUpdate);
        EventAttendance testEventAttendance = eventAttendanceList.get(eventAttendanceList.size() - 1);
        assertThat(testEventAttendance.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingEventAttendance() throws Exception {
        int databaseSizeBeforeUpdate = eventAttendanceRepository.findAll().size();

        // Create the EventAttendance
        EventAttendanceDTO eventAttendanceDTO = eventAttendanceMapper.toDto(eventAttendance);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEventAttendanceMockMvc.perform(put("/api/event-attendances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(eventAttendanceDTO)))
            .andExpect(status().isCreated());

        // Validate the EventAttendance in the database
        List<EventAttendance> eventAttendanceList = eventAttendanceRepository.findAll();
        assertThat(eventAttendanceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEventAttendance() throws Exception {
        // Initialize the database
        eventAttendanceRepository.saveAndFlush(eventAttendance);
        int databaseSizeBeforeDelete = eventAttendanceRepository.findAll().size();

        // Get the eventAttendance
        restEventAttendanceMockMvc.perform(delete("/api/event-attendances/{id}", eventAttendance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EventAttendance> eventAttendanceList = eventAttendanceRepository.findAll();
        assertThat(eventAttendanceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EventAttendance.class);
        EventAttendance eventAttendance1 = new EventAttendance();
        eventAttendance1.setId(1L);
        EventAttendance eventAttendance2 = new EventAttendance();
        eventAttendance2.setId(eventAttendance1.getId());
        assertThat(eventAttendance1).isEqualTo(eventAttendance2);
        eventAttendance2.setId(2L);
        assertThat(eventAttendance1).isNotEqualTo(eventAttendance2);
        eventAttendance1.setId(null);
        assertThat(eventAttendance1).isNotEqualTo(eventAttendance2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EventAttendanceDTO.class);
        EventAttendanceDTO eventAttendanceDTO1 = new EventAttendanceDTO();
        eventAttendanceDTO1.setId(1L);
        EventAttendanceDTO eventAttendanceDTO2 = new EventAttendanceDTO();
        assertThat(eventAttendanceDTO1).isNotEqualTo(eventAttendanceDTO2);
        eventAttendanceDTO2.setId(eventAttendanceDTO1.getId());
        assertThat(eventAttendanceDTO1).isEqualTo(eventAttendanceDTO2);
        eventAttendanceDTO2.setId(2L);
        assertThat(eventAttendanceDTO1).isNotEqualTo(eventAttendanceDTO2);
        eventAttendanceDTO1.setId(null);
        assertThat(eventAttendanceDTO1).isNotEqualTo(eventAttendanceDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(eventAttendanceMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(eventAttendanceMapper.fromId(null)).isNull();
    }
}
