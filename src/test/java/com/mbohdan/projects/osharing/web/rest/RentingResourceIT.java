package com.mbohdan.projects.osharing.web.rest;

import com.mbohdan.projects.osharing.ObjectSharingApp;
import com.mbohdan.projects.osharing.domain.Renting;
import com.mbohdan.projects.osharing.repository.RentingRepository;
import com.mbohdan.projects.osharing.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mbohdan.projects.osharing.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mbohdan.projects.osharing.domain.enumeration.RentPeriod;
import com.mbohdan.projects.osharing.domain.enumeration.Currency;
/**
 * Integration tests for the {@link RentingResource} REST controller.
 */
@SpringBootTest(classes = ObjectSharingApp.class)
public class RentingResourceIT {

    private static final Long DEFAULT_START_TIME = 1L;
    private static final Long UPDATED_START_TIME = 2L;

    private static final Long DEFAULT_END_TIME = 1L;
    private static final Long UPDATED_END_TIME = 2L;

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final RentPeriod DEFAULT_RENT_PERIOD = RentPeriod.HOUR;
    private static final RentPeriod UPDATED_RENT_PERIOD = RentPeriod.DAY;

    private static final Currency DEFAULT_CURRENCY = Currency.BEER;
    private static final Currency UPDATED_CURRENCY = Currency.PLN;

    @Autowired
    private RentingRepository rentingRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restRentingMockMvc;

    private Renting renting;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RentingResource rentingResource = new RentingResource(rentingRepository);
        this.restRentingMockMvc = MockMvcBuilders.standaloneSetup(rentingResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Renting createEntity(EntityManager em) {
        Renting renting = new Renting()
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .price(DEFAULT_PRICE)
            .rentPeriod(DEFAULT_RENT_PERIOD)
            .currency(DEFAULT_CURRENCY);
        return renting;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Renting createUpdatedEntity(EntityManager em) {
        Renting renting = new Renting()
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .price(UPDATED_PRICE)
            .rentPeriod(UPDATED_RENT_PERIOD)
            .currency(UPDATED_CURRENCY);
        return renting;
    }

    @BeforeEach
    public void initTest() {
        renting = createEntity(em);
    }

    @Test
    @Transactional
    public void createRenting() throws Exception {
        int databaseSizeBeforeCreate = rentingRepository.findAll().size();

        // Create the Renting
        restRentingMockMvc.perform(post("/api/rentings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(renting)))
            .andExpect(status().isCreated());

        // Validate the Renting in the database
        List<Renting> rentingList = rentingRepository.findAll();
        assertThat(rentingList).hasSize(databaseSizeBeforeCreate + 1);
        Renting testRenting = rentingList.get(rentingList.size() - 1);
        assertThat(testRenting.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testRenting.getEndTime()).isEqualTo(DEFAULT_END_TIME);
        assertThat(testRenting.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testRenting.getRentPeriod()).isEqualTo(DEFAULT_RENT_PERIOD);
        assertThat(testRenting.getCurrency()).isEqualTo(DEFAULT_CURRENCY);
    }

    @Test
    @Transactional
    public void createRentingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rentingRepository.findAll().size();

        // Create the Renting with an existing ID
        renting.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRentingMockMvc.perform(post("/api/rentings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(renting)))
            .andExpect(status().isBadRequest());

        // Validate the Renting in the database
        List<Renting> rentingList = rentingRepository.findAll();
        assertThat(rentingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRentings() throws Exception {
        // Initialize the database
        rentingRepository.saveAndFlush(renting);

        // Get all the rentingList
        restRentingMockMvc.perform(get("/api/rentings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(renting.getId().intValue())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.intValue())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].rentPeriod").value(hasItem(DEFAULT_RENT_PERIOD.toString())))
            .andExpect(jsonPath("$.[*].currency").value(hasItem(DEFAULT_CURRENCY.toString())));
    }
    
    @Test
    @Transactional
    public void getRenting() throws Exception {
        // Initialize the database
        rentingRepository.saveAndFlush(renting);

        // Get the renting
        restRentingMockMvc.perform(get("/api/rentings/{id}", renting.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(renting.getId().intValue()))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.intValue()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.rentPeriod").value(DEFAULT_RENT_PERIOD.toString()))
            .andExpect(jsonPath("$.currency").value(DEFAULT_CURRENCY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRenting() throws Exception {
        // Get the renting
        restRentingMockMvc.perform(get("/api/rentings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRenting() throws Exception {
        // Initialize the database
        rentingRepository.saveAndFlush(renting);

        int databaseSizeBeforeUpdate = rentingRepository.findAll().size();

        // Update the renting
        Renting updatedRenting = rentingRepository.findById(renting.getId()).get();
        // Disconnect from session so that the updates on updatedRenting are not directly saved in db
        em.detach(updatedRenting);
        updatedRenting
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .price(UPDATED_PRICE)
            .rentPeriod(UPDATED_RENT_PERIOD)
            .currency(UPDATED_CURRENCY);

        restRentingMockMvc.perform(put("/api/rentings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRenting)))
            .andExpect(status().isOk());

        // Validate the Renting in the database
        List<Renting> rentingList = rentingRepository.findAll();
        assertThat(rentingList).hasSize(databaseSizeBeforeUpdate);
        Renting testRenting = rentingList.get(rentingList.size() - 1);
        assertThat(testRenting.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testRenting.getEndTime()).isEqualTo(UPDATED_END_TIME);
        assertThat(testRenting.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testRenting.getRentPeriod()).isEqualTo(UPDATED_RENT_PERIOD);
        assertThat(testRenting.getCurrency()).isEqualTo(UPDATED_CURRENCY);
    }

    @Test
    @Transactional
    public void updateNonExistingRenting() throws Exception {
        int databaseSizeBeforeUpdate = rentingRepository.findAll().size();

        // Create the Renting

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRentingMockMvc.perform(put("/api/rentings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(renting)))
            .andExpect(status().isBadRequest());

        // Validate the Renting in the database
        List<Renting> rentingList = rentingRepository.findAll();
        assertThat(rentingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRenting() throws Exception {
        // Initialize the database
        rentingRepository.saveAndFlush(renting);

        int databaseSizeBeforeDelete = rentingRepository.findAll().size();

        // Delete the renting
        restRentingMockMvc.perform(delete("/api/rentings/{id}", renting.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Renting> rentingList = rentingRepository.findAll();
        assertThat(rentingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Renting.class);
        Renting renting1 = new Renting();
        renting1.setId(1L);
        Renting renting2 = new Renting();
        renting2.setId(renting1.getId());
        assertThat(renting1).isEqualTo(renting2);
        renting2.setId(2L);
        assertThat(renting1).isNotEqualTo(renting2);
        renting1.setId(null);
        assertThat(renting1).isNotEqualTo(renting2);
    }
}
