package com.mbohdan.projects.osharing.web.rest;

import com.mbohdan.projects.osharing.ObjectSharingApp;
import com.mbohdan.projects.osharing.domain.Advertisment;
import com.mbohdan.projects.osharing.repository.AdvertismentRepository;
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

import com.mbohdan.projects.osharing.domain.enumeration.ObjectStatus;
/**
 * Integration tests for the {@link AdvertismentResource} REST controller.
 */
@SpringBootTest(classes = ObjectSharingApp.class)
public class AdvertismentResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_URL = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_URL = "BBBBBBBBBB";

    private static final String DEFAULT_DESC = "AAAAAAAAAA";
    private static final String UPDATED_DESC = "BBBBBBBBBB";

    private static final ObjectStatus DEFAULT_STATUS = ObjectStatus.ACTIVE;
    private static final ObjectStatus UPDATED_STATUS = ObjectStatus.DISACTIVE;

    @Autowired
    private AdvertismentRepository advertismentRepository;

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

    private MockMvc restAdvertismentMockMvc;

    private Advertisment advertisment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AdvertismentResource advertismentResource = new AdvertismentResource(advertismentRepository);
        this.restAdvertismentMockMvc = MockMvcBuilders.standaloneSetup(advertismentResource)
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
    public static Advertisment createEntity(EntityManager em) {
        Advertisment advertisment = new Advertisment()
            .title(DEFAULT_TITLE)
            .imageUrl(DEFAULT_IMAGE_URL)
            .desc(DEFAULT_DESC)
            .status(DEFAULT_STATUS);
        return advertisment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Advertisment createUpdatedEntity(EntityManager em) {
        Advertisment advertisment = new Advertisment()
            .title(UPDATED_TITLE)
            .imageUrl(UPDATED_IMAGE_URL)
            .desc(UPDATED_DESC)
            .status(UPDATED_STATUS);
        return advertisment;
    }

    @BeforeEach
    public void initTest() {
        advertisment = createEntity(em);
    }

    @Test
    @Transactional
    public void createAdvertisment() throws Exception {
        int databaseSizeBeforeCreate = advertismentRepository.findAll().size();

        // Create the Advertisment
        restAdvertismentMockMvc.perform(post("/api/advertisments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisment)))
            .andExpect(status().isCreated());

        // Validate the Advertisment in the database
        List<Advertisment> advertismentList = advertismentRepository.findAll();
        assertThat(advertismentList).hasSize(databaseSizeBeforeCreate + 1);
        Advertisment testAdvertisment = advertismentList.get(advertismentList.size() - 1);
        assertThat(testAdvertisment.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testAdvertisment.getImageUrl()).isEqualTo(DEFAULT_IMAGE_URL);
        assertThat(testAdvertisment.getDesc()).isEqualTo(DEFAULT_DESC);
        assertThat(testAdvertisment.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    public void createAdvertismentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = advertismentRepository.findAll().size();

        // Create the Advertisment with an existing ID
        advertisment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAdvertismentMockMvc.perform(post("/api/advertisments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisment)))
            .andExpect(status().isBadRequest());

        // Validate the Advertisment in the database
        List<Advertisment> advertismentList = advertismentRepository.findAll();
        assertThat(advertismentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = advertismentRepository.findAll().size();
        // set the field null
        advertisment.setTitle(null);

        // Create the Advertisment, which fails.

        restAdvertismentMockMvc.perform(post("/api/advertisments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisment)))
            .andExpect(status().isBadRequest());

        List<Advertisment> advertismentList = advertismentRepository.findAll();
        assertThat(advertismentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkImageUrlIsRequired() throws Exception {
        int databaseSizeBeforeTest = advertismentRepository.findAll().size();
        // set the field null
        advertisment.setImageUrl(null);

        // Create the Advertisment, which fails.

        restAdvertismentMockMvc.perform(post("/api/advertisments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisment)))
            .andExpect(status().isBadRequest());

        List<Advertisment> advertismentList = advertismentRepository.findAll();
        assertThat(advertismentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = advertismentRepository.findAll().size();
        // set the field null
        advertisment.setStatus(null);

        // Create the Advertisment, which fails.

        restAdvertismentMockMvc.perform(post("/api/advertisments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisment)))
            .andExpect(status().isBadRequest());

        List<Advertisment> advertismentList = advertismentRepository.findAll();
        assertThat(advertismentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAdvertisments() throws Exception {
        // Initialize the database
        advertismentRepository.saveAndFlush(advertisment);

        // Get all the advertismentList
        restAdvertismentMockMvc.perform(get("/api/advertisments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(advertisment.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].imageUrl").value(hasItem(DEFAULT_IMAGE_URL)))
            .andExpect(jsonPath("$.[*].desc").value(hasItem(DEFAULT_DESC)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getAdvertisment() throws Exception {
        // Initialize the database
        advertismentRepository.saveAndFlush(advertisment);

        // Get the advertisment
        restAdvertismentMockMvc.perform(get("/api/advertisments/{id}", advertisment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(advertisment.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.imageUrl").value(DEFAULT_IMAGE_URL))
            .andExpect(jsonPath("$.desc").value(DEFAULT_DESC))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAdvertisment() throws Exception {
        // Get the advertisment
        restAdvertismentMockMvc.perform(get("/api/advertisments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAdvertisment() throws Exception {
        // Initialize the database
        advertismentRepository.saveAndFlush(advertisment);

        int databaseSizeBeforeUpdate = advertismentRepository.findAll().size();

        // Update the advertisment
        Advertisment updatedAdvertisment = advertismentRepository.findById(advertisment.getId()).get();
        // Disconnect from session so that the updates on updatedAdvertisment are not directly saved in db
        em.detach(updatedAdvertisment);
        updatedAdvertisment
            .title(UPDATED_TITLE)
            .imageUrl(UPDATED_IMAGE_URL)
            .desc(UPDATED_DESC)
            .status(UPDATED_STATUS);

        restAdvertismentMockMvc.perform(put("/api/advertisments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAdvertisment)))
            .andExpect(status().isOk());

        // Validate the Advertisment in the database
        List<Advertisment> advertismentList = advertismentRepository.findAll();
        assertThat(advertismentList).hasSize(databaseSizeBeforeUpdate);
        Advertisment testAdvertisment = advertismentList.get(advertismentList.size() - 1);
        assertThat(testAdvertisment.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testAdvertisment.getImageUrl()).isEqualTo(UPDATED_IMAGE_URL);
        assertThat(testAdvertisment.getDesc()).isEqualTo(UPDATED_DESC);
        assertThat(testAdvertisment.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingAdvertisment() throws Exception {
        int databaseSizeBeforeUpdate = advertismentRepository.findAll().size();

        // Create the Advertisment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAdvertismentMockMvc.perform(put("/api/advertisments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(advertisment)))
            .andExpect(status().isBadRequest());

        // Validate the Advertisment in the database
        List<Advertisment> advertismentList = advertismentRepository.findAll();
        assertThat(advertismentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAdvertisment() throws Exception {
        // Initialize the database
        advertismentRepository.saveAndFlush(advertisment);

        int databaseSizeBeforeDelete = advertismentRepository.findAll().size();

        // Delete the advertisment
        restAdvertismentMockMvc.perform(delete("/api/advertisments/{id}", advertisment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Advertisment> advertismentList = advertismentRepository.findAll();
        assertThat(advertismentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Advertisment.class);
        Advertisment advertisment1 = new Advertisment();
        advertisment1.setId(1L);
        Advertisment advertisment2 = new Advertisment();
        advertisment2.setId(advertisment1.getId());
        assertThat(advertisment1).isEqualTo(advertisment2);
        advertisment2.setId(2L);
        assertThat(advertisment1).isNotEqualTo(advertisment2);
        advertisment1.setId(null);
        assertThat(advertisment1).isNotEqualTo(advertisment2);
    }
}
